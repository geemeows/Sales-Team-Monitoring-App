<template>
  <div class="c-dashboard">
    <div class="c-filters__container">
      <ChartFilter @change="changeFilterDates" />
    </div>
    <div class="c-dashboard__header">
      <performance-chart-component :dates="dates" />
    </div>
  </div>
</template>

<script>
import PerformanceChartComponent from '../components/vue-components/performance-chart.vue';
import ChartFilter from '../components/vue-components/ChartFilter.vue';
export default {
  name: 'AboutPageComponent',
  components: {
    PerformanceChartComponent,
    ChartFilter,
  },
  data: () => ({
    dates: [],
  }),
  methods: {
    changeFilterDates(values) {
      this.dates = values;
    },
  },
};
</script>
