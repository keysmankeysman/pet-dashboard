<template>
  <v-app class="dashboard-gradient app-background--primary">
    <div data-app>
      <Chart 
        :options="options"
      />
      <ManyInputs 
        :series="options.series[0].data"
        :xAxis="options.xAxis.data"
        @update:xAxis="updateXAxis"
        @update:series="updateSeries"
      />
    </div>
  </v-app>
</template>

<script>
export default {
  name: 'Redactor',
  components: {
    Chart: () => import('./Chart.vue'),
    ManyInputs: () => import('./ManyInputs.vue'),
  },
  data() {
    return {
      options: {
        title: { text: 'Тайтл 1' },
        tooltip: {},
        xAxis: { type: 'category', data: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] },
        yAxis: { type: 'value' },
        series: [{ name: 'Продажи', type: 'line', data: [120, 200, 150, 80, 70, 110, 130] }],
      }
    }
  },
  methods: {
    updateXAxis(newXAxis) {
      this.options.xAxis.data = newXAxis;
    },
    updateSeries(newSeries) {
      this.options.series[0].data = newSeries;
    }
  }
}
</script>