<template>
  <CCard
    :style="`
      background: ${color};
      height: 100%;
      border-radius: 5px;
      position: relative;
    `"
    color="secondary"
    class="counter mb-0 border-0"
  >
    <div 
      class="counter-actions"
      :style="{
        background: `${getActionsBg(color,-50,99)}`
      }"
      v-if="isEdit"
    >
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            link
            icon
            @click="$emit('edit-diagram')"
          >
            <ion-icon  
              name="settings-outline" 
              class="item-icon"
            />
          </v-btn>
        </template>
        <span>Редактировать</span>
      </v-tooltip>


      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            link
            icon
            @click="$emit('copy-diagram')"
          >
            <ion-icon name="copy-outline"></ion-icon>
          </v-btn>
        </template>
        <span>Копировать</span>
      </v-tooltip>

      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn
            v-on="on"
            link
            icon
            @click="$emit('delete-diagram')"
          >
            <ion-icon 
              name="trash-outline" 
              class="item-icon"
            />
          </v-btn>
        </template>
        <span>Удалить</span>
      </v-tooltip>
    </div>

    <CCardHeader
      :style="`
        background: ${color};
      `"
      class="border-0 pb-0 counter-header ta-c"
    >
      {{title}}
    </CCardHeader>

    <CCardBody
      :style="`
        background: ${color};
      `"
      class="counter-body"
    >
      <div
        class="body-wrapper"
      >
        <div
          class="h3 mb-0 font-weight-bold ta-c counter-body__text"
        >
          {{text}}
        </div>
        <div
          class="ta-c"
          style="
            font-size: 12px;
            font-weight: 400;
          "
        >{{period}}</div>
      </div>
    </CCardBody>
  </CCard>
</template>

<script>
  // import PulseWidget from '@/components/charts/PulseWidget.vue';

  export default {
    name: 'Counter',

    components: {
      // PulseWidget
    },

    props: {
      width: {
        type: [String, Number],
        default: 'auto'
      },
      height: {
        type: [String, Number],
        default: 'auto'
      },
      isEdit: {
        type: Boolean,
        default: false,
      },
      color: {
        type: String,
        default: () => "#5088fe"
      },
      title: {
        type: String,
        default: ''
      },
      text: {
        type: String,
        default: ''
      },
      period: {
        type: String,
        default: ''
      },
    },

    data() {
      return {
        oldValue: 0,
      }
    },

    methods: {
      /** 
       * для затемнения цвета bgc у действий
       * указывать с @param amt -50
       * 
       * @param {String} col цвет в хексе #000000
       * 
       * @param {Number} amt на сколько осветлять
      */
      getActionsBg (col, amt, opacity) {
        col = col.replace(/^#/, '')
        if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]

        let [r, g, b] = col.match(/.{2}/g);
        ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])

        r = Math.max(Math.min(255, r), 0).toString(16)
        g = Math.max(Math.min(255, g), 0).toString(16)
        b = Math.max(Math.min(255, b), 0).toString(16)

        const rr = (r.length < 2 ? '0' : '') + r;
        const gg = (g.length < 2 ? '0' : '') + g;
        const bb = (b.length < 2 ? '0' : '') + b;

        return opacity ? `#${rr}${gg}${bb}${opacity}` : `#${rr}${gg}${bb}`;
      }
    },

    computed: {
    }
  }
</script>

<style lang="scss" scoped>
.counter {
  user-select: none;
}

.counter-actions {
  border-radius: 5px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 3;
  & > ion-icons {
    font-size: 20px;
  }
}

.item-icon {
  font-size: 20px;
}

ion-icon {
  color: white;
}

.counter-header {
  font-size: 14px;
  font-weight: bold;
  padding-top: 13px;
  color: #fff;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}

.counter-body {
  font-weight: 600;
  color: #fff;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  z-index: 1;
  &__text {
    white-space: nowrap;
    font-size: 52px;
  }
}
.body-wrapper {
  position: absolute;
  top: calc(50% + 10px);
  transform: translate(-50%, -50%);
  left: 50%;
}
</style>
