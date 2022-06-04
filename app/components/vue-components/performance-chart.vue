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
        visualMap: [
          {
            type: 'piecewise',
            top: 50,
            right: 10,
            pieces: [
              {
                min: 0,
                max: 50,
                label: '0 - 50',
                color: '#F4664C',
              },
              {
                min: 50,
                max: 80,
                label: '50 - 80',
                color: '#FBDC0D',
              },
              {
                min: 80,
                max: 100,
                label: '80 - 100',
                color: '#03974E',
              },
            ],
          },
        ],
        tooltip: {
          trigger: 'axis',
          transitionDuration: 0,
          confine: false,
          hideDelay: 0,
          padding: [5, 10],
          backgroundColor: '#17253F',
          formatter: ([{ name, value, marker }]) => `
            <div class="c-chart__tooltip">
              <span class="c-chart__tooltip-title">${name}</span>
              <span class="c-chart__tooltip-content">
                ${marker}&nbsp;Team Performance Index: ${value}%
              </span>
            </div>
          `,
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
