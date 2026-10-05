import { businessCenters, busStations, universities, transport } from '../data/catalogData';
import { placeId } from './slug';

export function findPlace(id) {
  if (!id) return null;

  const bc = businessCenters.find((item) => placeId('bc', item.name) === id);
  if (bc) return { category: 'bc', item: bc };

  const avEntry = Object.entries(busStations).find(([city]) => placeId('av', city) === id);
  if (avEntry) return { category: 'av', item: { city: avEntry[0], ...avEntry[1] } };

  const vuz = universities.find((v) => placeId('vuz', v.abbr) === id);
  if (vuz) return { category: 'vuz', item: vuz };

  const route = transport.routes.find((r) => placeId('tr', r.num, r.type) === id);
  if (route) return { category: 'tr', item: route };

  return null;
}
