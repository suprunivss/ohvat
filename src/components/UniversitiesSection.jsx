import { Link } from 'react-router-dom';
import AddButton from './AddButton';
import ShareLinkButton from './ShareLinkButton';
import { IconImage } from './icons';
import { universityCartItem } from '../utils/cartItems';
import { placeId, placePath } from '../utils/slug';
import { coverPhoto } from '../data/examplePhotos';

function UniversityCard({ v, isInCart, onToggle }) {
  const cartId = 'vuz-' + v.abbr;
  const id = placeId('vuz', v.abbr);
  const photo = coverPhoto('vuz', v);

  return (
    <div className="listing-card" id={id}>
      <div className="listing-media">
        {photo ? (
          <img src={photo.src} alt={v.abbr} loading="lazy" />
        ) : (
          <div className="listing-media-placeholder"><IconImage size={28} /></div>
        )}
        <span className="listing-media-badge">{v.total} позиций</span>
      </div>

      <div className="listing-body">
        <div>
          <Link to={placePath(id)} className="listing-title">{v.abbr}</Link>
          <div className="listing-addr">{v.name}</div>
        </div>

        <div className="vuz-counts">
          <span><b>{v.static}</b> статика</span>
          <span><b>{v.screen}</b> экраны</span>
          <span><b>{v.addresses}</b> корпус(а)</span>
        </div>

        <div className="listing-prices">
          <div className="listing-price-row">
            <div className="info">
              <span className="label">Рамки, лайтбоксы, экраны</span>
              <span className="price muted">цена по запросу</span>
            </div>
            <AddButton added={isInCart(cartId)} onClick={() => onToggle(universityCartItem(v))} />
          </div>
        </div>

        <div className="listing-footer">
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
        <span style={{ color: 'var(--ink-faint)' }}>Точная цена по конкретной позиции — уточнить у партнёра</span>
      </div>
      {items.length ? (
        <div className="grid">
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
