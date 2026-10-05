import { Link, useParams } from 'react-router-dom';
import AddButton from '../components/AddButton';
import ShareLinkButton from '../components/ShareLinkButton';
import { findPlace } from '../utils/findPlace';
import { photosForPlace } from '../data/examplePhotos';
import { mockAvailability } from '../utils/mockAvailability';
import { priceForLift, priceForHall } from '../utils/pricing';
import { liftCartItem, hallCartItem, tariffCartItem, universityCartItem, routeCartItem } from '../utils/cartItems';
import { useCart } from '../context/CartContext';

const CATEGORY_LABEL = {
  bc: 'Бизнес-центр',
  av: 'Автовокзал',
  vuz: 'Учебное заведение',
  tr: 'Транспорт',
};

function PlaceGallery({ photos }) {
  if (!photos.length) {
    return (
      <div className="place-gallery-empty">
        Фото этого места ещё нет — скоро добавим. Ниже пример похожего размещения уточняйте у партнёра.
      </div>
    );
  }
  return (
    <div className="place-gallery">
      {photos.map((p, i) => (
        <figure key={i} className="place-gallery-item">
          <img src={p.src} alt={p.caption} loading="lazy" />
          <figcaption>{p.caption}</figcaption>
        </figure>
      ))}
    </div>
  );
}

function PriceRow({ label, price, muted, added, onAdd }) {
  return (
    <div className="place-price-row">
      <div>
        <div className="place-price-label">{label}</div>
        <div className={`place-price-value ${muted ? 'muted' : ''}`}>{price}</div>
      </div>
      <AddButton added={added} onClick={onAdd} />
    </div>
  );
}

export default function PlaceDetailPage() {
  const { id } = useParams();
  const found = findPlace(id);
  const { isInCart, toggleItem, openPanel } = useCart();

  if (!found) {
    return (
      <div className="place-page">
        <div className="place-notfound">
          <h1>Место не найдено</h1>
          <p>Возможно, ссылка устарела или объект убрали из каталога.</p>
          <Link to="/catalog" className="btn-lg primary">Вернуться в каталог</Link>
        </div>
      </div>
    );
  }

  const { category, item } = found;
  const availability = mockAvailability(id);
  const photos = photosForPlace(category, item);

  let title = '';
  let address = '';
  if (category === 'bc') { title = item.name; address = item.address; }
  if (category === 'av') { title = 'Автовокзал ' + item.city; address = item.addr; }
  if (category === 'vuz') { title = item.abbr; address = item.name; }
  if (category === 'tr') { title = 'Маршрут ' + item.num + ' (' + item.type + ')'; address = item.route; }

  return (
    <div className="place-page">
      <div className="place-page-inner">
        <Link to="/catalog" className="place-back">← Назад в каталог</Link>

        <div className="place-head">
          <div>
            <span className="place-category">{CATEGORY_LABEL[category]}</span>
            <h1 className="place-title">{title}</h1>
            <div className="place-address">{address}</div>
          </div>
          <ShareLinkButton id={id} label className="place-share" />
        </div>

        <div className={`place-availability ${availability.free ? 'free' : 'busy'}`}>
          <span className="place-availability-dot"></span>
          {availability.label}
          <span className="place-availability-note">{availability.note}</span>
        </div>

        <PlaceGallery photos={photos} />

        <div className="place-section">
          <h2>Цена и добавление в заявку</h2>

          {category === 'bc' && (
            <div className="place-prices">
              {item.lift && (
                <PriceRow
                  label={`Лифт · ${item.lift.qty} шт · ${item.lift.format}`}
                  price={priceForLift(item.lift.format).text}
                  muted={priceForLift(item.lift.format).muted}
                  added={isInCart('bc-lift-' + item.address)}
                  onAdd={() => toggleItem(liftCartItem(item))}
                />
              )}
              {item.hall && (
                <PriceRow
                  label={`Холл · ${item.hall.format}`}
                  price={priceForHall(item.hall.format).text}
                  muted={priceForHall(item.hall.format).muted}
                  added={isInCart('bc-hall-' + item.address)}
                  onAdd={() => toggleItem(hallCartItem(item))}
                />
              )}
            </div>
          )}

          {category === 'av' && (
            <div className="place-prices">
              {item.tariffs.map(([dur, priceStr]) => (
                <PriceRow
                  key={dur}
                  label={`Ролик · ${dur}`}
                  price={priceStr}
                  added={isInCart('av-' + item.city + '-' + dur)}
                  onAdd={() => toggleItem(tariffCartItem(item.city, dur, priceStr))}
                />
              ))}
            </div>
          )}

          {category === 'vuz' && (
            <div className="place-prices">
              <PriceRow
                label={`${item.total} позиций (статика ${item.static} · экраны ${item.screen} · ${item.addresses} корпус(а))`}
                price="цена по запросу"
                muted
                added={isInCart('vuz-' + item.abbr)}
                onAdd={() => toggleItem(universityCartItem(item))}
              />
              <p className="place-hint">
                Точная цена зависит от конкретной позиции (рамка А1 — 7 000 ₽/мес, лайтбокс А0 — 9 500 ₽/мес,
                видеоролик 20 сек — 8 000 ₽/мес) — уточняем у партнёра при согласовании.
              </p>
            </div>
          )}

          {category === 'tr' && (
            <div className="place-prices">
              <PriceRow
                label={`Подголовник А4 · ${item.type}`}
                price="цена по запросу"
                added={isInCart('tr-' + item.num + '-' + item.type)}
                onAdd={() => toggleItem(routeCartItem(item))}
              />
            </div>
          )}
        </div>

        <div className="place-cta">
          <button type="button" className="btn-lg primary" onClick={openPanel}>Перейти к заявке</button>
          <Link to="/catalog" className="btn-lg ghost">Смотреть другие места</Link>
        </div>
      </div>
    </div>
  );
}
