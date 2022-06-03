import { MUTATIONS } from '../../constants/performance.vuex';

export default {
  [MUTATIONS.SET_PERFORMANCE_DATASET]: (state, dataset) => {
    state.performanceDataset = dataset;
  },
};
