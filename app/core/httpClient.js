import axios from 'axios';
import { BASE_URL as baseURL } from '../constants/constants';

const { get } = axios.create({
  baseURL,
});

export { get };
