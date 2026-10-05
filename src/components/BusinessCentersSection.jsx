import { Link } from 'react-router-dom';
import AddButton from './AddButton';
import ShareLinkButton from './ShareLinkButton';
import { IconImage, IconMapPin } from './icons';
import { priceForLift, priceForHall, bcHeadlineAmount, headlineText } from '../utils/pricing';
import { liftCartItem, hallCartItem } from '../utils/cartItems';
import { placeId, placePath } from '../utils/slug';
import { coverPhoto, photosForPlace } from '../data/examplePhotos';

function BusinessCenterCard({ item, isInCart, onToggle }) {
  const lift = item.lift ? priceForLift(item.lift.format) : null;
  const hall = item.hall ? priceForHall(item.hall.format) : null;
  const liftId = 'bc-lift-' + item.address;
  const hallId = 'bc-hall-' + item.address;
  const id = placeId('bc', item.name);
  const photo = coverPhoto('bc', item);
  const photoCount = photosForPlace('bc', item).length;
  const headline = headlineText(bcHeadlineAmount(item));

  return (
    <div className="p-card" id={id}>
      <div className="p-media">
        {photo ? (
          <img src={photo.src} alt={item.name} loading="lazy" />
        ) : (
          <div className="p-media-placeholder"><IconImage size={28} /></div>
        )}
        <span className="p-tag"><IconImage size={12} />Бизнес-центр</span>
        {photoCount > 1 && <span className="p-photocount">{photoCount} фото</span>}
        <span className="p-pricetag">{headline}</span>
      </div>

      <div className="p-body">
        <Link to={placePath(id)} className="p-title">{item.name}</Link>
        <div className="p-addr"><IconMapPin size={13} />{item.address}</div>

        <div className="p-offers">
          {item.lift && (
            <div className="p-offer">
              <div className="p-offer-info">
                <span className="p-offer-label">Лифт · {item.lift.qty} шт · {item.lift.format}</span>
                <span className={`p-offer-price ${lift.muted ? 'muted' : ''}`}>{lift.text}</span>
              </div>
              <AddButton added={isInCart(liftId)} onClick={() => onToggle(liftCartItem(item))} />
            </div>
          )}
          {item.hall && (
            <div className="p-offer">
              <div className="p-offer-info">
                <span className="p-offer-label">Холл · {item.hall.format}</span>
                <span className={`p-offer-price ${hall.muted ? 'muted' : ''}`}>{hall.text}</span>
              </div>
              <AddButton added={isInCart(hallId)} onClick={() => onToggle(hallCartItem(item))} />
            </div>
          )}
        </div>

        <div className="p-foot">
          <ShareLinkButton id={id} label />
        </div>
      </div>
    </div>
  );
}

export default function BusinessCentersSection({ items, city, isInCart, onToggle }) {
  return (
    <div className="section">
      <div className="section-head">
        <h2>Бизнес-центры · {city}</h2>
        <div className="section-note">
          Лифты — рамка, холл — лайтбокс/пилларс/экран (формат у каждого БЦ разный). Цена подтверждена
          партнёром только для стандартных форматов А3 (лифт) и А0 (холл).
        </div>
      </div>
      {items.length ? (
        <div className="p-grid">
          {items.map((item) => (
            <BusinessCenterCard key={item.address} item={item} isInCart={isInCart} onToggle={onToggle} />
          ))}
        </div>
      ) : (
        <div className="empty">В городе «{city}» бизнес-центров в каталоге пока нет</div>
      )}
    </div>
  );
}
