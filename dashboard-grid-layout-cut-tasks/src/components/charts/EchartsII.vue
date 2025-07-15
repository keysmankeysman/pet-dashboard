<template>
  <v-app>
    <v-container>
      <v-select
        v-model="selectedDiagramType"
        :items="diagramTypes"
        item-text="name"
        item-value="type"
        label="Выберите тип диаграммы"
        outlined
        @change="updateChart" 
      ></v-select>
      <v-row>
        <v-col>
          <v-card>
            <v-card-title>Диаграмма</v-card-title>
            <v-card-text>
              <v-chart 
                class="chart"
                :options="getOptions" />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import VChart from 'vue-echarts'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/polar'

import { use } from 'echarts/core'

import {
  GridComponent,
  LegendComponent,
  TitleComponent,
  TooltipComponent,
} from 'echarts/components'

import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart } from 'echarts/charts'

use([
  CanvasRenderer,
  PieChart,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
])

export default {
  components: {
    VChart,
  },
  data() {
    return {
      selectedDiagramType: null,
      diagramTypes: [
        { type: 'line', name: 'Линейные диаграммы' },
        { type: 'bar', name: 'Столбчатые диаграммы' },
        { type: 'pie', name: 'Круговые диаграммы' },
      ],
      chartOptions: {}
    }
  },
  computed: {
    getOptions() {
      // return {
      //   title: { text: 'Линейная диаграмма' },
      //   tooltip: {},
      //   xAxis: { type: 'category', data: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] },
      //   yAxis: { type: 'value' },
      //   series: [{ name: 'Продажи', type: 'line', data: [120, 200, 150, 80, 70, 110, 130] }],
      // }
      return {
        title: {
          text: 'Круговая диаграмма',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Доля рынка',
            type: 'pie',
            radius: '40%',
            data: [
              { value: 335, name: 'Продукт A' },
              { value: 310, name: 'Продукт B' },
              { value: 234, name: 'Продукт C' },
              { value: 135, name: 'Продукт D' },
              { value: 1548, name: 'Продукт E' }
            ],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            label: {
              formatter: '{b}: {c} ({d}%)'
            }
          }
        ]
      }


    }
  },
  methods: {
    updateChart() {
      console.log('this.selectedDiagramType', this.selectedDiagramType)
      switch (this.selectedDiagramType) {
        case 'line':
          this.chartOptions = {
            title: { text: 'Линейная диаграмма' },
            tooltip: {},
            xAxis: { type: 'category', data: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] },
            yAxis: { type: 'value' },
            series: [{ name: 'Продажи', type: 'line', data: [120, 200, 150, 80, 70, 110, 130] }],
          }
          break;
        case 'bar':
          this.chartOptions = {
            title: { text: 'Столбчатая диаграмма' },
            tooltip: { trigger: 'axis' },
            xAxis: { type: 'category', data: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл'] },
            yAxis: { type: 'value' },
            series: [{ name: 'Продажи', type: 'bar', data: [500, 700, 600, 800, 900, 1000, 1100] }],
          }
          break
        case 'pie':
          this.chartOptions = {
            title: { text: 'Круговая диаграмма', left: 'center' },
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
            }],
          };
          break
      }
    },
  },
}
</script>


<style scoped>
.chart {
  height: 400px;
  width: 100%;
  min-width: 100%;
}
</style>