<template>
  <v-app class="app-background--primary">
    <div data-app>

      <!-- <TheMain></TheMain> -->

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
        :key="updateKey"
        :options="options"
        :selectType="selectType"
        :autoresize="false"
      />

      <ManyInputs 
        v-if="selectType"
        :seriesData="options.series[0].data"
        :xAxis="options.xAxis?.data"
        :selectType="selectType"

        :title="options.title.text"

        :lineName="options.series[0]?.name"
        :lineWidth="options.series[0]?.lineStyle?.width"
        :lineColor="options.series[0]?.lineStyle?.color"
        :dotColor="options.series[0]?.itemStyle?.color"
        :smooth="options.series[0]?.smooth"

        :series="options.series"
        
        @update:title="updateTitle"
        @update:lineWidth="updateLineWidth"
        @update:lineName="updateLineName"
        @update:lineColor="updateLineColor"
        @update:dotColor="updateDotColor"
        
        @update:smooth="updateSmooth"
        @update:xAxis="updateXAxis"
        @update:seriesData="updateSeriesData"
        @update:series="updateSeries"
        @addItem="addItem"
        @addLine="addLine"
        @removeItem="removeItem"
        @removeLine="removeLine"
      />

    </div>
  </v-app>
</template>

<script>
// import TheMain from '@/components/task-temporary/TheMain.vue'
import Chart from '@/components/charts/Chart.vue'
import ManyInputs from '@/components/ManyInputs.vue'
import { EventBus } from '@/plugins/eventBus.js'

export default {
  name: 'Redactor',
  components: {
    ManyInputs,
    Chart,
    // TheMain
  },
  data() {
    return {
      options: {},
      tooltip: {},
      xAxis: {},
      yAxis: {},
      series: [], 
      updateKey: 1,

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
          series: [
            {
                name: 'Продажи',
                type: 'line',
                data: [50, 210, 200, 250, 60, 20, 100],
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#4285F4'
                },
                itemStyle: {
                    color: '#4285F4'
                }
            },
            {
                name: 'Возвраты',
                type: 'line',
                data: [15, 30, 25, 18, 12, 20, 22],
                smooth: true,
                lineStyle: {
                    width: 3,
                    color: '#EA4335'
                },
                itemStyle: {
                    color: '#EA4335'
                }
            }
          ],
          // series: [{ name: 'Продажи', type: 'line', data: [120, 200, 150, 80, 70, 110, 130], smooth: true, lineStyle: { width: 3, color: '#4285F4'}, itemStyle: { color: '#eeeeee' } }],
          // series: [{ name: 'Продажи', type: 'line', data: [120, 200, 150, 80, 70, 110, 130], smooth: true }],
        }
      } else if (this.selectType === 'bar') {
        this.options = {
          title: { text: 'Доходы и расходы 2023' },
          tooltip: { trigger: 'axis' },
          legend: { data: ['Доходы', 'Расходы'] },
          xAxis: {
            type: 'category',
            data: ['1 кв.', '2 кв.', '3 кв.', '4 кв.'],
          },
          yAxis: { type: 'value' },
          series: [
            {
              name: 'Доходы',
              type: 'bar',
              data: [150000, 180000, 210000, 190000],
              itemStyle: { color: '#2196F3' },
            },
            {
              name: 'Расходы',
              type: 'bar',
              data: [80000, 95000, 110000, 105000],
              itemStyle: { color: '#F44336' },
            },
          ],
        }
        // this.options = {
        //   title: { text: '' },
        //   tooltip: { trigger: 'axis' },
        //   xAxis: { type: 'category', data: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл'] },
        //   yAxis: { type: 'value' },
        //   series: [{ name: 'Продажи', type: 'bar', data: [500, 700, 600, 800, 900, 1000, 1100] }],
        // }
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
    addItem(credentials) {
      const { name, value } = credentials
      if (this.selectType === 'pie') {
        this.options.series[0].data.push({ name, value })
      } else {
        this.options.series[0].data.push(value)
        this.options.xAxis.data.push(name)
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

    addLine(credentials) {
      const { name, width, color, dotColor, smooth } = credentials
      this.options.series.push(
        {
          name: name,
          type: 'line',
          data: [15, 30, 25, 18, 12, 20, 22],
          smooth,
          lineStyle: {
            width,
            color
          },
          itemStyle: {
            color: dotColor
          }
        }
      )
      
    },
    removeLine(index) {
      console.log('this.options.series', this.options.series)
      this.options.series.splice(index, 1)
      this.updateKey++
    },

    updateTitle(newTitle) {
      this.options.title.text = newTitle
    },
    updateLineName(lineName) {
      this.options.series[0].name = lineName
    },
    updateLineWidth(lineWidth) {
      this.options.series[0].lineStyle.width = lineWidth
    },
    updateLineColor(lineColor) {
      this.options.series[0].lineStyle.color = lineColor
    },
    updateDotColor(dotColor) {
      this.options.series[0].itemStyle.color = dotColor
    },
    updateSmooth(newSmooth) {
      this.options.series[0].smooth = newSmooth
    },
    updateXAxis(newXAxis) {
      this.options.xAxis.data = newXAxis
    },
    updateSeriesData(newSeries) {
      this.options.series[0].data = newSeries
    },
    updateSeries(newSeries) {
      this.options.series = newSeries
    }
  }
}
</script>

