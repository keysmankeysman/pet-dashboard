<template>
  <v-app class="app-background--primary">
    <grid-layout
      v-if="layouts.length"
      :layout.sync="layouts"
      :col-num="12"
      :row-height="30"
      :is-draggable="true"
      :is-resizable="true"
      :is-mirrored="false"
      :vertical-compact="true"
      :margin="[10, 10]"
      :use-css-transforms="true"
    >
      <grid-item v-for="(item, index) in layouts"
        :x="item.x"
        :y="item.y"
        :w="item.w"
        :h="item.h"
        :i="item.i"
        :key="item.i"
        class="grid-item">
        <Chart 
          :options="item.options"
          :key="item.i"
          :index="index"
          :selectType="item.options.series[0].type"
          :autoresize="true"
          @removeItem="removeItem"
        />
      </grid-item>
    </grid-layout>

    <v-container v-else fluid class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="12" sm="8" md="6" lg="4">
          <v-card class="pa-6 text-center elevation-2" outlined>
            <h2 class="text-h5 font-weight-medium mb-2">
              Графики отсутствуют
            </h2>
            <p class="text-body-1 grey--text mb-6">
              Чтобы добавить график перейдите <br>на страницу 'Редактор'
            </p>
            <v-btn
              color="primary"
              rounded
              @click="$router.push('/redactor')"
              class="mb-2"
            >
              перейти
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

  </v-app>
</template>

<script>
import VueGridLayout from 'vue-grid-layout'
import Chart from '@/components/charts/Chart.vue'
import { EventBus } from '@/plugins/eventBus.js'

export default {
  name: 'grid-layout-vue-lib',
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    Chart
  },
  mounted() {
    EventBus.$on('addToDashboard', (newItem) => {
      this.layout.push(newItem)
    })
  },
  data() {
    return {
      options: {
        title: { text: 'График' },
        tooltip: {},
        xAxis: { type: 'category', data: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] },
        yAxis: { type: 'value' },
        series: [{ name: 'Продажи', type: 'line', data: [120, 200, 150, 80, 70, 110, 130] }],
      },
      selectType: 'line',
    }
  },
  computed: {
    layouts() {
      return this.$store.state.dashboard.layouts
    }
  },
  methods: {
    removeItem(index) {
      this.$store.dispatch('dashboard/removeItem', index)
    }
  }
}
</script>

<style scoped>

.grid-item {
  background: #eee;
}

</style>

