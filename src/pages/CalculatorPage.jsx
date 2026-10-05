import { useState } from 'react';
import { Link } from 'react-router-dom';
import { formatRub } from '../utils/pricing';
import { useCart } from '../context/CartContext';

// Средние рыночные цены на изготовление креатива (не на само размещение —
// цена аренды места считается в каталоге). Финальную стоимость под
// конкретный бриф подтверждает дизайнер/видеограф.
const STATIC_FORMATS = [
  { id: 'a4', label: 'А4', dims: 'малый формат · подголовники, таблички', amount: 1200 },
  { id: 'a3', label: 'А3', dims: 'рамка в лифте БЦ', amount: 1800 },
  { id: 'a1', label: 'А1', dims: 'стенд, рамка в вузе', amount: 2800 },
  { id: 'a0', label: 'А0 / лайтбокс', dims: 'крупный формат, подсветка', amount: 4500 },
];

const VIDEO_DURATIONS = [
  { id: '5s', label: '5 сек', amount: 5000 },
  { id: '10s', label: '10 сек', amount: 8000 },
  { id: '15s', label: '15 сек', amount: 11000 },
  { id: '20s', label: '20 сек', amount: 14000 },
];

const RUSH_MULTIPLIER = 1.4;

function roundTo100(n) {
  return Math.round(n / 100) * 100;
}

export default function CalculatorPage() {
  const [tab, setTab] = useState('static');
  const [staticFormat, setStaticFormat] = useState(STATIC_FORMATS[0].id);
  const [videoDuration, setVideoDuration] = useState(VIDEO_DURATIONS[0].id);
  const [rush, setRush] = useState(false);
  const { toggleItem, openPanel } = useCart();

  const selectedStatic = STATIC_FORMATS.find((f) => f.id === staticFormat);
  const selectedVideo = VIDEO_DURATIONS.find((d) => d.id === videoDuration);
  const baseAmount = tab === 'static' ? selectedStatic.amount : selectedVideo.amount;
  const amount = rush ? roundTo100(baseAmount * RUSH_MULTIPLIER) : baseAmount;

  const handleAdd = () => {
    const base = tab === 'static'
      ? { title: 'Макет · ' + selectedStatic.label, sub: selectedStatic.dims }
      : { title: 'Видеоролик · ' + selectedVideo.label, sub: 'рекламный ролик под размещение' };

    toggleItem({
      id: 'creative-' + tab + '-' + (tab === 'static' ? staticFormat : videoDuration) + (rush ? '-rush' : ''),
      cat: 'creative',
      title: base.title + (rush ? ' · срочно' : ''),
      sub: base.sub,
      amount,
      priceText: formatRub(amount) + (rush ? ' · срочно за 24ч' : ''),
    });
    openPanel();
  };

  return (
    <div className="calc-page">
      <div className="calc-inner">
        <div className="calc-top">
          <div>
            <h1>Калькулятор стоимости креатива</h1>
            <p className="calc-page-sub">
              Сколько стоит изготовить макет или ролик под размещение. Цена за само место —{' '}
              <Link to="/catalog">в каталоге</Link>.
            </p>
          </div>
          <div className="calc-tabs">
            <button type="button" className={`calc-tab ${tab === 'static' ? 'active' : ''}`} onClick={() => setTab('static')}>Статика</button>
            <button type="button" className={`calc-tab ${tab === 'video' ? 'active' : ''}`} onClick={() => setTab('video')}>Видео</button>
          </div>
        </div>

        <div className="calc-card">
          <div className="calc-left">
            <div className="calc-field">
              <span>Срочность</span>
              <div className="calc-urgency">
                <button type="button" className={`calc-urgency-btn ${!rush ? 'active' : ''}`} onClick={() => setRush(false)}>
                  Стандартно<small>2–3 дня</small>
                </button>
                <button type="button" className={`calc-urgency-btn ${rush ? 'active' : ''}`} onClick={() => setRush(true)}>
                  Срочно<small>24 часа · +40%</small>
                </button>
              </div>
            </div>

            <div className="calc-total-row">
              <span>Итог</span>
              <b>{formatRub(amount)}</b>
            </div>
            <button
              type="button"
              className="btn-lg primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleAdd}
            >
              Добавить в заявку
            </button>
            <p className="calc-note">
              Это средняя рыночная цена изготовления — финальную стоимость под ваш бриф подтверждает дизайнер
              или видеограф.
            </p>
          </div>

          <div className="calc-right">
            {tab === 'static' ? (
              <>
                <div className="calc-right-label">Формат:</div>
                <div className="calc-format-grid">
                  {STATIC_FORMATS.map((f) => (
                    <button
                      key={f.id}
                      type="button"
                      className={`calc-format-tile ${staticFormat === f.id ? 'active' : ''}`}
                      onClick={() => setStaticFormat(f.id)}
                    >
                      <span className="calc-format-name">{f.label}</span>
                      <span className="calc-format-dims">{f.dims}</span>
                      <span className="calc-format-price">{formatRub(f.amount)}</span>
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
                <div className="calc-right-label">Длительность:</div>
                <div className="calc-format-grid">
                  {VIDEO_DURATIONS.map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      className={`calc-format-tile ${videoDuration === d.id ? 'active' : ''}`}
                      onClick={() => setVideoDuration(d.id)}
                    >
                      <span className="calc-format-name">{d.label}</span>
                      <span className="calc-format-dims">видеоролик</span>
                      <span className="calc-format-price">{formatRub(d.amount)}</span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
