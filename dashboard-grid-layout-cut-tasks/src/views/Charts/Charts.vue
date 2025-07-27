<template>
  <v-app class="app-background--primary">

    <v-data-table
        :headers="headers"
        :items="сharts"
        :items-per-page="5"
        class="elevation-1"
    ></v-data-table>

  </v-app>
</template>


<script>
export default {
  name: 'Charts',
  computed: {
    сharts() {
      return this.$store.state.dashboard.layouts
    }
  },
  data() {
    return {
      chart: {
        i: 1,
        x: 0,
        y: 0,
        w: 6,
        h: 8,
        options: {}
      }, 
      headers: [
        { text: 'Id', value: 'i' },
        { text: 'координата x', value: 'x' },
        { text: 'координата y', value: 'y' },
        { text: 'Ширина', value: 'w' },
        { text: 'Высота', value: 'h' }
      ]
    }
  }
}
</script>