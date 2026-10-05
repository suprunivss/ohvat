import { Link } from 'react-router-dom';
import ShareLinkButton from './ShareLinkButton';
import { IconImage, IconMapPin } from './icons';
import { tariffCartItem } from '../utils/cartItems';
import { placeId, placePath } from '../utils/slug';
import { coverPhoto } from '../data/examplePhotos';

function BusStationCard({ city, info, isInCart, onToggle }) {
  const id = placeId('av', city);
  const photo = coverPhoto('av', { city });

  return (
    <div className="listing-card" id={id}>
      <div className="listing-media">
        {photo ? (
          <img src={photo.src} alt={`Автовокзал ${city}`} loading="lazy" />
        ) : (
          <div className="listing-media-placeholder"><IconImage size={28} /></div>
        )}
        <span className="listing-media-badge">экран {info.screen}</span>
      </div>

      <div className="listing-body">
        <div>
          <Link to={placePath(id)} className="listing-title">Автовокзал {city}</Link>
          <div className="listing-addr"><IconMapPin size={13} />{info.addr}</div>
        </div>

        <div className="listing-meta">Трансляция: {info.hours} · {info.block}</div>

        <div className="av-tariffs">
          {info.tariffs.map(([dur, priceStr]) => {
            const tariffId = 'av-' + city + '-' + dur;
            const added = isInCart(tariffId);
            return (
              <div
                key={dur}
                className={`tariff ${added ? 'added' : ''}`}
                onClick={() => onToggle(tariffCartItem(city, dur, priceStr))}
              >
                <span className="dur">{dur}{added ? ' ✓' : ''}</span>
                <span className="p">{priceStr}</span>
              </div>
            );
          })}
        </div>

        <div className="listing-footer">
          <ShareLinkButton id={id} label />
        </div>
      </div>
    </div>
  );
}

export default function BusStationsSection({ entries, city, isInCart, onToggle }) {
  return (
    <div className="section">
      <div className="section-head">
        <h2>Автовокзал · {city}</h2>
        <div className="section-note">
          Видеореклама на медиаэкранах, оплата за хронометраж ролика в месяц. Кликните по тарифу, чтобы
          добавить в заявку.
        </div>
      </div>
      {entries.length ? (
        <div className="grid">
          {entries.map(([stationCity, info]) => (
            <BusStationCard key={stationCity} city={stationCity} info={info} isInCart={isInCart} onToggle={onToggle} />
          ))}
        </div>
      ) : (
        <div className="empty">В городе «{city}» автовокзала в каталоге пока нет</div>
      )}
    </div>
  );
}
