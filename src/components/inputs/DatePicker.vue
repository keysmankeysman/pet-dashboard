<template>
	<div class="wrapper">
		<v-menu
		  :close-on-content-click="false"
		  offset-y
		  transition="scale-transition"
		  v-model="isDateModal"
		>
			<template v-slot:activator="{ on, attrs }">
					<div class="mr-4">
						<v-text-field
							color="grey"
							label="Дата"
							v-date-input
							@date-correct="closeDatePicker"
							:rules="[rules.dateValidation]"
							v-model="dateValue"
						>
							<template v-slot:append>
								<v-btn
									class="mb-1"
									v-bind="attrs"
									v-on="on"
									icon
									elevation="2"
								>
									<ion-icon name="calendar-clear-outline"></ion-icon>
								</v-btn>
							</template>
						</v-text-field>
					</div>
			</template>

			<v-card
			  class="elevation-0"
			  color="secondary"
			>
				<v-card
					class="elevation-0"
					color="secondary"
				>
					<v-card-title
						class="picker-title"
					>Выберите дату</v-card-title>
					<v-date-picker
						class="elevation-0"
						first-day-of-week="1"
						locale="ru"
						color="btn_primary"
						no-title
						v-model="dateStartPicker"
					></v-date-picker>
				</v-card>

				<v-card-actions class="app-background--secondary">
					<v-spacer/>
					<v-btn
					  @click="resetDate"
					  background
					  color="primary_text"
					  class="app-background--primary"
					  text
					>Закрыть</v-btn>
					<v-btn
					  @click="closeDatePicker"
					  color="#fff"
					  text
					  style="background-color: #5088fe;"
					>Сохранить</v-btn>
				</v-card-actions>
			</v-card>
		</v-menu>

		<v-menu
			:close-on-content-click="false"
			offset-y
			transition="scale-transition"
			v-model="isTimeModal"
			min-width="290"
		>
			<template v-slot:activator="{ on, attrs }">
				<div>
					<v-text-field
						color="grey"
						label="Время"
						:rules="[rules.timeValidation]"
						v-time-input
						@time-correct="closeTimePicker"
						:data-default-time="defaultTime"
						v-model="humanTime"
					>
						<template v-slot:append>
							<v-btn
								class="mb-1"
								v-bind="attrs"
								v-on="on"
								icon
								elevation="2"
							>
								<ion-icon name="time-outline"></ion-icon>
							</v-btn>
						</template>
					</v-text-field>
				</div>
			</template>

			<v-card class="elevation-0" color="secondary">
				<v-card
					class="elevation-0"
					style="padding: 12px"
					color="secondary"
				>
					<v-card-title
						class="picker-title"
					>Выберите время</v-card-title>
					<TimePicker
						:key="pickerKey"
						:hhmm="timeValue"
						@time="setDateStartTime"
					/>
				</v-card>

				<v-card-actions class="app-background--secondary">
					<v-spacer/>
					<v-btn
						@click="resetTime"
						background
						color="primary_text"
						class="app-background--primary"
						text
					>Закрыть</v-btn>
					<v-btn
						@click="closeTimePicker"
						color="#fff"
						text
						style="background-color: #5088fe;"
					>Сохранить</v-btn>
				</v-card-actions>
			</v-card>
		</v-menu>
	</div>
</template>

<script>
import moment from "moment";

export default {
	components: {
		TimePicker: () => import('@/components/inputs/TimePicker.vue')
	},
	props: {
		defaultTime: {
			type: String,
			required: true
		},
		//date datestamp
		defaultTimestamp: {
			type: Number,
			required: true
		},
		dateStart: {
			type: String,
			required: false
		},
		dateEnd: {
			type: String,
			required: false
		},
	},
	data: () => ({
		dateValue: moment().format('DD.MM.YYYY'),
		pickerKey: 1,
		isDateModal: false,
		isTimeModal: false,
		timeValue: '00:00',
		rules: {
			dateValidation: value => {
				let pattern;
				pattern = /^(0[1-9]|[12][0-9]|3[01])[.](0[1-9]|1[0-2])[.]\d\d\d\d$/;
				if (pattern.test(value) && moment(value, 'DD.MM.YYYY HH:mm').isValid()) {
					return true
				} else if (!pattern.test(value)) {
					return 'Невалидная дата, ДД.ММ.ГГГГ';
				} else if (!moment(value, 'DD.MM.YYYY').isValid()) {
					// 31 февраля
					return 'Выбранной даты не существует';
				} else {
					return 'Невалидная дата';
				}
			},
			timeValidation: value => {
				let pattern;
				pattern = /^(0[0-9]|1[0-9]|2[0-3]):((0|1|2|3|4|5)[0-9])$/;
				if (pattern.test(value) && moment(value, 'HH:mm').isValid()) {
					return true
				} else if (!pattern.test(value)) {
					return 'Невалидное время, ЧЧ:ММ';
				} else {
					return 'Невалидное время';
				}
			}
		},
	}),
	methods: {
		closeTimePicker() {
			this.isTimeModal = false;
			this.$emit('set-time', `${this.$moment(this.dateValue, 'DD.MM.YYYY').format('DD-MM-YYYY')}T${this.timeValue}`);
		},

		closeDatePicker() {
			this.isDateModal = false;
			this.$emit('set-time', `${this.$moment(this.dateValue, 'DD.MM.YYYY').format('DD-MM-YYYY')}T${this.timeValue}`);
		},

		resetTime() {
			this.timeValue = this.$moment(this.defaultTime, 'HH:mm', true).isValid() ?
				this.defaultTime : '00:00';
			this.pickerKey++;
			this.isTimeModal = false;
            this.$emit('set-time', `${this.$moment(this.dateValue, 'DD.MM.YYYY').format('DD-MM-YYYY')}T${this.timeValue}`);
		},

		resetDate() {
			this.dateValue = this.$moment().format('DD.MM.YYYY');
			this.isDateModal = false;
		},
		setDateStartTime(time)  {
			this.timeValue = time;
		},
	},
	computed: {
        dateStartPicker: {
			get() {
				if (this.$moment(this.dateValue, 'DD.MM.YYYY').isValid()) {
					return this.$moment(this.dateValue, 'DD.MM.YYYY').format('YYYY-MM-DD');
				}
			},
			set(value) {
				this.dateValue = `${this.$moment(value, 'YYYY-MM-DD').format('DD.MM.YYYY')}`;
			}
		},
		humanTime: {
			get() {
				return this.timeValue;
			},
			set(value) {
				this.pickerKey++;
				this.timeValue = value;
			}
		}
	},
	mounted() {
		if (this.dateStart) {
			this.dateValue = this.$moment(this.dateStart, 'DD-MM-YYYY').format('DD.MM.YYYY')
			this.timeValue = this.$moment(this.dateStart, 'DD-MM-YYYYTHH:mm').format('HH:mm')
		} else if (this.dateEnd)  {
			this.dateValue = this.$moment(this.dateEnd, 'DD-MM-YYYY').format('DD.MM.YYYY')
			this.timeValue = this.$moment(this.dateEnd, 'DD-MM-YYYYTHH:mm').format('HH:mm')
		}  else {
			this.dateValue = moment().format('DD.MM.YYYY')
			this.timeValue = '00:00'
			this.resetTime();
		}
	}
}
</script>

<style lang="scss">
	.wrapper {
		display: flex;
	}
</style>
