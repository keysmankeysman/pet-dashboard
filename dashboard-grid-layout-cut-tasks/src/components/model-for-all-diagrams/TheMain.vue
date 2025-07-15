<template>
  <v-app class="dashboard-gradient app-background--primary">
    <div data-app>
      
      {{ selectType }}

      <Chart 
        :options="options"
      />


      <ManyInputs 
        :seriesData="options.series[0].data"
        :selectType="selectType"
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
      options: {},

      xAxis: {},
      series: [], 

      selectType: 'line'
    }
  },
  mounted() {
    if (this.selectType === 'line') {
      this.options = {
        title: { text: 'Тайтл 1' },
        tooltip: {},
        xAxis: { type: 'category', data: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] },
        yAxis: { type: 'value' },
        series: [{ name: 'Продажи', type: 'line', data: [120, 200, 150, 80, 70, 110, 130] }],
      }
    } 

    if (this.selectType === 'pie') {
      this.options = {
        title: { text: this.title, left: 'center' },
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
      }
    }
  },
  methods: {

  }
}
</script>

