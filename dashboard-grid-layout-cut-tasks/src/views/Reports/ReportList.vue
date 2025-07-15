<template>
  <v-app class="dashboard-gradient app-background--primary">
    <div data-app>
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            @click="openReportWindow"
            class="mx-n3"
            icon
            v-bind="attrs"
            v-on="on"
          >
            <ion-icon
              style="margin-top: 2px"
              name="add-circle-outline"
            ></ion-icon>
          </v-btn>
        </template>
        <span>Добавить элементы</span>
      </v-tooltip>

      <v-dialog
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
        v-model="dialog"
        v-if="dialog"
      >
        <v-card autofocus flat color="priamry" width="1000">
          <v-container
            class="my-0 app-background--primary"
            fluid
            style="max-width: 99.5%"
          >
            <v-card class="elevation-0" flat color="primary">
              <v-toolbar dense color="primary" flat style="z-index: 3">
                <v-btn @click="closeDialog" color="#4d85fd" icon large>
                  <ion-icon name="arrow-back-outline"></ion-icon>
                </v-btn>

                <v-toolbar-title> Создание нового графика </v-toolbar-title>

                <v-spacer />

                <v-btn @click="addElement" outlined> Создать </v-btn>
              </v-toolbar>

              <v-card-text :ref="'wrapper'">
                <v-row class="my-n6">
                  <v-col
                    class="my-0 app-background--primary"
                    :ref="'preview'"
                    cols="12"
                    lg="12"
                    md="12"
                    sm="12"
                    :class="{
                      centred:
                        !isDataUpdated ||
                        formData.properties.graphType === 'counter' ||
                        formData.properties.graphType == 'pulse',
                    }"
                  >
                    <v-card
                      color="primary"
                      :height="windowHeight / 3"
                      v-if="!isDataUpdated"
                      class="elevation-0 text-center align-center create-loading"
                    >
                      <v-progress-circular
                        :size="70"
                        :width="7"
                        color="#4d85fd"
                        indeterminate
                      ></v-progress-circular>
                    </v-card>

                    <!-- <DashTable
                      :componentHeight="'100%'"
                      :disableFooter="true"
                      :disableHeader="false"
                      :itemsPerPage="previewItems.length + 1"
                      :key="updateKey"
                      :tableHeaders="previewHeaders"
                      :tableItems="previewItems"
                      :height="'100%'"
                      :tableTitle="{
                        text: tableName || 'Без названия',
                        show: true,
                        subtitle: subtitle
                          ? `${getPreviewPeriod} - ${subtitle}`
                          : getPreviewPeriod,
                      }"
                      v-if="
                        formData.properties.graphType === 'grid' && isDataUpdated
                      "
                    />

                    <v-card
                      class="elevation-0"
                      :width="350"
                      :height="150"
                      v-if="
                        formData.properties.graphType === 'counter' &&
                        isDataUpdated
                      "
                    >
                      <Counter
                        :key="updateKey"
                        :color="'#5088fe'"
                        :title="tableName"
                        :text="'33'"
                        :period="'За неделю'"
                        :percents="'13.37%'"
                      />
                    </v-card>

                    <v-card
                      class="elevation-0"
                      :width="350"
                      :height="150"
                      v-if="formData.properties.graphType === 'pulse'"
                    >
                      <Pulse
                        :key="updateKey"
                        :color="'#5088fe'"
                        :title="'Общий трафик'"
                        :value="'4.97 Гбит/с'"
                        :percents="'-0.57%'"
                        :period="'В реальном времени'"
                      />
                    </v-card>

                    <Echarts
                      :chartType="formData.properties.graphType"
                      :hasDataLabels="chartSettings.hasDataLabels"
                      :hasLegend="chartSettings.hasLegend"
                      :subtitle="
                        subtitle
                          ? `${getPreviewPeriod} - ${subtitle}`
                          : getPreviewPeriod
                      "
                      :yAxisText="chartSettings.hasLabels ? options.yAxis : ''"
                      :xAxisText="chartSettings.hasLabels ? options.xAxis : ''"
                      :height="windowHeight / 2.5"
                      :key="`${updateKey}-1`"
                      :series="options.series"
                      :labels="options.labels"
                      :title="tableName || 'Без названия'"
                      v-if="
                        formData.properties.graphType !== 'grid' &&
                        formData.properties.graphType !== 'area' &&
                        formData.properties.graphType !== 'line_timeline' &&
                        formData.properties.graphType !== 'sankey' &&
                        formData.properties.graphType !== 'net' &&
                        formData.properties.graphType !== 'pulse' &&
                        formData.properties.graphType !== 'counter' &&
                        formData.properties.graphType !== 'stacked area' &&
                        formData.properties.graphType !== 'trend' &&
                        isDataUpdated
                      "
                    />
                    <StackedArea
                      :chartType="formData.properties.graphType"
                      :hasDataLabels="chartSettings.hasDataLabels"
                      :hasLegend="chartSettings.hasLegend"
                      :subtitle="
                        subtitle
                          ? `${getPreviewPeriod} - ${subtitle}`
                          : getPreviewPeriod
                      "
                      :yAxisText="chartSettings.hasLabels ? options.yAxis : ''"
                      :xAxisText="chartSettings.hasLabels ? options.xAxis : ''"
                      :height="windowHeight / 2.5"
                      :key="`${updateKey}-1`"
                      :series="options.series"
                      :labels="options.labels"
                      :title="tableName || 'Без названия'"
                      v-if="
                        formData.properties.graphType === 'stacked area' &&
                        isDataUpdated
                      "
                    />

                    <ApexChart
                      :height="windowHeight / 2.5"
                      :key="updateKey"
                      :x-max="xMax"
                      :x-min="xMin"
                      :chartType="formData.properties.graphType"
                      :title="tableName || 'Без названия'"
                      :hasDataLabels="chartSettings.hasDataLabels"
                      :hasLegend="chartSettings.hasLegend"
                      :subtitle="
                        subtitle
                          ? `${getPreviewPeriod} - ${subtitle}`
                          : getPreviewPeriod
                      "
                      :chartSeries="chartOptions.series"
                      :limit="limit"
                      v-if="
                        formData.properties.graphType !== 'grid' &&
                        (formData.properties.graphType === 'area' ||
                          formData.properties.graphType === 'line_timeline') &&
                        formData.properties.graphType !== 'pulse' &&
                        formData.properties.graphType !== 'counter' &&
                        isDataUpdated
                      "
                    />

                    <SankeyChart
                      v-if="
                        formData.properties.graphType === 'sankey' &&
                        isDataUpdated
                      "
                      :source="chartOptions.series"
                      :title="tableName || 'Без названия'"
                      :subtitle="
                        subtitle
                          ? `${getPreviewPeriod} - ${subtitle}`
                          : getPreviewPeriod
                      "
                    />

                    <NetGraphChart
                      :title="tableName || 'Без названия'"
                      :subtitle="
                        subtitle
                          ? `${getPreviewPeriod} - ${subtitle}`
                          : getPreviewPeriod
                      "
                      v-if="
                        formData.properties.graphType !== 'grid' &&
                        formData.properties.graphType !== 'counter' &&
                        formData.properties.graphType !== 'pulse' &&
                        formData.properties.graphType === 'net' &&
                        isDataUpdated
                      "
                    />

                    <TrendChart
                      :key="updateKey"
                      :height="windowHeight / 2.5"
                      :title="tableName || 'Без названия'"
                      :categories="[
                        2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017,
                        2018, 2019,
                      ]"
                      :chartSeries="{
                        data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5],
                        forecast: [5, 6, 10],
                      }"
                      :subtitle="
                        subtitle
                          ? `${getPreviewPeriod} - ${subtitle}`
                          : getPreviewPeriod
                      "
                      v-if="
                        formData.properties.graphType === 'trend' && isDataUpdated
                      "
                    /> -->

                  </v-col>

                  <v-divider />

                  <v-col
                    :ref="'actions'"
                    class="tabs-header px-0 mx-2"
                    cols="12"
                    lg="12"
                    md="12"
                    sm="12"
                  >
                    <v-tabs
                      background-color="primary"
                      color="#363636"
                      v-model="tab"
                    >
                      <v-tab :key="item.tab" v-for="item in tabs">
                        {{ item.tab }}
                      </v-tab>
                      <v-tabs-slider color="#3373fd"></v-tabs-slider>
                    </v-tabs>
                    <v-card
                      color="secondary"
                      flat
                      style="border-radius: 5px"
                      tile
                      height="340px"
                    >
                      <v-tabs-items v-model="tab">
                        <v-tab-item
                          v-for="item in tabs"
                          :key="item.tab"
                          class="app-background--secondary"
                        >
                          <v-container
                            class="my-0 app-background--secondary"
                            fluid
                            style="max-width: 98%"
                          >
                            <component
                              :is="item.name"
                              @addColumn="handleAddColumn"
                              @change-limit="changeLimit"
                              @change-name="changeName"
                              @change-report="changeDate"
                              @change-report-from-list="changeDate"
                              @report-change-date="setCustomDate"
                              @delete-filter="handleDeleteFilter"
                              @delete-sort="handleDeleteSort"
                              @deleteColumn="handleDeleteColumn"
                              @edit-group="editGroup"
                              @sourceSelected="changeSource"
                            />
                          </v-container>
                        </v-tab-item>
                      </v-tabs-items>
                    </v-card>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-container>
        </v-card>
      </v-dialog>
    </div>
  </v-app>
