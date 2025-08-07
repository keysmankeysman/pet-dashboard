<template>
  <v-app class="dashboard-gradient app-background--primary">
    <grid-layout>
      <grid-item>
        итем
      </grid-item>
    </grid-layout>

    <!-- <grid-layout
      :col-num="parseInt(colNum)"
      :is-draggable="draggable"
      :is-mirrored="mirrored"
      :is-resizable="resizable"
      :layout.sync="diagrams"
      :prevent-collision="preventCollision"
      :responsive="responsive"
      :row-height="rowHeight"
      :use-css-transforms="true"
      :vertical-compact="true"
    >
      <grid-item
        :h="item.h"
        :i="item.i"
        :is-draggable="isEdit && item.draggable"
        :is-resizable="isEdit && item.resizable"
        :key="item.id"
        :minH="
          item.graphType == 'counter' ||
          item.graphType == 'pulse' ||
          item.graphType == 'grid'
            ? 3
            : item.graphType == 'pie' || item.graphType == 'donut'
            ? 9
            : 6
        "
        :minW="
          item.graphType == 'counter' || item.graphType == 'pulse' ? 1 : 3
        "
        :static="item.static"
        :w="item.w"
        :x="item.x"
        :y="item.y"
        @moved="updateDiagram(item, index)"
        @resized="updateDiagram(item, index)"
        style="overflow: hidden"
        v-for="(item, index) of diagrams"
      >
        {{ localDiagrams }}
    
      </grid-item>
    </grid-layout> -->
  </v-app>
</template>

<script>
import GridLayout from './GridLayout.vue'
import GridItem from './GridItem.vue'
import localDiagrams from './diagrams.js'

export default {
  name: 'Layout-task',
  components: {
    GridLayout,
    GridItem
  },
  data() {
    return {
      localDiagrams
    }
  },
  methods: {

  }
}
</script>

