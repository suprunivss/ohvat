import { IconBuilding, IconBus, IconGradCap, IconRoute, IconMapPin } from './icons';
import { ALL_CITIES } from '../utils/stats';

export default function CatalogHeader({ stats, city, cities, onCityChange }) {
  const items = [
    { icon: IconBuilding, num: stats.bc, label: 'бизнес-центров' },
    { icon: IconBus, num: stats.av, label: 'автовокзалов' },
    { icon: IconGradCap, num: stats.vuz, label: stats.vuz ? `вузов, ${stats.vuzPos} позиций` : 'вузов' },
    { icon: IconRoute, num: stats.tr, label: 'маршрутов транспорта' },
  ].filter((item) => item.num > 0);

  return (
    <div className="catalog-header">
      <span className="catalog-glow catalog-glow-1" aria-hidden="true" />
      <span className="catalog-glow catalog-glow-2" aria-hidden="true" />

      <div className="catalog-header-inner">
        <div className="catalog-eyebrow">Каталог рекламных мест</div>
        <h1 className="catalog-title">Выберите места для размещения</h1>
        <p className="catalog-lead">
          От лифтов в бизнес-центрах до экранов на автовокзалах — везде видна цена. Добавляйте
          позиции в заявку прямо из каталога и отправляйте нам за пару минут.
        </p>

        <div className="catalog-header-controls">
          <label className="catalog-city-picker">
            <IconMapPin size={15} />
            <select value={city} onChange={(e) => onCityChange(e.target.value)}>
              <option value={ALL_CITIES}>Все города</option>
              {cities.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </label>

          <div className="catalog-stat-strip">
            {items.map((item) => (
              <div key={item.label} className="catalog-stat-chip">
                <item.icon size={15} />
                <span><b>{item.num}</b> {item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
