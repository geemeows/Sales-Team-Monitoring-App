<template>
  <div class="c-filter">
    <input
      v-model="searchStr"
      class="c-filter__input"
      placeholder="Search..."
    >
    <button
      class="c-filter__button"
      @click="clearSearch"
    >
      Clear
    </button>
  </div>
</template>

<script>
export default {
  name: 'TableFilterComponent',
  props: {
    filterStr: {
      type: String,
      default: () => '',
    },
  },
  data: () => ({
    searchStr: '',
  }),
  watch: {
    searchStr: {
      handler(newStr) {
        this.$emit('update-filter', newStr);
      },
    },
  },
  created() {
    if (this.filterStr) {
      this.searchStr = this.filterStr;
    }
  },
  methods: {
    clearSearch() {
      this.searchStr = '';
    },
  },
};
</script>
