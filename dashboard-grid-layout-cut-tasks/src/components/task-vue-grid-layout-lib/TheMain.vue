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
                v-if="item.i === 0" 
                :options="options"
                :selectType="selectType"
            />
            <div v-else>
                {{ item.i }}
            </div> 

        </grid-item>
    </grid-layout>
  </v-app>
</template>

<script>
// import localDiagrams from './diagrams.js'
import VueGridLayout from 'vue-grid-layout'
import Chart from './Chart.vue'

export default {
  name: 'grid-layout-vue-lib',
  components: {
        GridLayout: VueGridLayout.GridLayout,
        GridItem: VueGridLayout.GridItem,
        Chart
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
        // localDiagrams,
        layout: [{
            i: 0,
            x: 0,
            y: 0,
            w: 6,
            h: 6,
        }, {
            i: 1,
            x: 6,
            y: 0,
            w: 6,
            h: 6,
        }, {
            i: 2,
            x: 0,
            y: 6,
            w: 6,
            h: 6,
        }, {
            i: 3,
            x: 6,
            y: 6,
            w: 6,
            h: 6,
        }, {
            i: 4,
            x: 0,
            y: 12,
            w: 6,
            h: 6,
        }]
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

