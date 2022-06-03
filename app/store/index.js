import Vue from 'vue';
import Vuex from 'vuex';

import PerformanceModule from './Performance/index';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    performance: PerformanceModule,
  },
});
