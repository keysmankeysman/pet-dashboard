<template>
  <v-app class="app-background--primary">
    <div data-app>

      <v-toolbar>
        <v-spacer></v-spacer>
        <v-btn @click="handleAddToDashboard" :disabled="!selectType" color="primary" class="mr-5">
          Добавить диаграмму на дашборд
        </v-btn>
        <v-btn>
          Обновить до дефолтных значений
        </v-btn>
      </v-toolbar>

      <v-select
        v-model="selectType"
        :items="diagramTypes"
        item-text="name"
        item-value="type"
        label="Выберите тип диаграммы"
        outlined
        @change="selectedItem"
      ></v-select>

      <Chart 
        :options="options"
        :selectType="selectType"
        :autoresize="false"
      />

      <ManyInputs 
        v-if="selectType"
        :seriesData="options.series[0].data"
        :xAxis="options.xAxis?.data"

        :title="options.title.text"
        

        :selectType="selectType"
        @addItem="addItem"
        @removeItem="removeItem"
        @update:title="updateTitle"
        @update:xAxis="updateXAxis"
        @update:series="updateSeries"
      />

    </div>
  </v-app>
</template>

<script>
import Chart from '@/components/charts/Chart.vue'
import ManyInputs from '@/components/ManyInputs.vue'
import { EventBus } from '@/plugins/eventBus.js'

export default {
  name: 'Redactor',
  components: {
    ManyInputs,
    Chart
  },
  data() {
    return {
      options: {},
      tooltip: {},
      xAxis: {},
      yAxis: {},
      series: [], 

      diagramTypes: [
        { type: 'line', name: 'Линейные диаграммы' },
        { type: 'bar', name: 'Столбчатые диаграммы' },
        { type: 'pie', name: 'Круговые диаграммы' },
      ],
      selectType: '',
      selectedSeriesItem: null,
      item: {}
    }
  },
  methods: {
    randomInteger(min, max) {
      let rand = min + Math.random() * (max + 1 - min)
      return Math.floor(rand)
    },
    handleAddToDashboard() {
      this.item = {
        i: this.randomInteger(100, 1000),
        x: 0,
        y: 6,
        w: 6,
        h: 6,
        options: this.options
      }
      this.$router.push('/dashboard')
      EventBus.$emit('addToDashboard', this.item)

    },
    beforeDestroy() {
      EventBus.$off('addToDashboard', this.handleAddToDashboard)
    },
    selectedItem() {
      this.options = {}

      if (this.selectType === 'line') {
        this.options = {
          title: { text: '' },
          tooltip: {},
          xAxis: { type: 'category', data: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] },
          yAxis: { type: 'value' },
          series: [{ name: 'Продажи', type: 'line', data: [120, 200, 150, 80, 70, 110, 130] }],
        }
      } else if (this.selectType === 'bar') {
        this.options = {
          title: { text: '' },
          tooltip: { trigger: 'axis' },
          xAxis: { type: 'category', data: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл'] },
          yAxis: { type: 'value' },
          series: [{ name: 'Продажи', type: 'bar', data: [500, 700, 600, 800, 900, 1000, 1100] }],
        }
      } else if (this.selectType === 'pie') {
        this.options = {
          title: { text: '', left: 'center' },
          tooltip: { trigger: 'item' },
          series: [{
            name: 'Доля рынка',
            type: 'pie',
            radius: '50%',
            data: [
              { value: 335, name: 'Продукт A' },
              { value: 310, name: 'Продукт B' },
              { value: 234, name: 'Продукт C' },
              { value: 135, name: 'Продукт D' },
              { value: 1548, name: 'Продукт E' },
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              },
            },
          }]
        }
      } 
    },
    removeItem(index) {
      if (this.selectType === 'pie') {
        this.options.series[0].data.splice(index, 1)
      } else {
        this.options.series[0].data.splice(index, 1)
        this.options.xAxis.data.splice(index, 1)
      }
    },
    addItem(credentials) {
      const { name, value } = credentials
      if (this.selectType === 'pie') {
        this.options.series[0].data.push({ name, value })
      } else {
        this.options.series[0].data.push(value)
        this.options.xAxis.data.push(name)
      }
    },
    updateTitle(newTitle) {
      this.options.title.text = newTitle
    },
    updateXAxis(newXAxis) {
      this.options.xAxis.data = newXAxis
    },
    updateSeries(newSeries) {
      this.options.series[0].data = newSeries
    }
  }
}
</script>

