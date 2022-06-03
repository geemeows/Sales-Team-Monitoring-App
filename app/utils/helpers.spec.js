import { filterDates } from './helpers';
import { performance as performanceData } from '../mocks/performance.json';

describe('FilterDates', () => {
  test('It should return [] with length (0) if dates are not available', () => {
    const startDate = new Date();
    const endDate = new Date();
    expect(filterDates([], performanceData)).toEqual([]);
    expect(filterDates([startDate], performanceData)).toEqual([]);
    expect(filterDates([undefined, endDate], performanceData)).toEqual([]);
  });
  test(`It should return [] with length (${performanceData.length}) when passing date range that covers all records`, () => {
    const startDate = new Date('2022-01-01');
    const endDate = new Date('2022-01-20');
    expect(filterDates([startDate, endDate], performanceData)).toEqual(
      performanceData
    );
    expect(filterDates([startDate, endDate], performanceData)).toHaveLength(
      performanceData.length
    );
  });
  test('It should return [] with length (2) when passing dates between 10 - 11 Jan', () => {
    const startDate = new Date('2022-01-10');
    const endDate = new Date('2022-01-11');
    expect(filterDates([startDate, endDate], performanceData)).toHaveLength(2);
  });
});
