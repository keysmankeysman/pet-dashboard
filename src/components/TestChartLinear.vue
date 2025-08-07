<template>
  <v-chart class="chart" :option="lineOptions" />
</template>

<script>
import { defineComponent } from 'vue';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
} from 'echarts/components';
import VChart from 'vue-echarts';

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent
]);

export default defineComponent({
  name: 'LineChart',
  components: {
    VChart
  },
  data() {
    return {
      lineOptions: {
        title: {
          text: 'Линейная диаграмма'
        },
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Продажи',
            type: 'line',
            data: [120, 200, 150, 80, 70, 110, 130],
            smooth: true
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