<template>
  <v-card    
    class="elevation-0"
    color="secondary"
  >
    <v-card
      color="btn_primary"
      class="elevation-0"
      style="
        text-align: center;
        font-size: 60px;
        color: #fff;
      "
    >
      {{hours ? hours : '00'}}:{{minutes ? minutes : '00'}}
    </v-card>
    <v-row>
      <v-col
        cols="6"
        md="6"
        lg="6"
      >
        <v-select
          full-width
          background-color="input_bg"
          color="grey"
          item-color="primary_text"
          v-model="hours"
          :items="hoursItems"
          return-object
          single-line
          @change="emitTime"
        ></v-select>
      </v-col>
      <v-col
        cols="6"
        md="6"
        lg="6"
      >
        <v-select
          full-width
          background-color="input_bg"
          color="grey"
          item-color="primary_text"
          @change="emitTime"
          v-model="minutes"
          :items="minutesItems"
          return-object
          single-line
        ></v-select>
      </v-col>
    </v-row>
    <v-card-actions
      v-if="showClose"
      class="d-flex"
      style="
        background-color: primary;
        justify-content: flex-end;
      "
    >
      <v-btn
        @click="clearData"
        background
        color="primary_text"
        class="app-background--primary"
        text
      >Закрыть</v-btn>
      <v-btn
        @click="sendTime"
        color="#fff"
        text
        style="background-color: #5088FE;"
      >Сохранить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
  export default {
    props: {
    	hhmm: {
		    type: String,
		    default: '00:00'
	    },
      showClose: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        hours: this.hhmm.split(':')[0],
        hoursItems: [],
        minutes: this.hhmm.split(':')[1],
        minutesItems: []
      }
    },
    methods: {
      sendTime() {
        this.$emit('timeEnter', `${this.hours}:${this.minutes}`);
        this.clearData();
      },
      clearData() {
        this.hours = '00';
        this.minutes =  '00';
        this.$emit('close');
      },
      emitTime() {
        this.$emit('time', `${this.hours}:${this.minutes}`);
      }
    },
    mounted() {
      for (let i = 0; i < 24; i++) {
        if (i.toString().length == 1) {
          this.hoursItems.push('0' + i);
        } else {
          this.hoursItems.push(i.toString());
        }
      }

      for (let i = 0; i < 60; i++) {
        if (i.toString().length == 1) {
          this.minutesItems.push('0' + i);
        } else {
          this.minutesItems.push(i.toString());
        }
      }
    }
  }
</script>
