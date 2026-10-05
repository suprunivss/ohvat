import { useState } from 'react';
import { busStations } from '../data/catalogData';
import { parseAmount, formatRub } from '../utils/pricing';
import { useCart } from '../context/CartContext';

const STAND_FORMATS = [
  { id: 'bc-lift', label: 'Лифт в БЦ', dims: 'рамка А3 · 297×420 мм', amount: 5000, priceText: '5 000 ₽/мес' },
  { id: 'bc-hall', label: 'Холл в БЦ', dims: 'лайтбокс А0 · 841×1189 мм', amount: 10000, priceText: '10 000 ₽/мес + 1 000 ₽ печать' },
  { id: 'vuz-a1', label: 'Вуз — рамка', dims: 'формат А1', amount: 7000, priceText: '7 000 ₽/мес' },
  { id: 'vuz-a0', label: 'Вуз — лайтбокс', dims: 'формат А0', amount: 9500, priceText: '9 500 ₽/мес' },
];

const STAND_CITIES = ['Воронеж'];
const ALL_CITIES = Object.keys(busStations);

export default function CalculatorPage() {
  const [tab, setTab] = useState('stand');
  const [city, setCity] = useState('Воронеж');
  const [standFormat, setStandFormat] = useState(STAND_FORMATS[0].id);
  const { toggleItem, openPanel } = useCart();

  const selectedFormat = STAND_FORMATS.find((f) => f.id === standFormat);
  const hasStands = STAND_CITIES.includes(city);

  const cityInfo = busStations[city];
  const durationsForCity = cityInfo ? cityInfo.tariffs : [];
  const [screenDur, setScreenDur] = useState(durationsForCity[0]?.[0]);
  const currentTariff = durationsForCity.find(([d]) => d === screenDur) || durationsForCity[0];
  const screenAmount = currentTariff ? parseAmount(currentTariff[1]) : 0;

  const handleCityChange = (newCity) => {
    setCity(newCity);
    const info = busStations[newCity];
    if (info) setScreenDur(info.tariffs[0][0]);
  };

  const handleAdd = () => {
    if (tab === 'stand') {
      if (!hasStands) return;
      toggleItem({
        id: 'calc-stand-' + selectedFormat.id,
        cat: 'calc',
        title: 'Конструктор · ' + selectedFormat.label,
        sub: selectedFormat.dims,
        amount: selectedFormat.amount,
        priceText: selectedFormat.priceText,
      });
    } else {
      if (!currentTariff) return;
      toggleItem({
        id: 'calc-screen-' + city + '-' + screenDur,
        cat: 'calc',
        title: 'Конструктор · Медиаэкран ' + city,
        sub: 'ролик ' + screenDur,
        amount: screenAmount,
        priceText: currentTariff[1],
      });
    }
    openPanel();
  };

  return (
    <div className="calc-page">
      <div className="calc-inner">
        <div className="calc-top">
          <h1>Конструктор размещения</h1>
          <div className="calc-tabs">
            <button type="button" className={`calc-tab ${tab === 'stand' ? 'active' : ''}`} onClick={() => setTab('stand')}>Стенды и рамки</button>
            <button type="button" className={`calc-tab ${tab === 'screen' ? 'active' : ''}`} onClick={() => setTab('screen')}>Медиаэкраны</button>
          </div>
        </div>

        <div className="calc-card">
          <div className="calc-left">
            <label className="calc-field">
              <span>Город</span>
              <select value={city} onChange={(e) => handleCityChange(e.target.value)}>
                {ALL_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <div className="calc-field">
              <span>Период размещения</span>
              <div className="calc-static-value">1 месяц</div>
            </div>

            {tab === 'screen' && (
              <label className="calc-field">
                <span>Длительность ролика</span>
                <select value={screenDur} onChange={(e) => setScreenDur(e.target.value)}>
                  {durationsForCity.map(([d]) => <option key={d} value={d}>{d}</option>)}
                </select>
              </label>
            )}

            <div className="calc-total-row">
              <span>Итог</span>
              <b>{tab === 'stand' ? (hasStands ? selectedFormat.priceText : 'от 0 ₽') : (currentTariff ? currentTariff[1] : 'от 0 ₽')}</b>
            </div>
            <button
              type="button"
              className="btn-lg primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={handleAdd}
              disabled={tab === 'stand' ? !hasStands : !currentTariff}
            >
              Добавить в заявку
            </button>
            <p className="calc-note">
              Это ориентировочный расчёт по прайсу — точные условия и наличие места подтверждает партнёр.
            </p>
          </div>

          <div className="calc-right">
            {tab === 'stand' ? (
              hasStands ? (
                <>
                  <div className="calc-right-label">Формат:</div>
                  <div className="calc-format-grid">
                    {STAND_FORMATS.map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        className={`calc-format-tile ${standFormat === f.id ? 'active' : ''}`}
                        onClick={() => setStandFormat(f.id)}
                      >
                        <span className="calc-format-name">{f.label}</span>
                        <span className="calc-format-dims">{f.dims}</span>
                        <span className="calc-format-price">{f.priceText}</span>
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="calc-empty">
                  В городе «{city}» пока нет стендов и рамок в каталоге — добавим по мере подключения партнёров.
                </div>
              )
            ) : (
              <>
                <div className="calc-right-label">Экран:</div>
                <div className="calc-screen-mock">
                  <span>{city} · {cityInfo?.screen}</span>
                  <b>ролик {screenDur}</b>
                  <span className="calc-screen-sum">{formatRub(screenAmount)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
