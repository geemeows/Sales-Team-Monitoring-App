<template>
  <div class="c-chart__container">
    <v-chart
      ref="chart"
      :option="chartOptions"
    />
  </div>
</template>

<script>
import moment from 'moment';
import { use } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { LineChart } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
} from 'echarts/components';
import VChart from 'vue-echarts';
import { GETTERS, ACTIONS } from '../../constants/performance.vuex';
import { filterDates } from '../../utils/helpers';

use([
  CanvasRenderer,
  LineChart,
  TitleComponent,
  TooltipComponent,
  GridComponent,
  VisualMapComponent,
]);

export default {
  name: 'PerformanceChartComponent',

  components: {
    VChart,
  },
  props: {
    dates: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      // chartData: [
      //   {
      //     date_ms: new Date(1641772800000),
      //     performance: 0.2,
      //   },
      //   {
      //     date_ms: new Date(1641859200000),
      //     performance: 0.33,
      //   },
      //   {
      //     date_ms: new Date(1641945600000),
      //     performance: 0.53,
      //   },
      //   {
      //     date_ms: new Date(1642032000000),
      //     performance: 0.31,
      //   },
      //   {
      //     date_ms: new Date(1642118400000),
      //     performance: 0.65,
      //   },
      //   {
      //     date_ms: new Date(1642204800000),
      //     performance: 0.88,
      //   },
      //   {
      //     date_ms: new Date(1642291200000),
      //     performance: 0.07,
      //   },
      // ],
    };
  },

  computed: {
    originalChartData() {
      return this.$store.getters[
        `performance/${GETTERS.GET_ORIGINAL_PERFORMANCE_DATASET}`
      ];
    },
    chartData() {
      return this.$store.getters[
        `performance/${GETTERS.GET_PERFORMANCE_DATASET}`
      ];
    },
    initOptions() {
      return {
        width: 'auto',
        height: '300px',
      };
    },

    chartOptions() {
      return {
        title: {
          text: 'Team Performance Index',
          left: 'center',
        },
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: 0,
        },
        grid: {
          left: '30px',
          right: '12px',
          bottom: '2px',
          top: '6px',
          containLabel: true,
        },
        xAxis: {
          type: 'category',
          showGrid: false,
          data: this.xAxisData,
          axisLine: {
            show: true,
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            fontSize: 11,
          },
        },
        yAxis: {
          axisLabel: { show: true },
          axisTick: { show: true },
          splitLine: { show: true },
        },
        series: [
          {
            data: this.yAxisData,
            type: 'line',
            symbol: 'circle',
            symbolSize: 2,
            cursor: 'default',
            lineStyle: {
              width: 2,
            },
          },
        ],
      };
    },

    xAxisData() {
      return this.chartData.map((item) => this.formatDate(item.date_ms));
    },

    yAxisData() {
      return this.chartData.map((item) => +item.performance * 100);
    },
  },
  watch: {
    dates: {
      handler(newDates) {
        this.$store.dispatch(
          `performance/${ACTIONS.FILTER_PERFORMANCE_DATA}`,
          filterDates(newDates, this.originalChartData)
        );
      },
    },
  },
  created() {
    this.$store.dispatch(`performance/${ACTIONS.FETCH_PERFORMANCE_DATA}`);
  },

  methods: {
    formatDate(dateInMs) {
      return moment(dateInMs).format('DD MMM YYYY');
    },
  },
};
</script>
