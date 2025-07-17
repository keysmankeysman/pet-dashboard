<template>
  <v-card :class="{ 'h100': autoresize }">
    <v-card-title v-if="!selectType">Диаграмма</v-card-title>
      <v-chart class="chart" :option="options" :autoresize="autoresize" :class="{ chartHeight: !autoresize }" />
  </v-card>
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
    },
    autoresize: {
      type: Boolean,
      default: true,
      required: true
    }
  }
})
</script>

<style scoped>
.h100 {
  height: 100%;
}

.chartHeight {
  height: 400px;
}
</style>