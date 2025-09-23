<template>
  <v-card :class="{ 'h100': autoresize }" class="chart-wrp">
    <v-card-title v-if="!selectType">Диаграмма</v-card-title>
    <v-chart class="chart" :option="options" :autoresize="autoresize" :class="{ chartHeight: !autoresize }" />
    <v-btn icon @click="removeItem" class="chart-remove">
      <v-icon>mdi-close</v-icon>
    </v-btn>
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
    index: {
      type: Number,
      default: 0
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
  },
  methods: {
    removeItem() {
      this.$emit('removeItem', this.index)
    }
  }
})
</script>

<style scoped>
.chart-wrp {
  position: relative;
}

.chart-remove {
  position: absolute;
  top: 12px;
  right: 12px;
}

.h100 {
  height: 100%;
}

.chartHeight {
  height: 400px;
}
</style>