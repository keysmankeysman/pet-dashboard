<template>
  <div id="app" style="padding-top: 10px">
    <div id="content">
      <div class="chart-controls" slot="header" v-if="forEditDialog">
        <div class="ml-auto"></div>
      </div>
      <div class="chart-wrapper">
        <div class="chart-actions" v-if="isEdit">
          <v-tooltip
            bottom
            v-if="
              $route.name === 'ReportCategories' || $route.name === 'realTime'
            "
          >
            <template v-slot:activator="{ on }">
              <v-btn
                @click="$emit('edit-diagram-categories')"
                icon
                link
                v-on="on"
              >
                <ion-icon class="item-icon" name="settings-outline" />
              </v-btn>
            </template>
            <span>Редактировать</span>
          </v-tooltip>

          <v-tooltip
            bottom
            v-if="
              $route.name !== 'ReportCategories' && $route.name !== 'realTime'
            "
          >
            <template v-slot:activator="{ on }">
              <v-btn @click="$emit('edit-diagram')" icon link v-on="on">
                <ion-icon class="item-icon" name="settings-outline" />
              </v-btn>
            </template>
            <span>Редактировать</span>
          </v-tooltip>

          <v-tooltip
            bottom
            v-if="
              $route.name !== 'ReportCategories' && $route.name !== 'realTime'
            "
          >
            <template v-slot:activator="{ on }">
              <v-btn @click="$emit('copy-diagram')" icon link v-on="on">
                <ion-icon name="copy-outline"></ion-icon>
              </v-btn>
            </template>
            <span>Копировать</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn @click="$emit('delete-diagram')" icon link v-on="on">
                <ion-icon class="item-icon" name="trash-outline" />
              </v-btn>
            </template>
            <span>Удалить</span>
          </v-tooltip>
        </div>
        <v-chart
          :option="getOptions"
          :style="{
            width: typeof width === 'string' ? width : `${width}px`,
            'min-width': typeof width === 'string' ? width : `${width}px`,
            height: typeof height === 'string' ? height : `${height}px`,
          }"
          auto-resize
          class="chart"
          ref="chartRef"
        />
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-btn @click="exportToImage" icon link class="DlBtn" v-on="on">
              <ion-icon class="item-icon" name="download-outline"></ion-icon>
            </v-btn>
          </template>
          <span>Скачать PNG</span>
        </v-tooltip>
      </div>
    </div>
  </div>
</template>

