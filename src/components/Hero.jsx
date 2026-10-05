import { Link } from 'react-router-dom';
import { IconBuilding, IconBus, IconGradCap, IconCheck, IconArrowRight, IconMapPin } from './icons';

const PREVIEW_ROWS = [
  { icon: IconBuilding, title: 'Арсенал · лифт', sub: 'рамка А3', price: '5 000 ₽/мес', added: true },
  { icon: IconBus, title: 'Автовокзал Воронеж', sub: 'ролик 10 сек', price: '15 000 ₽/мес', added: true },
  { icon: IconGradCap, title: 'ВГУ', sub: '56 позиций', price: 'по запросу', added: false },
];

export default function Hero({ stats }) {
  return (
    <section id="top" className="hero">
      <div>
        <span className="hero-eyebrow"><IconMapPin size={13} />Растущая сеть по всей России</span>
        <h1>Реклама там, где <span className="accent">реально видят</span> ваших клиентов</h1>
        <p className="lead">
          Бизнес-центры, автовокзалы, вузы и общественный транспорт — в одном каталоге с понятными
          ценами. Выбираете места, собираете заявку в пару кликов — мы согласуем размещение с партнёрами.
        </p>
        <div className="hero-actions">
          <Link to="/catalog" className="btn-lg primary">
            Смотреть каталог мест
            <IconArrowRight size={18} />
          </Link>
          <a href="#how" className="btn-lg ghost">Как это работает</a>
        </div>
        <div className="hero-stats">
          <div>
            <div className="hero-stat-num">{stats.bc}</div>
            <div className="hero-stat-label">бизнес-центров</div>
          </div>
          <div>
            <div className="hero-stat-num">{stats.av}</div>
            <div className="hero-stat-label">автовокзалов, 5 городов</div>
          </div>
          <div>
            <div className="hero-stat-num">{stats.vuz}</div>
            <div className="hero-stat-label">вузов, {stats.vuzPos} позиций</div>
          </div>
          <div>
            <div className="hero-stat-num">{stats.tr}</div>
            <div className="hero-stat-label">маршрутов транспорта</div>
          </div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-blob hero-blob-1"></div>
        <div className="hero-blob hero-blob-2"></div>
        <div className="hero-preview">
          <div className="hero-preview-head">
            <span>Бизнес-центры</span>
            <span className="hero-preview-badge">21 место</span>
          </div>
          <div className="hero-preview-rows">
            {PREVIEW_ROWS.map((row) => (
              <div key={row.title} className="hero-preview-row">
                <span className="hero-preview-icon"><row.icon size={18} /></span>
                <span className="hero-preview-text">
                  <span className="hero-preview-title">{row.title}</span>
                  <span className="hero-preview-sub">{row.sub}</span>
                </span>
                <span className="hero-preview-price">{row.price}</span>
                <span className={`hero-preview-check ${row.added ? 'on' : ''}`}>
                  {row.added ? <IconCheck size={13} /> : '+'}
                </span>
              </div>
            ))}
          </div>
          <div className="hero-preview-foot">
            <span>Сумма по заявке</span>
            <b>20 000 ₽</b>
          </div>
        </div>
      </div>
    </section>
  );
}
