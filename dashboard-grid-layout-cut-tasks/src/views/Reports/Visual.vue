<template>
  <div class="elevation-0">
    <v-row dense>
      <v-col :cols="3" :lg="3" :md="3">
        <v-select
          :items="chartTypes"
          @change="changeGraphType(selectedGraphType)"
          background-color="input_bg"
          color="grey"
          dense
          flat
          hide-details
          return-object
          item-color="primary_text"
          item-text="viewName"
          item-value="name"
          label="Тип графика"
          no-data-text="Нет данных для отображения"
          solo
          v-model="selectedGraphType"
        />
      </v-col>

      <v-col :cols="3" :lg="3" :md="3">
        <v-text-field
          @change="$emit('change-name', $event)"
          background-color="input_bg"
          color="grey"
          dense
          flat
          hide-details
          item-color="grey"
          label="Наименование"
          solo
          v-model="tableName"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row dense v-if="isChartType">
      <v-col :cols="8" :lg="8" :md="8">
        <v-checkbox
          class="visual-checkbox"
          color="grey"
          hide-details
          item-color="grey"
          label="Подпись данных"
          style="width: max-content"
          v-model="chartSettings.hasDataLabels"
          @change="changeChartSettings"
        ></v-checkbox>
        <v-checkbox
          class="visual-checkbox"
          color="grey"
          hide-details
          item-color="grey"
          label="Подпись осей"
          style="width: max-content"
          v-model="chartSettings.hasLabels"
          @change="changeChartSettings"
        ></v-checkbox>
        <v-checkbox
          color="grey"
          hide-details
          item-color="grey"
          label="Легенда"
          style="width: max-content"
          v-model="chartSettings.hasLegend"
          @change="changeChartSettings"
        ></v-checkbox>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: "Visual",
  data() {
    return {
      tableName: "",
      chartSettings: {
        hasDataLabels: false,
        hasLabels: false,
        hasLegend: false,
      },
      selectedType: "grid",
      chartTypes: [],
      // selectedByte: 1000000,
      selectedGraphType: "grid",
    };
  },
  methods: {
    changeGraphType(data) {
      this.$eventManager.$emit("changeGraphType", data);
    },
    clearAllFilters() {
      // this.selectedByte = 1000000;
      this.selectedType = this.chartTypes.find((el) => el.name === "grid");
      this.selectedGraphType = this.chartTypes.find((el) => el.name === "grid");
      this.tableName = "";
      this.chartSettings.hasDataLabels =
        this.chartSettings.hasLabels =
        this.chartSettings.hasLegend =
          false;
      this.$eventManager.$emit("changeGraphTypeClear", this.selectedGraphType);
    },
    changeChartSettings() {
      this.$eventManager.$emit("changeChartSettings", this.chartSettings);
    },
  },
  computed: {
    isTableType() {
      return this.selectedGraphType.name === "grid";
    },
    isChartType() {
      return this.selectedGraphType.name !== "grid";
    },
  },
  created() {
    this.$eventManager.$on("clearVisualForms", () => {
      this.clearAllFilters();
    });
    this.$request.get(`DiagramType/GetAll`).then((res) => {
      this.chartTypes = res.data;
      this.selectedGraphType = res.data.find((el) => el.name === "grid");
      this.$eventManager.$emit("changeGraphType", this.selectedGraphType);
    });
  },
};
</script>

<style scoped></style>
