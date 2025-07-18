<template>
  <v-app class="app-background--primary">
    <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
    >

        <grid-item v-for="item in layout"
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
                :selectType="item.options.series[0].type"
                :autoresize="true"
            />
            <!-- <div v-else>
                {{ item.i }}
            </div>  -->

        </grid-item>
    </grid-layout>
  </v-app>
</template>

<script>
// import localDiagrams from './diagrams.js'
import localLayouts from '@/localData/layouts.js'
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
        layout: localLayouts,
        options: {
          title: { text: 'График' },
          tooltip: {},
          xAxis: { type: 'category', data: ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'] },
          yAxis: { type: 'value' },
          series: [{ name: 'Продажи', type: 'line', data: [120, 200, 150, 80, 70, 110, 130] }],
        },
        selectType: 'line',
        // localDiagrams,
    }
  },
  methods: {

  }
}
</script>

<style scoped>

.grid-item {
    background: #eee;
}

</style>

