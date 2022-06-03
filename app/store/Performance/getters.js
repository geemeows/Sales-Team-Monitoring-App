import { GETTERS } from '../../constants/performance.vuex';

export default {
  [GETTERS.GET_PERFORMANCE_DATASET]: ({
    performanceDataset,
    filteredDataset,
  }) => (filteredDataset.length ? filteredDataset : performanceDataset),
  [GETTERS.GET_ORIGINAL_PERFORMANCE_DATASET]: ({ performanceDataset }) => performanceDataset,
};
