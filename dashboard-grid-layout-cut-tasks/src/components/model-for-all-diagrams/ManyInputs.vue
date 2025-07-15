<template>
  <v-container>
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
      <v-row 
        v-for="(item, index) in seriesData"
        :key="index"
        class="mt-2"
      >
        <v-col cols="12" sm="5">
          <v-text-field
            v-model="item.name"
            :label="`Название элемента ${index + 1}`"
            outlined
          ></v-text-field>
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


  </v-container>
</template>

<script>
export default {
  props: {
    seriesData: {
      type: Array,
      default: () => [],
      required: true
    },
    selectType: {
      type: String,
      default: () => ''
    },
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