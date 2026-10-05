import { Link } from 'react-router-dom';
import AddButton from './AddButton';
import ShareLinkButton from './ShareLinkButton';
import { IconImage, IconMapPin } from './icons';
import { universityCartItem } from '../utils/cartItems';
import { placeId, placePath } from '../utils/slug';
import { coverPhoto, photosForPlace } from '../data/examplePhotos';
import { UNIVERSITY_PRICE_FROM, headlineText } from '../utils/pricing';

function UniversityCard({ v, isInCart, onToggle }) {
  const cartId = 'vuz-' + v.abbr;
  const id = placeId('vuz', v.abbr);
  const photo = coverPhoto('vuz', v);
  const photoCount = photosForPlace('vuz', v).length;

  return (
    <div className="p-card" id={id}>
      <div className="p-media">
        {photo ? (
          <img src={photo.src} alt={v.abbr} loading="lazy" />
        ) : (
          <div className="p-media-placeholder"><IconImage size={28} /></div>
        )}
        <span className="p-tag"><IconImage size={12} />{v.total} позиций</span>
        {photoCount > 1 && <span className="p-photocount">{photoCount} фото</span>}
        <span className="p-pricetag muted">{headlineText(UNIVERSITY_PRICE_FROM)}</span>
      </div>

      <div className="p-body">
        <Link to={placePath(id)} className="p-title">{v.abbr}</Link>
        <div className="p-addr"><IconMapPin size={13} />{v.name}</div>

        <div className="p-specs">
          <span><b>{v.static}</b> статика</span>
          <span><b>{v.screen}</b> экраны</span>
          <span><b>{v.addresses}</b> корпус(а)</span>
        </div>

        <div className="p-offers">
          <div className="p-offer">
            <div className="p-offer-info">
              <span className="p-offer-label">Рамки, лайтбоксы, экраны</span>
              <span className="p-offer-price muted">цена по запросу</span>
            </div>
            <AddButton added={isInCart(cartId)} onClick={() => onToggle(universityCartItem(v))} />
          </div>
        </div>

        <div className="p-foot">
          <ShareLinkButton id={id} label />
        </div>
      </div>
    </div>
  );
}

export default function UniversitiesSection({ items, city, isInCart, onToggle }) {
  const totalPositions = items.reduce((s, v) => s + v.total, 0);
  return (
    <div className="section">
      <div className="section-head">
        <h2>ВУЗы · {city}</h2>
        <div className="section-note">
          {items.length
            ? `${totalPositions} позиций в ${items.length} учебных заведениях: рамки, инфоборды, лайтбоксы, digital-экраны.`
            : 'Рамки, инфоборды, лайтбоксы, digital-экраны в учебных заведениях.'}
        </div>
      </div>
      <div className="price-ref">
        <span>Рамка А1: <b>7 000 ₽/мес</b></span>
        <span>Рамка/лайтбокс А0: <b>9 500 ₽/мес</b></span>
        <span>Видеоролик 20 сек: <b>8 000 ₽/мес</b></span>
        <span className="price-ref-note">Точная цена по конкретной позиции — уточнить у партнёра</span>
      </div>
      {items.length ? (
        <div className="p-grid">
          {items.map((v) => (
            <UniversityCard key={v.abbr} v={v} isInCart={isInCart} onToggle={onToggle} />
          ))}
        </div>
      ) : (
        <div className="empty">В городе «{city}» учебных заведений в каталоге пока нет</div>
      )}
    </div>
  );
}
