<template>
  <div id="app" style="padding-top: 15px">
    <div id="content">
      <div class="chart-controls" slot="header" v-if="forEditDialog">
        <div class="ml-auto"></div>
      </div>
      <div class="chart-wrapper">
        <div class="chart-actions" v-if="isEdit">
          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" link icon @click="$emit('edit-diagram')">
                <ion-icon name="settings-outline" class="item-icon" />
              </v-btn>
            </template>
            <span>Редактировать</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" link icon @click="$emit('copy-diagram')">
                <ion-icon name="copy-outline"></ion-icon>
              </v-btn>
            </template>
            <span>Копировать</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on }">
              <v-btn v-on="on" link icon @click="$emit('delete-diagram')">
                <ion-icon name="trash-outline" class="item-icon" />
              </v-btn>
            </template>
            <span>Удалить</span>
          </v-tooltip>
        </div>
        <VueChart
          :options="getChartOptions"
          :height="height"
          :series="chartSeries"
          :key="updateKey"
        />
      </div>
    </div>
    <!--    Confirm dialog-->
    <!-- <v-dialog
            @keyup.enter="deleteChart"
            max-width="290"
            v-model="confirmDialog"
        >
            <v-card color="primary">
                <v-card-title class="headline">Удаление</v-card-title>
                <v-card-text>Вы уверены?</v-card-text>
                <v-card-actions>
                    <v-btn @click="deleteChart" color="#2C70AC" text>Да</v-btn>
                    <v-btn @click="confirmDialog = false" color="#2C70AC" text>Нет</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog> -->
  </div>
</template>

<script>
export default {
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    forEditDialog: {
      type: Boolean,
      default: false,
    },
    xMin: {
      type: Number,
      default: new Date().getTime() - 7 * 24 * 60 * 60 * 1000,
    },
    xMax: {
      type: Number,
      default: new Date().getTime(),
    },
    width: {
      type: [String, Number],
      default: null,
    },
    height: {
      type: [String, Number],
      default: null,
    },
    chartSeries: {
      type: Array,
      default: () => [],
    },
    chartType: {
      type: String,
      default: null,
    },
    title: {
      type: String,
      default: "",
    },
    titleAlign: {
      type: String,
      default: "center",
    },
    subtitle: {
      type: String,
      default: "",
    },
    subtitleAlign: {
      type: String,
      default: "center",
    },
    // title font-size
    titleFz: {
      type: String,
      default: "18px",
    },
    titleColor: {
      type: String,
      default: "#262626",
    },

    subtitleColor: {
      type: String,
      default: "#262626",
    },

    accessibility: {
      type: Object,
      default: null,
    },
    showToolbar: {
      type: Boolean,
      default: true,
    },
    showExport: {
      type: Boolean,
      default: false,
    },
    hasDataLabels: {
      type: Boolean,
      default: false,
    },
    hasLegend: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: null,
    },
  },
  methods: {
    getChartOptions() {
      const newOptions = Object.assign(this.chartOptions, {
        theme: {
          mode: this.$vuetify.theme.dark ? "dark" : "light",
          palette: "palette1",
        },
      });
      newOptions.chart = {
        background: this.$vuetify.theme.dark ? "#2c2c2c" : "#fff",
        id: "area-datetime",
        type: this.chartType,
        height: this.height,
        zoom: {
          enabled: false,
        },
        toolbar: {
          show: false,
        },
      };

      newOptions.xaxis.tickAmount = this.limit || 10;

      this.chartOptions = newOptions;
      this.updateKey++;
      return newOptions;
    },
  },
  data() {
    return {
      updateKey: 1,
      chartOptions: {
        series: this.chartSeries
          ? this.chartSeries.map((serie) => {
              if (Array.isArray(serie.data)) {
                serie.data = serie.data.map((item) => {
                  if (Array.isArray(item)) {
                    return item.map((el) => {
                      if (typeof el === "string") {
                        return parseFloat(el).toFixed(2);
                      }
                      return el.toFixed(2);
                    });
                  }
                  return item;
                });
              }
              return serie;
            })
          : [],
        chart: {
          background: this.$vuetify.theme.dark ? "#2c2c2c" : "#fff",
          id: "area-datetime",
          type: this.chartType,
          height: this.height,
          zoom: {
            enabled: false,
          },
          toolbar: {
            show: false,
          },
        },
        legend: {
          show: this.hasLegend,
        },
        /*
                    annotations: {
                        yaxis: [{
                            y: 30,
                            borderColor: '#999',
                            label: {
                                show: true,
                                text: '',
                                style: {
                                    color: "#fff",
                                    background: '#00E396'
                                }
                            }
                        }],
                        xaxis: [{
                            borderColor: '#999',
                            yAxisIndex: 0,
                            label: {
                                show: true,
                                text: '',
                                style: {
                                    color: "#fff",
                                    background: '#775DD0'
                                },
                            }
                        }]
                    },
                    */
        dataLabels: {
          enabled: this.hasDataLabels,
        },
        markers: {
          size: 0,
          style: "hollow",
        },
        stroke: {
          show: true,
        },
        xaxis: {
          type: "category",
          min: this.xMin,
          max: this.xMax,
          labels: {
            formatter: function (value, timestamp) {
                console.log(timestamp)
              return new Date(value).toLocaleTimeString();
            },
          },
        },
        tooltip: {
          x: {
            format: "dd MMM yyyy",
          },
        },
        fill: {
          opacity: 1,
        },
        fontFamily: "Manrope",
        subtitle: {
          text: this.subtitle,
          align: this.subtitleAlign,
          style: {
            fontFamily: "Manrope",
          },
        },
        title: {
          text: this.title,
          align: this.titleAlign,
          style: {
            fontFamily: "Manrope",
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "10%",
            endingShape: "rounded",
          },
        },
      },
    };
  },
  created() {
    if (this.chartType === "line_timeline") {
      this.chartOptions.chart.type = "line";
      this.chartOptions.stroke = {
        show: true,
      };
      this.updateKey++;
    } else {
      this.chartOptions.stroke = {
        show: true,
        width: 2,
        colors: ["transparent"],
      };
      this.updateKey++;
    }
  },
  computed: {
    //тригеррится при смене темы

  },
};
</script>

<style lang="scss" scoped>
.chart-actions {
  position: absolute;
  top: 3px;
  right: 3px;
  z-index: 3;
}
ion-icon {
  font-size: 20px;
}
</style>
