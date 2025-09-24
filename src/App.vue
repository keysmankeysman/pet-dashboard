<template>
  <v-app>
    <Aside v-if="$route.path !== '/login'"></Aside>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import Aside from '@/components/Aside.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  mounted() {

  },
  components: {
    Aside
  }
}
</script>

<style scoped>

.app-bar {
  margin-left: 256px;
}


</style>
