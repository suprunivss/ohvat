import { IconBuilding, IconBus, IconGradCap, IconRoute } from './icons';

export default function CatalogHeader({ stats, city, cities, onCityChange }) {
  const items = [
    { icon: IconBuilding, num: stats.bc, label: 'бизнес-центров' },
    { icon: IconBus, num: stats.av, label: 'автовокзалов' },
    { icon: IconGradCap, num: stats.vuz, label: stats.vuz ? `вузов, ${stats.vuzPos} позиций` : 'вузов' },
    { icon: IconRoute, num: stats.tr, label: 'маршрутов транспорта' },
  ];

  return (
    <div className="catalog-header">
      <div className="catalog-header-inner">
        <div className="section-kicker">Каталог</div>
        <h1 className="catalog-title">Выберите места для размещения</h1>
        <p className="catalog-lead">
          От лифтов в бизнес-центрах до экранов на автовокзалах — везде видна цена. Добавляйте
          позиции в заявку прямо из каталога и отправляйте нам за пару минут.
        </p>

        <label className="catalog-city-picker">
          <span>Город</span>
          <select value={city} onChange={(e) => onCityChange(e.target.value)}>
            {cities.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>

        <div className="catalog-stat-grid">
          {items.map((item) => (
            <div key={item.label} className="catalog-stat-card">
              <span className="catalog-stat-icon"><item.icon size={20} /></span>
              <span>
                <span className="catalog-stat-num">{item.num}</span>
                <span className="catalog-stat-label">{item.label}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
