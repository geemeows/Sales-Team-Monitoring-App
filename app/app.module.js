import Vue from 'vue';
import 'ngVue';
import 'ngVue/build/plugins.js';
import PerformancePageComponent from './pages/performance-page.vue';
import PerformanceChartComponent from './components/vue-components/performance-chart.vue';
import TableFilterComponent from './components/vue-components/TableFilter.vue';
import angular from 'angular';

import store from './store';

angular
  .module('appModule', ['ui.router', 'ngVue', 'ngVue.plugins'])
  .config(($ngVueProvider) => {
    $ngVueProvider.setRootVueInstanceProps({
      store: store,
    });
  });

angular.module('appModule').filter('highlight', function ($sce) {
  return function (text, searchStr) {
    const regex = new RegExp(`${searchStr}`, 'gi');
    return $sce.trustAsHtml(
      text.replace(
        regex,
        (matched) => `<span class="c-users-list__record--highlight">${matched}</span>`
      )
    );
  };
});

angular
  .module('appModule')
  .directive('vPerformancePage', (createVueComponent) => {
    return createVueComponent(
      Vue.component('PerformancePageComponent', PerformancePageComponent)
    );
  });

angular
  .module('appModule')
  .directive('vPerformanceChart', (createVueComponent) => {
    return createVueComponent(
      Vue.component('PerformanceChartComponent', PerformanceChartComponent)
    );
  });
angular.module('appModule').directive('vTableFilter', (createVueComponent) => {
  return createVueComponent(
    Vue.component('TableFilterComponent', TableFilterComponent)
  );
});
