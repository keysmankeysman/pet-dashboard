<template>

  <v-chart class="chart" :option="options" :autoresize="true" />
 
</template>

<script>
import { defineComponent } from 'vue'
import { use } from 'echarts/core'
import { CanvasRenderer } from 'echarts/renderers'
import { BarChart, PieChart, LineChart } from 'echarts/charts'
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components'
import VChart from 'vue-echarts'

use([
  CanvasRenderer,
  BarChart,
  PieChart, 
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
])

export default defineComponent({
  name: 'chart',
  components: {
    VChart
  },
  props: {
    options: {
      type: Object,
      default: () => {},
      required: true
    },
    selectType: {
      type: String,
      default: '',
      required: true
    }
  }
})
</script>

<style scoped>
.chart {
  height: 100%;
  width: 100%;
}
</style>