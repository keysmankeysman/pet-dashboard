<template>
  <v-chart class="chart" :option="barOptions" />
</template>

<script>
import { defineComponent } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { BarChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart from 'vue-echarts';

use([
  CanvasRenderer,
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default defineComponent({
  name: 'BarChart',
  components: {
    VChart
  },
  data() {
    return {
      barOptions: {
        title: {
          text: 'Столбчатая диаграмма'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Продажи',
            type: 'bar',
            data: [500, 700, 600, 800, 900, 1000, 1100],
            itemStyle: {
              color: '#5470c6'
            }
          }
        ]
      }
    };
  }
});
</script>

<style scoped>
.chart {
  height: 400px;
}
</style>