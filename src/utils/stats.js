import { businessCenters, busStations, universities, transport } from '../data/catalogData';

export function computeStats() {
  return {
    bc: businessCenters.length,
    av: Object.keys(busStations).length,
    vuz: universities.length,
    vuzPos: universities.reduce((s, v) => s + v.total, 0),
    tr: transport.routes.length,
  };
}

export function computeCityStats(city) {
  const bc = businessCenters.filter((x) => x.city === city);
  const av = Object.entries(busStations).filter(([c]) => c === city);
  const vuz = universities.filter((v) => v.city === city);
  const tr = transport.routes.filter((r) => r.city === city);
  return {
    bc: bc.length,
    av: av.length,
    vuz: vuz.length,
    vuzPos: vuz.reduce((s, v) => s + v.total, 0),
    tr: tr.length,
  };
}
