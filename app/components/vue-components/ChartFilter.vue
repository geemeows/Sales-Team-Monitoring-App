<template>
  <div class="c-date-filter">
    <div class="c-date-filter__container">
      <label for="startDate">Start Date: </label>
      <input
        id="startDate"
        v-model="startDate"
        class="c-date-filter__input"
        placeholder="Start Date"
        type="date"
      >
      <label for="endDate">End Date: </label>
      <input
        id="endDate"
        v-model="endDate"
        class="c-date-filter__input"
        placeholder="End Date"
        type="date"
      >
      <button
        class="c-date-filter__button"
        @click="clearSearch"
      >
        Clear Dates
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TableFilterComponent',
  data: () => ({
    startDate: '',
    endDate: '',
  }),
  computed: {
    filterDates() {
      if (this.startDate && this.endDate) return [new Date(this.startDate), new Date(this.endDate)];
      return [];
    },
  },
  watch: {
    filterDates: {
      handler(newDates) {
        this.$emit('change', newDates);
      },
    },
  },
  methods: {
    clearSearch() {
      this.startDate = '';
      this.endDate = '';
    },
  },
};
</script>
