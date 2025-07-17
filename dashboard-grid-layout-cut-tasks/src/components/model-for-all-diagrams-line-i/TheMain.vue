<template>
  <v-app class="dashboard-gradient app-background--primary">
    <div data-app>
      <v-select
        v-model="selectType"
        :items="diagramTypes"
        item-text="name"
        item-value="type"
        label="Выберите тип диаграммы"
        outlined
        @change="selectedItem"
      ></v-select>

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
      diagramTypes: [
        { type: 'line', name: 'Линейные диаграммы' },
        { type: 'bar', name: 'Столбчатые диаграммы' },
        { type: 'pie', name: 'Круговые диаграммы' },
      ],
      selectType: '',
      options: {
        title: {},
        tooltip: {},
        xAxis: {},
        yAxis: {},
        series: [{data: []}]
      }
    }
  },
  methods: {
    setTitle(title, left) {
      this.title = {}
      this.title.text = title
      if (left) this.title.left = left
    },
    setTooltip(trigger) {
      this.tooltip = {}
      if (trigger) this.tooltip.trigger = trigger 
    },
    setXAxis(type, data) {
      this.xAxis = {}
      this.xAxis.type = type
      this.xAxis.data = data
    },
    setYAxis(type) {
      this.yAxis = {}
      this.yAxis.type = type
    },
    selectedItem() {
      this.series = []
      const labels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']
      const data = [120, 200, 150, 80, 70, 110, 130]

      if (this.selectType === 'line') {
        this.setTitle('Тайтл line')
        this.setTooltip('')
        this.setXAxis('category', labels)
        this.setYAxis('value')

        this.series = [{
          name: 'Продажи',
          type: 'line',
          data: data
        }]
      } else if (this.selectType === 'bar') {
        this.setTitle('Тайтл bar')
        this.setTooltip('axis')
        this.setXAxis('category', ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн', 'Июл'])
        this.setYAxis('value')

        this.series = [{
          name: 'Продажи',
          type: 'bar',
          data: [500, 700, 600, 800, 900, 1000, 1100]
        }]
      } else if (this.selectType === 'pie') {
        this.setTitle('Тайтл pie', 'center')
        this.setTooltip('item')
        this.xAxis = {}
        this.yAxis = {}

        const data = [
          { value: 335, name: 'Продукт A' },
          { value: 310, name: 'Продукт B' },
          { value: 234, name: 'Продукт C' },
          { value: 135, name: 'Продукт D' },
          { value: 1548, name: 'Продукт E' }
        ]

        const emphasis = { itemStyle: { shadowBlur: 10, shadowOffsetX: 0, shadowColor: 'rgba(0, 0, 0, 0.5)' } }
        this.series = [{
          name: 'Доля рынка',
          type: 'pie',
          radius: '50%',
          data,
          emphasis
        }]
      } 
    },

    updateXAxis(newXAxis) {
      this.options.xAxis.data = newXAxis
    },
    updateSeries(newSeries) {
      this.options.series[0].data = newSeries
    }
  }
}
</script>