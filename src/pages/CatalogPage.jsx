import { useMemo, useState } from 'react';
import CatalogHeader from '../components/CatalogHeader';
import CatalogToolbar from '../components/CatalogToolbar';
import CatalogFilters from '../components/CatalogFilters';
import BusinessCentersSection from '../components/BusinessCentersSection';
import BusStationsSection from '../components/BusStationsSection';
import UniversitiesSection from '../components/UniversitiesSection';
import TransportSection from '../components/TransportSection';
import CreativeSection from '../components/CreativeSection';
import { businessCenters, busStations, universities, transport } from '../data/catalogData';
import { STATIC_FORMATS, VIDEO_DURATIONS } from '../data/creativeData';
import { computeCityStats, ALL_CITIES } from '../utils/stats';
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

  const isAllCities = city === ALL_CITIES;
  const cityLabel = isAllCities ? 'Все города' : city;
  const stats = computeCityStats(city);
  const q = norm(query);

  const bcFiltered = useMemo(
    () => businessCenters.filter((x) => (isAllCities || x.city === city) && (!q || norm(x.name).includes(q) || norm(x.address).includes(q))),
    [city, isAllCities, q]
  );
  const avFiltered = useMemo(
    () => Object.entries(busStations).filter(([stationCity, info]) => (isAllCities || stationCity === city) && (!q || norm(stationCity).includes(q) || norm(info.addr).includes(q))),
    [city, isAllCities, q]
  );
  const vuzFiltered = useMemo(
    () => universities.filter((v) => (isAllCities || v.city === city) && (!q || norm(v.name).includes(q) || norm(v.abbr).includes(q))),
    [city, isAllCities, q]
  );
  const trFiltered = useMemo(
    () => transport.routes.filter((r) => (isAllCities || r.city === city) && (!q || norm(r.route).includes(q) || norm(r.num).includes(q) || norm(r.type).includes(q))),
    [city, isAllCities, q]
  );
  // Изготовление креатива не привязано к городу — доступно всегда, фильтруется только поиском.
  const crStaticFiltered = useMemo(
    () => STATIC_FORMATS.filter((f) => !q || norm(f.label).includes(q) || norm(f.dims).includes(q)),
    [q]
  );
  const crVideoFiltered = useMemo(
    () => VIDEO_DURATIONS.filter((d) => !q || norm(d.label).includes(q)),
    [q]
  );
  const crCount = crStaticFiltered.length + crVideoFiltered.length;

  // На вкладке "Все места" скрываем категории без единого совпадения для города —
  // иначе страница превращается в стопку "в каталоге пока нет". На конкретной
  // вкладке (например "ВУЗы") сообщение об отсутствии мест всё равно нужно.
  const showBC = activeTab === 'bc' || (activeTab === 'all' && bcFiltered.length > 0);
  const showAV = activeTab === 'av' || (activeTab === 'all' && avFiltered.length > 0);
  const showVUZ = activeTab === 'vuz' || (activeTab === 'all' && vuzFiltered.length > 0);
  const showTR = activeTab === 'tr' || (activeTab === 'all' && trFiltered.length > 0);
  const showCR = activeTab === 'cr' || (activeTab === 'all' && crCount > 0);

  const nothingFound =
    Boolean(q) &&
    (!showBC || bcFiltered.length === 0) &&
    (!showAV || avFiltered.length === 0) &&
    (!showVUZ || vuzFiltered.length === 0) &&
    (!showTR || trFiltered.length === 0) &&
    (!showCR || crCount === 0);

  const nothingInCity =
    !q && activeTab === 'all' &&
    bcFiltered.length === 0 && avFiltered.length === 0 && vuzFiltered.length === 0 && trFiltered.length === 0 &&
    crCount === 0;

  const counts = {
    all: bcFiltered.length + avFiltered.length + vuzFiltered.length + trFiltered.length + crCount,
    bc: bcFiltered.length,
    av: avFiltered.length,
    vuz: vuzFiltered.length,
    tr: trFiltered.length,
    cr: crCount,
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
              <div className="empty">По запросу «{query}» ничего не найдено в {isAllCities ? 'каталоге' : `городе «${city}»`}</div>
            ) : nothingInCity ? (
              <div className="empty">В городе «{city}» пока нет мест в каталоге</div>
            ) : (
              <>
                {showBC && <BusinessCentersSection items={bcFiltered} city={cityLabel} isInCart={isInCart} onToggle={toggleItem} />}
                {showAV && <BusStationsSection entries={avFiltered} city={cityLabel} isInCart={isInCart} onToggle={toggleItem} />}
                {showVUZ && <UniversitiesSection items={vuzFiltered} city={cityLabel} isInCart={isInCart} onToggle={toggleItem} />}
                {showTR && <TransportSection routes={trFiltered} city={cityLabel} isInCart={isInCart} onToggle={toggleItem} />}
                {showCR && <CreativeSection staticItems={crStaticFiltered} videoItems={crVideoFiltered} isInCart={isInCart} onToggle={toggleItem} />}
              </>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
