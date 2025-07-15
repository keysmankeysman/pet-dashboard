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
			<v-fade-transition>
				<router-view/>
			</v-fade-transition>
		</v-main>
  </v-app>
</template>

<script>
// import TestChart from '@/components/TestChart.vue'
// import TestChartLinear from '@/components/TestChartLinear.vue'
// import TestChartPie from '@/components/TestChartPie.vue'
// import TestChartBar from '@/components/TestChartBar.vue'
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
      // TestChart,
      // TestChartLinear,
      // TestChartPie,
      // TestChartBar
  }
}
</script>
