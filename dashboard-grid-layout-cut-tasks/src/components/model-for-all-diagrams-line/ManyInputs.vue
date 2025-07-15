<template>
  <v-container>
    <v-row 
      v-for="(item, index) in xAxis"
      :key="index"
      class="mt-2"
    >
      <v-col cols="12" sm="5">
        <v-text-field
          v-model="item"
          :label="`Название элемента ${index + 1}`"
          outlined
        ></v-text-field>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    series: {
      type: Array,
      default: () => [],
      required: true
    },
    xAxis: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style scoped>
pre {
  background: #f5f5f5;
  padding: 16px;
  border-radius: 4px;
}
</style>