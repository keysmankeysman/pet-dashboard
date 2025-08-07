<template>
	<div>
		<div class="vue-grid-layout" ref="item">
			<slot></slot>
			<grid-item 
				:h="placeholder.h"
				:i="placeholder.i"
				:w="placeholder.w"
				:x="placeholder.x"
				:y="placeholder.y"
				class="vue-grid-placeholder"
				v-show="isDragging"
			></grid-item>
		</div>
	</div>
</template>
<style>
	.theme--dark .vue-grid-layout {
		background-color:#232323;
	}

	.theme--light .vue-grid-layout {
		background-color:#f2f3f8;
	}

	.theme--light .vue-grid-layout {
		background-color:#f2f3f8;
	}
	
	.vue-grid-layout {
		position: relative;
		transition: height 200ms ease;
	}
</style>
<script>

import {
	bottom,
	cloneLayout,
	compact,
	getAllCollisions,
	getLayoutItem,
	moveElement,
	validateLayout
} from '../helpers/utils';
import {
	findOrGenerateResponsiveLayout,
	getBreakpointFromWidth,
	getColsFromBreakpoint
} from "../helpers/responsiveUtils";
import GridItem from './GridItem.vue'
import {addWindowEventListener, removeWindowEventListener} from "../helpers/DOM";

var elementResizeDetectorMaker = require("element-resize-detector");