</template>

<script>
import Visual from "@/views/Reports/Visual";
import Counter from "@/components/Widgets/Counter";

export default {
  name: 'reportlist',
  Visual,
  Counter,
  components: {

    Echarts: () => import("@/components/charts/Echarts"),
  },
  data() {
    return {
      selectedCustomDate: {},
      xMin: "",
      xMax: "",
      isDataUpdated: true,
      chartTypes: [],
      // selectedByte: '',
      subtitle: "",
      chartSettings: {
        hasDataLabels: false,
      },
      chartOptions: {
        series: [],
        chart: {
          id: "area-datetime",
          type: "bar",
          height: 350,
          zoom: {
            autoScaleYaxis: true,
          },
          toolbar: {
            show: false,
          },
        },
        annotations: {
          yaxis: [
            {
              y: 30,
              borderColor: "#999",
              label: {
                show: true,
                text: "",
                style: {
                  color: "#fff",
                  background: "#00E396",
                },
              },
            },
          ],
          xaxis: [
            {
              borderColor: "#999",
              yAxisIndex: 0,
              label: {
                show: true,
                text: "",
                style: {
                  color: "#fff",
                  background: "#775DD0",
                },
              },
            },
          ],
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 0,
          style: "hollow",
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          type: "datetime",
          min: new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
          max: new Date().getTime(),
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        fill: {
          opacity: 1,
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "10%",
            endingShape: "rounded",
          },
        },
      },
      // дефолт лимит записей в таблице
      limit: 10,
      tableName: "",
      dialog: false,
      // данные приходящие из set-int
      selectedPeriod: null,
      //изначальная высота превью
      previewHeight: 250,
      //группировка
      selectedGroupBy: [],
      //колонки
      selectedColumns: [],
      //фильтры
      selectedFilters: [],
      //сортировка
      selectedSort: [],
      isTableLoading: false,
      selectedVariables: [],
      selectedType: "grid",
      tab: null,
      tabs: [
        { tab: "Данные", content: "Данные", name: "Source" },
        { tab: "Визуализация", content: "Визуализация", name: "Visual" },
      ],
      previewHeaders: [],
      previewItems: [],
      selectedJournals: [],
      rows: [{ id: 1 }],
      //репорт ресурс id
      resourceId: "",
      rowId: 2,
      diagramId: null,
      userId: null,
      typeId: null,
      diagramPeriodId: null,
      columnsArray: [],
      filtersArray: [],
      groupsArray: [],
      ordersArray: [],
      formData: { properties: { type: "grid" } },
      options: {
        chart: {
          plotBackgroundColor: null,
          plotBorderWidth: null,
          plotShadow: false,
          type: "pie",
        },
        title: {
          text: "Browser market shares in January, 2018",
        },
        tooltip: {
          pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>",
        },
        accessibility: {
          point: {
            valueSuffix: "%",
          },
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: "pointer",
            dataLabels: {
              enabled: true,
              format: "<b>{point.name}</b>: {point.percentage:.1f} %",
            },
          },
        },
        series: [],
      },
      updateKey: 1,
      elementType: "grid",
      unitsArray: [],
      resourcesArray: [],
    };
  },
  methods: {
    openReportWindow() {
      this.dialog = true;

      this.$nextTick(() => {
        this.setReportWindowFullHeight();
      });
    },
    setReportWindowFullHeight() {
      setTimeout(() => {
        let screenHeight = document.body.clientHeight;
        let actionsHeight = this.$refs["actions"].offsetHeight;
        // 48, 32, 24 это паддинги у контейнеров
        // todo заменить на вычисление этих паддингов
        this.$refs["preview"].style.height = `${
          screenHeight - actionsHeight - 32 - 24
        }px`;
      }, 200);
    },
    closeDialog() {
      this.dialog = false;
    },
    addElement() {
      console.log('добавить элемент')
    },
    handleAddColumn(column) {
      let selectedIndex = this.selectedColumns.findIndex((el) => {
        return el.id == column.id;
      });

      if (selectedIndex != -1) {
        this.selectedColumns[selectedIndex] = column;
      } else {
        this.selectedColumns.push(column);
      }
      this.getTableData();
    },
    changeLimit(limit) {
      if (!Number.isInteger(limit) && limit >= 0 && limit <= 200) {
        this.limit = Number(limit);
        this.formData.limit = Number(limit);
      }
      if (limit === "") {
        this.limit = null;
        this.formData.limit = null;
      }
      this.getTableData();
    },
    changeName(name) {
      this.tableName = name;
      this.formData.name = Number(name);
      this.updateKey++;
    },
      changeDate(period) {
      this.selectedPeriod = period;
      this.selectedCustomDate = {};
      this.getTableData();
    },
    setCustomDate(newDate) {
      this.selectedCustomDate = newDate;
      this.getTableData();
    },
    handleDeleteFilter(filter) {
      this.selectedFilters.splice(
        this.selectedFilters.findIndex((selectedFilter) => {
          return (
            selectedFilter.field == filter.field &&
            selectedFilter.operator == filter.operator &&
            selectedFilter.value == filter.value
          );
        }),
        1
      );
      this.getTableData();
    },
    handleDeleteSort(sort) {
      this.selectedSort.splice(
        this.selectedSort.findIndex((selectedFilter) => {
          return (
            selectedFilter.field == sort.filter.field &&
            selectedFilter.sort == sort.filter.sort
          );
        }),
        1
      );
      this.getTableData();
    },
    handleDeleteColumn(column) {
      this.previewHeaders.splice(
        this.previewHeaders.findIndex((filter) => {
          return (
            filter.fieldName == column.filter.field &&
            filter.operator == column.filter.operator
          );
        }),
        1
      );
    },
    editGroup(groupBy) {
      this.selectedGroupBy = groupBy;
      this.getTableData();
    },
    changeSource(resourceId) {
      this.resourceId = resourceId;
    },
  },
  computed: {
    getPreviewPeriod() {
      if (this.selectedCustomDate.dateStart) {
        return this.selectedCustomDate.humanValue;
      } else {
        return this.selectedPeriod
          ? this.$store.state.periodsInt.find((el) => {
              return this.selectedPeriod.periodId == el.id;
            }).name
          : "";
      }
    },
    windowHeight() {
      return window.innerHeight;
    },
  }
}
</script>
