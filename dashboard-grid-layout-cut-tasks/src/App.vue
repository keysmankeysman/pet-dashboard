<template>
  <v-app>
    <Aside v-if="$route.path !== '/login'">

    </Aside>
    <Header v-if="$route.path !== '/login'">

    </Header>
		<!-- <v-main>
        <TestChart />
        <TestChartBar />
        <TestChartPie />
        <TestChartLinear />
		</v-main> -->
		<v-main>
      <the-main />
		</v-main>
  </v-app>
</template>

<script>
import TheMain from '@/components/model-for-all-done/TheMain.vue'
import Aside from '@/components/Aside.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  mounted() {

  },
  components: {
    Header,
    Aside,
    TheMain
  }
}
</script>