<script>
import VChart, { THEME_KEY } from 'vue-echarts'
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
  provide: {
    [THEME_KEY]: 'light',
  },
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    forEditDialog: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
      default: null,
    },
    height: {
      type: [String, Number],
      default: null,
    },
    series: {
      type: Array,
      default: () => [],
    },
    labels: {
      type: Array,
      default: () => [],
    },
    chartType: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: '',
    },
    yAxisText: {
      type: String,
      default: '',
    },
    xAxisText: {
      type: String,
      default: '',
    },
    titleAlign: {
      type: String,
      default: 'center',
    },
    subtitle: {
      type: String,
      default: '',
    },
    subtitleAlign: {
      type: String,
      default: 'center',
    },
    // title font-size
    titleFz: {
      type: String,
      default: '18px',
    },
    titleColor: {
      type: String,
      default: '#262626',
    },

    subtitleColor: {
      type: String,
      default: '#262626',
    },

    accessibility: {
      type: Object,
      default: null,
    },
    showToolbar: {
      type: Boolean,
      default: true,
    },

    showExport: {
      type: Boolean,
      default: false,
    },

    hasDataLabels: {
      type: Boolean,
      default: false,
    },

    hasLegend: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      updateKey: 1,
      pieOptions: {
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
  computed: {
    getOptions() {
      let newOptions = this.pieOptions
      newOptions.title.text = this.title
      // console.log(newOptions.title)
      // console.log(this.series)

      newOptions.series = this.series

      return newOptions
    },
    // getOptions() {
    //   const chartTypes = {
    //     pie: {
    //       name: 'pie',
    //       radius: '60%',
    //     },
    //     donut: {
    //       name: 'pie',
    //       radius: ['30%', '60%'],
    //     },
    //     line: {
    //       name: 'line',
    //     },
    //     bar: {
    //       name: 'bar',
    //     },
    //     column: {
    //       name: 'bar',
    //     },
    //   }
    //   let maxSerieIndex
    //   let maxVal
    //   let divisor = 1
    //   //let yAxisDefault
    //   if (
    //     this.chartType === 'bar' ||
    //     this.chartType === 'line' ||
    //     this.chartType === 'column'
    //   ) {
    //     const maxVals = this.series.map((serie) => {
    //       return Math.max(...serie.data.map((el) => el.y))
    //     })
    //     maxSerieIndex = maxVals.findIndex(
    //       (val) => val === Math.max(...maxVals)
    //     )
    //     maxVal = Math.max(...maxVals)
    //   }
    //   /*
    //             if ((this.chartType === 'bar' || this.chartType === 'line' || this.chartType === 'column') && !this.yAxisText) {
    //                 const maxVals = this.series.map((serie) => {
    //                     return Math.max(...serie.data.map((el) => el.y))
    //                 })
    //                 maxVal = Math.max(...maxVals)
    //                 if (maxVal) {
    //                     if (maxVal >= 1000000000) {
    //                         divisor = 1000000000
    //                         yAxisDefault = 'Гб'
    //                     } else if (maxVal >= 1000000) {
    //                         divisor = 1000000
    //                         yAxisDefault = 'Мб'
    //                     } else if (maxVal >= 1000) {
    //                         divisor = 1000
    //                         yAxisDefault = 'Кб'
    //                     }
    //                 }
    //             }
    //             */
    //   let series = this.series.map((serie, i) => {
    //     if (serie.data.length > 0) {
    //       serie.data.forEach((el) => {
    //         if (el.name === 'Total') el.name = 'Остальной трафик'
    //       })
    //     }
    //     const newSerie = {
    //       name: serie.name,
    //       type: chartTypes[this.chartType].name,
    //       data: serie.data.map((el) => {
    //         if (
    //           this.chartType === 'bar' ||
    //           this.chartType === 'line' ||
    //           this.chartType === 'column'
    //         ) {
    //           return (el.y / divisor).toFixed(2)
    //         } else if (this.chartType === 'donut' || this.chartType === 'pie') {
    //           return { name: el.name, value: el.y }
    //         }
    //         return { name: el.name, value: el.value }
    //       }),
    //       responsive: true,
    //       label: {
    //         show: this.hasDataLabels,
    //         formatter: '{b}:{c} ({d}%)',
    //         color: this.$vuetify.theme.dark ? '#fff' : '#232323',
    //       },
    //       emphasis: {
    //         itemStyle: {
    //           shadowBlur: 10,
    //           shadowOffsetX: 0,
    //           shadowColor: 'rgba(0, 0, 0, 0.5)',
    //         },
    //       },
    //     }
    //     if (this.chartType === 'donut' || this.chartType === 'pie') {
    //       newSerie.radius = chartTypes[this.chartType].radius
    //       newSerie.center = ['50%', '50%']
    //       newSerie.label.formatter = (params) => {
    //         return `${params.data.name} ${Number(params.data.value).toFixed(
    //           2
    //         )}`
    //       }
    //     } else if (
    //       this.chartType === 'bar' ||
    //       this.chartType === 'line' ||
    //       this.chartType === 'column'
    //     ) {
    //       newSerie.label.show =
    //         this.hasDataLabels &&
    //         Number.isInteger(maxSerieIndex) &&
    //         maxSerieIndex === i
    //       newSerie.label.formatter = (params) => {
    //         if (params.data <= 0.01) {
    //           return ''
    //         }

    //         if (serie.data.length >= 15) {
    //           const index = serie.data.findIndex((el) => el.y == params.data)
    //           return index % 2 === 0 ? `${params.data}` : ''
    //         }
    //         return `${params.data}`
    //       }
    //       newSerie.label.align = 'center'
    //       newSerie.label.padding = 0
    //       newSerie.label.position = 'top'
    //       newSerie.label.distance = 10
    //     }
    //     return newSerie
    //   })
    //   console.log('series', series)
    //   const newOptions = {
    //     color: ['#3b96ec', '#b96c9f', '#a3d799', '#b0916a'],
    //     title: {
    //       text: this.title,
    //       subtext: this.subtitle,
    //       left: this.titleAlign,
    //       subtextStyle: {
    //         align: this.subtitleAlign,
    //         color: this.$vuetify.theme.dark ? '#fff' : '#232323',
    //       },
    //       textStyle: {
    //         color: this.$vuetify.theme.dark ? '#fff' : '#232323',
    //       },
    //     },
    //     tooltip: {
    //       trigger: 'item',
    //       formatter: '{a} <br/>{b} : {c} ({d}%)',
    //     },
    //     grid: {},
    //     legend: {
    //       show: this.hasLegend,
    //       data: this.series.map((serie) => serie.name),
    //       bottom: 0,
    //       height: 50,
    //       textStyle: {
    //         color: this.$vuetify.theme.dark ? '#fff' : '#232323',
    //       },
    //     },
    //     series,
    //   }
    //   if (this.chartType === 'bar') {
    //     newOptions.xAxis = {
    //       type: 'value',
    //       boundaryGap: [0, 0],
    //       name: this.xAxisText,
    //       nameTextStyle: {
    //         color: this.$vuetify.theme.dark ? '#fff' : '#232323',
    //       },
    //     }
    //     newOptions.yAxis = {
    //       type: 'category',
    //       data: this.series[0] ? this.series[0].data.map((el) => el.name) : [],
    //       name: this.yAxisText,
    //       nameTextStyle: {
    //         color: this.$vuetify.theme.dark ? '#fff' : '#232323',
    //       },
    //     }
    //     newOptions.tooltip.formatter = '{a} <br/>{b} : {c}'
    //   } else if (this.chartType === 'line') {
    //     newOptions.xAxis = {
    //       type: 'category',
    //       data: this.series[0] ? this.series[0].data.map((el) => el.name) : [],
    //       name: this.xAxisText,
    //       nameLocation: 'center',
    //       nameTextStyle: {
    //         padding: 20,
    //         color: this.$vuetify.theme.dark ? '#fff' : '#232323',
    //       },
    //     }
    //     newOptions.yAxis = {
    //       type: 'value',
    //       name: this.yAxisText,
    //       nameTextStyle: {
    //         color: this.$vuetify.theme.dark ? '#fff' : '#232323',
    //       },
    //     }
    //     newOptions.tooltip.formatter = '{a} <br/>{b} : {c}'
    //   } else if (this.chartType === 'column') {
    //     newOptions.xAxis = {
    //       type: 'category',
    //       data: this.series[0] ? this.series[0].data.map((el) => el.name) : [],
    //       name: this.xAxisText,
    //       nameLocation: 'center',
    //       interval: 1,
    //       nameTextStyle: {
    //         padding: 20,
    //         color: this.$vuetify.theme.dark ? '#fff' : '#232323',
    //       },
    //       axisLabel: {
    //         rotate: 0,
    //         fontSize: 10,
    //         overflow: 'truncate',
    //         ellipsis: '...',
    //         color: this.$vuetify.theme.dark ? '#fff' : '#232323',
    //         formatter: function (value, index) {
    //           console.log('index', index)
    //           let result = value
    //           if (value.length >= 10) {
    //             result = result.slice(0, 7) + '...'
    //           }
    //           return result
    //         },
    //       },
    //       axisTick: {
    //         show: true,
    //         length: 20,
    //       },
    //     }
    //     const labelLength = Math.round(maxVal / divisor).toString().length
    //     newOptions.yAxis = {
    //       type: 'value',
    //       name: this.yAxisText,
    //       nameLocation: 'center',
    //       nameGap: labelLength * 10 + 5,
    //       nameTextStyle: {
    //         padding: 0,
    //         color: this.$vuetify.theme.dark ? '#fff' : '#232323',
    //       },
    //       axisLabel: {
    //         color: this.$vuetify.theme.dark ? '#fff' : '#232323',
    //       },
    //     }
    //     newOptions.tooltip.formatter = '{a} <br/>{b} : {c}'
    //   }
    //   // eslint-disable-next-line vue/no-side-effects-in-computed-properties

    //   this.updateKey++

    //   return newOptions
    // },
  },
  methods: {
    getOptionsMy() {
      let pieOptions = {
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
            radius: '50%',
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
      return pieOptions
    },  
    exportToImage() {
      const canvas = this.$refs.chartRef.chart
        .getDom()
        .getElementsByTagName('canvas')[0]
      const dataURL = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = dataURL
      link.download = 'chart.png'
      link.click()
    },
  },
}
</script>

<style lang="scss" scoped>
.chart-actions {
  position: absolute;
  top: 3px;
  right: 33px;
  z-index: 3;
}

ion-icon {
  font-size: 20px;
}

.DlBtn {
  display: block;
  padding-bottom: 25px;
}

.chart {
  height: 400px;
  width: 100%;
  min-width: 100%;
}
</style>
