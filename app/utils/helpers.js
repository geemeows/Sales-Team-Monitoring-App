const filterDates = (dates, dataset) => {
  const [startDate, endDate] = dates;
  if (!startDate || !endDate) return [];
  return dataset.filter(({ date_ms: dateInMS }) => {
    const date = new Date(dateInMS);
    return date >= startDate && date <= endDate;
  });
};

export { filterDates };
