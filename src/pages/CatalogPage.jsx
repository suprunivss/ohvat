import { useMemo, useState } from 'react';
import CatalogHeader from '../components/CatalogHeader';
import CatalogToolbar from '../components/CatalogToolbar';
import CatalogFilters from '../components/CatalogFilters';
import BusinessCentersSection from '../components/BusinessCentersSection';
import BusStationsSection from '../components/BusStationsSection';
import UniversitiesSection from '../components/UniversitiesSection';
import TransportSection from '../components/TransportSection';
import { businessCenters, busStations, universities, transport } from '../data/catalogData';
import { computeCityStats } from '../utils/stats';
import { listCities } from '../utils/cities';
import { useCart } from '../context/CartContext';

const CITIES = listCities();

function norm(s) {
  return (s || '').toString().toLowerCase();
}

export default function CatalogPage() {
  const [city, setCity] = useState(CITIES[0]);
  const [activeTab, setActiveTab] = useState('all');
  const [query, setQuery] = useState('');
  const { isInCart, toggleItem } = useCart();

  const stats = computeCityStats(city);
  const q = norm(query);

  const bcFiltered = useMemo(
    () => businessCenters.filter((x) => x.city === city && (!q || norm(x.name).includes(q) || norm(x.address).includes(q))),
    [city, q]
  );
  const avFiltered = useMemo(
    () => Object.entries(busStations).filter(([stationCity, info]) => stationCity === city && (!q || norm(stationCity).includes(q) || norm(info.addr).includes(q))),
    [city, q]
  );
  const vuzFiltered = useMemo(
    () => universities.filter((v) => v.city === city && (!q || norm(v.name).includes(q) || norm(v.abbr).includes(q))),
    [city, q]
  );
  const trFiltered = useMemo(
    () => transport.routes.filter((r) => r.city === city && (!q || norm(r.route).includes(q) || norm(r.num).includes(q) || norm(r.type).includes(q))),
    [city, q]
  );

  const showBC = activeTab === 'all' || activeTab === 'bc';
  const showAV = activeTab === 'all' || activeTab === 'av';
  const showVUZ = activeTab === 'all' || activeTab === 'vuz';
  const showTR = activeTab === 'all' || activeTab === 'tr';

  const nothingFound =
    Boolean(q) &&
    (!showBC || bcFiltered.length === 0) &&
    (!showAV || avFiltered.length === 0) &&
    (!showVUZ || vuzFiltered.length === 0) &&
    (!showTR || trFiltered.length === 0);

  const counts = {
    all: bcFiltered.length + avFiltered.length + vuzFiltered.length + trFiltered.length,
    bc: bcFiltered.length,
    av: avFiltered.length,
    vuz: vuzFiltered.length,
    tr: trFiltered.length,
  };

  return (
    <>
      <CatalogHeader stats={stats} city={city} cities={CITIES} onCityChange={setCity} />
      <CatalogToolbar activeTab={activeTab} onTabChange={setActiveTab} query={query} onQueryChange={setQuery} />

      <main>
        <div className="catalog-layout">
          <CatalogFilters activeTab={activeTab} onTabChange={setActiveTab} query={query} onQueryChange={setQuery} counts={counts} />

          <div className="catalog-results">
            {nothingFound ? (
              <div className="empty">По запросу «{query}» ничего не найдено в городе «{city}»</div>
            ) : (
              <>
                {showBC && <BusinessCentersSection items={bcFiltered} city={city} isInCart={isInCart} onToggle={toggleItem} />}
                {showAV && <BusStationsSection entries={avFiltered} city={city} isInCart={isInCart} onToggle={toggleItem} />}
                {showVUZ && <UniversitiesSection items={vuzFiltered} city={city} isInCart={isInCart} onToggle={toggleItem} />}
                {showTR && <TransportSection routes={trFiltered} city={city} isInCart={isInCart} onToggle={toggleItem} />}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