export default {
	name: "GridLayout",
	components: {
		GridItem,
	},
	props: {
		// If true, the container height swells and contracts to fit contents
		autoSize: {
			type: Boolean,
			default: true
		},
		colNum: {
			type: Number,
			default: 12
		},
		rowHeight: {
			type: Number,
			default: 150
		},
		maxRows: {
			type: Number,
			default: Infinity
		},
		margin: {
			type: Array,
			default: function () {
				return [10, 10];
			}
		},
		isDraggable: {
			type: Boolean,
			default: true
		},
		isResizable: {
			type: Boolean,
			default: true
		},
		isMirrored: {
			type: Boolean,
			default: false
		},
		useCssTransforms: {
			type: Boolean,
			default: true
		},
		verticalCompact: {
			type: Boolean,
			default: true
		},
		layout: {
			type: Array,
			required: true,
		},
		responsive: {
			type: Boolean,
			default: false
		},
		breakpoints: {
			type: Object,
			default: function () {
				return {lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}
			}
		},
		cols: {
			type: Object,
			default: function () {
				return {lg: 12, md: 10, sm: 6, xs: 4, xxs: 2}
			},
		},
		preventCollision: {
			type: Boolean,
			default: false
		}
	},
	data: function () {
		return {
			width: null,
			lastLayoutLength: 0,
			isDragging: false,
			placeholder: {
				x: 0,
				y: 0,
				w: 0,
				h: 0,
				i: -1
			},
			layouts: {}, // array to store all layouts from different breakpoints
			lastBreakpoint: null, // store last active breakpoint
			originalLayout: null, // store original Layout
		};
	},
	created() {
		const self = this;

		// Accessible refernces of functions for removing in beforeDestroy
		self.resizeEventHandler = function (eventType, i, x, y, h, w) {
			self.resizeEvent(eventType, i, x, y, h, w);
		};

		self.dragEventHandler = function (eventType, i, x, y, h, w) {
			self.dragEvent(eventType, i, x, y, h, w);
		};

		self.$layoutManager.$on('resizeEvent', self.resizeEventHandler);
		self.$layoutManager.$on('dragEvent', self.dragEventHandler);
		self.$emit('layout-created', self.layout);
	},
	beforeDestroy: function () {
		//Remove listeners
		this.$layoutManager.$off('resizeEvent', this.resizeEventHandler);
		this.$layoutManager.$off('dragEvent', this.dragEventHandler);
		removeWindowEventListener("resize", this.onWindowResize);
		this.erd.uninstall(this.$refs.item);
		this.$layoutManager.$destroy();
	},
	beforeMount: function () {
		this.$emit('layout-before-mount', this.layout);
	},
	mounted: function () {
		this.$emit('layout-mounted', this.layout);
		this.$nextTick(function () {
			validateLayout(this.layout);

			this.originalLayout = this.layout;
			const self = this;
			this.$nextTick(function () {
				self.onWindowResize();

				self.initResponsiveFeatures();

				//self.width = self.$el.offsetWidth;
				addWindowEventListener('resize', self.onWindowResize);

				compact(self.layout, self.verticalCompact);

				self.$nextTick(function () {
					this.erd = elementResizeDetectorMaker({
						strategy: "scroll", //<- For ultra performance.
						// See https://github.com/wnr/element-resize-detector/issues/110 about callOnAdd.
						callOnAdd: false,
					});
					this.erd.listenTo(self.$refs.item, function () {
						self.onWindowResize();
					});
				});
			});
		});
	},
	watch: {
		width: function (newval, oldval) {
			const self = this;
			this.$nextTick(function () {
				this.$layoutManager.$emit("updateWidth", this.width);
				if (oldval === null) {
					this.$nextTick(() => {
						this.$emit('layout-ready', self.layout);
					});
				}
			});
		},
		layout: function () {
			this.layoutUpdate();
		},
		colNum: function (val) {
			this.$layoutManager.$emit("setColNum", val);
		},
		rowHeight: function () {
			this.$layoutManager.$emit("setRowHeight", this.rowHeight);
		},
		isDraggable: function () {
			this.$layoutManager.$emit("setDraggable", this.isDraggable);
		},
		isResizable: function () {
			this.$layoutManager.$emit("setResizable", this.isResizable);
		},
		responsive() {
			if (!this.responsive) {
				this.$emit('update:layout', this.originalLayout);
				this.$layoutManager.$emit("setColNum", this.colNum);
			}
			this.onWindowResize();
		},
		maxRows: function () {
			this.$layoutManager.$emit("setMaxRows", this.maxRows);
		},
	},
	methods: {
		layoutUpdate() {
			if (this.layout !== undefined && this.originalLayout !== null) {
				if (this.layout.length !== this.originalLayout.length) {

					let diff = this.findDifference(this.layout, this.originalLayout);
					if (diff.length > 0) {
						if (this.layout.length > this.originalLayout.length) {
							this.originalLayout = this.originalLayout.concat(diff);
						} else {
							this.originalLayout = this.originalLayout.filter(obj => {
								return !diff.some(obj2 => {
									return obj.i === obj2.i;
								});
							});
						}
					}

					this.lastLayoutLength = this.layout.length;
					this.initResponsiveFeatures();
				}

				compact(this.layout, this.verticalCompact);
				this.$layoutManager.$emit("updateWidth", this.width);
			}
		},
		onWindowResize: function () {
			if (this.$refs !== null && this.$refs.item !== null && this.$refs.item !== undefined) {
				this.width = this.$refs.item.offsetWidth;
			}
			this.$layoutManager.$emit("resizeEvent");
		},
		containerHeight: function () {
			if (!this.autoSize) return;
			return bottom(this.layout) * (this.rowHeight + this.margin[1]) + this.margin[1] + 'px';
		},
		dragEvent: function (eventName, id, x, y, h, w) {
			let l = getLayoutItem(this.layout, id);
			//GetLayoutItem sometimes returns null object
			if (l === undefined || l === null) {
				l = {x: 0, y: 0}
			}

			if (eventName === "dragmove" || eventName === "dragstart") {
				this.placeholder.i = id;
				this.placeholder.x = l.x;
				this.placeholder.y = l.y;
				this.placeholder.w = w;
				this.placeholder.h = h;
				this.$nextTick(function () {
					this.isDragging = true;
				});
				this.$layoutManager.$emit("updateWidth", this.width);
			} else {
				this.$nextTick(function () {
					this.isDragging = false;
				});
			}

			// Move the element to the dragged location.
			this.layout = moveElement(this.layout, l, x, y, true, this.preventCollision);
			compact(this.layout, this.verticalCompact);
			// needed because vue can't detect changes on array element properties
			this.$layoutManager.$emit("compact");
			if (eventName === 'dragend') this.$emit('layout-updated', this.layout);
		},
		resizeEvent: function (eventName, id, x, y, h, w) {
			let l = getLayoutItem(this.layout, id);
			//GetLayoutItem sometimes return null object
			if (l === undefined || l === null) {
				l = {h: 0, w: 0}
			}

			let hasCollisions;
			if (this.preventCollision) {
				const collisions = getAllCollisions(this.layout, {...l, w, h}).filter(
					layoutItem => layoutItem.i !== l.i
				);
				hasCollisions = collisions.length > 0;

				// If we're colliding, we need adjust the placeholder.
				if (hasCollisions) {
					// adjust w && h to maximum allowed space
					let leastX = Infinity,
						leastY = Infinity;
					collisions.forEach(layoutItem => {
						if (layoutItem.x > l.x) leastX = Math.min(leastX, layoutItem.x);
						if (layoutItem.y > l.y) leastY = Math.min(leastY, layoutItem.y);
					});

					if (Number.isFinite(leastX)) l.w = leastX - l.x;
					if (Number.isFinite(leastY)) l.h = leastY - l.y;
				}
			}

			if (!hasCollisions) {
				// Set new width and height.
				l.w = w;
				l.h = h;
			}

			if (eventName === "resizestart" || eventName === "resizemove") {
				this.placeholder.i = id;
				this.placeholder.x = x;
				this.placeholder.y = y;
				this.placeholder.w = l.w;
				this.placeholder.h = l.h;
				this.$nextTick(function () {
					this.isDragging = true;
				});
				this.$layoutManager.$emit("updateWidth", this.width);

			} else {
				this.$nextTick(function () {
					this.isDragging = false;
				});
			}

			if (this.responsive) this.responsiveGridLayout();

			compact(this.layout, this.verticalCompact);
			this.$layoutManager.$emit("compact");

			if (eventName === 'resizeend') this.$emit('layout-updated', this.layout);
		},

		// finds or generates new layouts for set breakpoints
		responsiveGridLayout() {

			let newBreakpoint = getBreakpointFromWidth(this.breakpoints, this.width);
			let newCols = getColsFromBreakpoint(newBreakpoint, this.cols);

			// save actual layout in layouts
			if (this.lastBreakpoint != null && !this.layouts[this.lastBreakpoint])
				this.layouts[this.lastBreakpoint] = cloneLayout(this.layout);

			// Find or generate a new layout.
			let layout = findOrGenerateResponsiveLayout(
				this.originalLayout,
				this.layouts,
				this.breakpoints,
				newBreakpoint,
				this.lastBreakpoint,
				newCols,
				this.verticalCompact
			);

			// Store the new layout.
			this.layouts[newBreakpoint] = layout;

			// new prop sync
			this.$emit('update:layout', layout);

			this.lastBreakpoint = newBreakpoint;
			this.$layoutManager.$emit("setColNum", getColsFromBreakpoint(newBreakpoint, this.cols));
		},

		// clear all responsive layouts
		initResponsiveFeatures() {
			// clear layouts
			this.layouts = {};
		},

		// find difference in layouts
		findDifference(layout, originalLayout) {

			//Find values that are in result1 but not in result2
			let uniqueResultOne = layout.filter(function (obj) {
				return !originalLayout.some(function (obj2) {
					return obj.i === obj2.i;
				});
			});

			//Find values that are in result2 but not in result1
			let uniqueResultTwo = originalLayout.filter(function (obj) {
				return !layout.some(function (obj2) {
					return obj.i === obj2.i;
				});
			});

			//Combine the two arrays of unique entries#
			return uniqueResultOne.concat(uniqueResultTwo);
		}
	},
}
</script>
