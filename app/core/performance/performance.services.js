import { get } from '../httpClient';

const getTeamPerformance = () => get('/performance');

export { getTeamPerformance };
