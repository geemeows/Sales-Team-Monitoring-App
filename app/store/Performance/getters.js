import { GETTERS } from '../../constants/performance.vuex';

export default {
  [GETTERS.GET_PERFORMANCE_DATASET]: ({ performanceDataset }) => performanceDataset,
};
