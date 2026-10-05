import { Link } from 'react-router-dom';
import AddButton from './AddButton';
import ShareLinkButton from './ShareLinkButton';
import { transport } from '../data/catalogData';
import { routeCartItem } from '../utils/cartItems';
import { placeId, placePath } from '../utils/slug';

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
      <div className="tr-price-row">
        {Object.entries(prices).map(([type, priceStr]) => (
          <div key={type} className="tariff">
            <span className="dur">{type}</span>
            <span className="p">{priceStr}</span>
          </div>
        ))}
      </div>
      <div className="table-scroll">
        <table className="routes">
          <thead>
            <tr>
              <th>№ маршрута</th>
              <th>Тип ТС</th>
              <th>Маршрут следования</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {routes.length ? (
              routes.map((route) => {
                const cartId = 'tr-' + route.num + '-' + route.type;
                const rowId = placeId('tr', route.num, route.type);
                return (
                  <tr key={cartId} id={rowId}>
                    <td><Link to={placePath(rowId)} className="card-title-link">{route.num}</Link></td>
                    <td>{route.type}</td>
                    <td>{route.route}</td>
                    <td className="tr-add">
                      <ShareLinkButton id={rowId} />
                      <AddButton added={isInCart(cartId)} onClick={() => onToggle(routeCartItem(route))} />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="empty">В городе «{city}» рекламы в транспорте в каталоге пока нет</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
