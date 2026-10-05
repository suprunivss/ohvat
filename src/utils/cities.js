import { businessCenters, busStations, universities, transport } from '../data/catalogData';

export function listCities() {
  const set = new Set();
  businessCenters.forEach((x) => set.add(x.city));
  Object.keys(busStations).forEach((c) => set.add(c));
  universities.forEach((v) => set.add(v.city));
  transport.routes.forEach((r) => set.add(r.city));
  const cities = [...set];
  cities.sort((a, b) => (a === 'Воронеж' ? -1 : b === 'Воронеж' ? 1 : a.localeCompare(b, 'ru')));
  return cities;
}
