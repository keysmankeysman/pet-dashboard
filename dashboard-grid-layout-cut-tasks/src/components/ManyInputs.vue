<template>
  <v-container>

    <v-row class="mt-2">
      <v-col cols="12" sm="5">
        <v-text-field
          v-model="modelTitle" 
          label="Название Графика"
          @input="updateTitle"
          outlined
        ></v-text-field>

        <!-- чекбокс smooth -->
        <v-checkbox
          v-model="modelSmooth"
          label="Сгладить линии"
          :value="modelSmooth"
          @change="updateSmooth"
        ></v-checkbox>

      </v-col>
    </v-row>

    <v-row class="mt-2">
      <v-col cols="12" sm="5">
        <v-text-field
          v-model="newItemName"
          label="Название"
          outlined
        ></v-text-field>
      </v-col>
      
      <v-col cols="12" sm="5">
        <v-text-field
          v-model.number="newItemValue"
          label="Значение"
          type="number"
          outlined
        ></v-text-field>
      </v-col>
      <v-col cols="12" sm="1">
        <v-btn
          color="primary"
          class="mr-2"
          @click="addItem()"
        >
          Добавить элемент
        </v-btn>
      </v-col>
    </v-row>

    <v-container v-if="selectType === 'pie'">
      <v-row 
        v-for="(item, index) in seriesData"
        :key="index"
        class="mt-2"
      >
        <v-col cols="12" sm="5">
          <v-text-field
            v-model="item.name"
            :label="`Элемент ${index + 1}`"
            outlined
          ></v-text-field>
          {{ item.name }}
        </v-col>
        
        <v-col cols="12" sm="5">
          <v-text-field
            v-model.number="item.value"
            :label="`значение: ${item.name}`"
            type="number"
            outlined
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="1">
          <v-btn
            color="error"
            @click="removeItem(index)"
          >
            Удалить элемент
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row>
        <v-col v-for="(day, index) in xAxis" :key="index" class="position-static">
          <v-btn icon @click="removeItem(index)" class="position-absolute bottom-0 right-0">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-text-field
            v-model="xAxis[index]"
            label="День недели"
            @input="updateXAxis"
          />
        </v-col>
      </v-row>
      <v-row>
        <v-col v-for="(value, index) in seriesData" :key="index">
          <v-text-field
            v-model="seriesData[index]"
            label="Продажи"
            type="number"
            @input="updateSeries"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      newItemName: '',
      newItemValue: '',
      modelTitle: '',
      modelSmooth: this.smooth,
    }
  },
  watch: {
    selectType() {
      this.newItemName = ''
      this.newItemValue = ''
    },
    title(newVal) {
      this.modelTitle = newVal
    },
    smooth(newVal) {
      this.modelSmooth = newVal
    },
  },
  props: {
    selectType: {
      type: String,
      default: () => ''
    },
    xAxis: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: () => ''
    },
    smooth: {
      type: Boolean,
      default: () => false
    },
    seriesData: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    updateTitle() {
      this.$emit('update:title', this.modelTitle)
    },
    updateSmooth() {
      console.log('this.modelSmooth', this.modelSmooth)
      this.$emit('update:smooth', this.modelSmooth)
    },
    addItem() {
      if (!this.newItemName || !this.newItemValue) return 
      this.$emit('addItem', { name: this.newItemName, value: this.newItemValue })
      this.newItemName = ''
      this.newItemValue = ''
    },
    removeItem (index) {
      this.$emit('removeItem', index)
    },
    updateXAxis() {
      this.$emit('update:xAxis', this.xAxis)
    },
    updateSeries() {
      this.$emit('update:series', this.seriesData)
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