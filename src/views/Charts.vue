<template>
  <v-app class="app-background--primary">

    <v-data-table
        :headers="headers"
        :items="сharts"
        :items-per-page="5"
        class="elevation-1"
    >
      <template v-slot:item.actions="{ item, index}">
        <v-icon
          small
          @click="removeItem(item, index)"
        >
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>

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
        options: {},
      }, 
      headers: [
        { text: 'Название', value: 'options.title.text' },
        { text: 'координата x', value: 'x' },
        { text: 'координата y', value: 'y' },
        { text: 'Ширина', value: 'w' },
        { text: 'Высота', value: 'h' },
        { text: 'Удалить', value: 'actions' },
      ]
    }
  },
  methods: {
    removeItem(item, index) {
      this.$store.dispatch('dashboard/removeItem', index)
    }
  }
}
</script>