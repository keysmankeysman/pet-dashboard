<template>
  <v-container>
    <v-row>
      <v-col v-for="(day, index) in xAxis" :key="index">
        <v-text-field
          v-model="xAxis[index]"
          label="День недели"
          @input="updateXAxis"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="(value, index) in series" :key="index">
        <v-text-field
          v-model="series[index]"
          label="Продажи"
          type="number"
          @input="updateSeries"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    series: {
      type: Array,
      required: true
    },
    xAxis: {
      type: Array,
      required: true
    }
  },
  methods: {
    updateXAxis() {
      this.$emit('update:xAxis', this.xAxis);
    },
    updateSeries() {
      this.$emit('update:series', this.series);
    }
  }
}
</script>