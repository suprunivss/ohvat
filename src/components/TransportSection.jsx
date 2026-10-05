import { Link } from 'react-router-dom';
import AddButton from './AddButton';
import ShareLinkButton from './ShareLinkButton';
import { IconArrowBigRight } from './icons';
import { transport } from '../data/catalogData';
import { routeCartItem } from '../utils/cartItems';
import { placeId, placePath } from '../utils/slug';

function RouteCard({ route, isInCart, onToggle }) {
  const cartId = 'tr-' + route.num + '-' + route.type;
  const id = placeId('tr', route.num, route.type);
  const legs = route.route.split('→').map((s) => s.trim());

  return (
    <div className="route-card" id={id}>
      <div className="route-card-top">
        <span className="route-num">{route.num}</span>
        <span className="route-type">{route.type}</span>
      </div>
      <Link to={placePath(id)} className="route-path">
        {legs.map((leg, i) => (
          <span key={i} className="route-leg">
            {i > 0 && <IconArrowBigRight className="route-arrow" size={13} />}
            {leg}
          </span>
        ))}
      </Link>
      <div className="route-card-foot">
        <ShareLinkButton id={id} />
        <AddButton added={isInCart(cartId)} onClick={() => onToggle(routeCartItem(route))} />
      </div>
    </div>
  );
}

export default function TransportSection({ routes, city, isInCart, onToggle }) {
  const prices = transport.prices;

  return (
    <div className="section">
      <div className="section-head">
        <h2>Транспорт (подголовники) · {city}</h2>
        <div className="section-note">
          Формат А4 на подголовниках в салоне, печать и монтаж включены в стоимость.
        </div>
      </div>
      <div className="price-ref">
        {Object.entries(prices).map(([type, priceStr]) => (
          <span key={type}>{type}: <b>{priceStr}</b></span>
        ))}
      </div>
      {routes.length ? (
        <div className="grid grid-compact">
          {routes.map((route) => (
            <RouteCard key={route.num + '-' + route.type} route={route} isInCart={isInCart} onToggle={onToggle} />
          ))}
        </div>
      ) : (
        <div className="empty">В городе «{city}» рекламы в транспорте в каталоге пока нет</div>
      )}
    </div>
  );
}
