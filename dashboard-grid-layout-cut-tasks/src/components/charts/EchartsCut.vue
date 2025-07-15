<template>
  <div id="app" style="padding-top: 10px">
    <div id="content">
      <v-chart
        :option="getOptions"
        class="chart"
      />
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
    series: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: '',
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
    }
  }
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
