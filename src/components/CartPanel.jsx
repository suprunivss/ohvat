import { formatRub } from '../utils/pricing';

export default function CartPanel({ open, cart, onClose, onRemove, onCheckout }) {
  const known = cart.filter((c) => c.amount).reduce((s, c) => s + c.amount, 0);
  const unknownCount = cart.filter((c) => !c.amount).length;

  return (
    <>
      <div className={`overlay ${open ? 'open' : ''}`} onClick={onClose}></div>
      <aside className={`panel ${open ? 'open' : ''}`}>
        <div className="panel-head">
          <h3>Ваша заявка</h3>
          <button type="button" className="panel-close" onClick={onClose}>✕</button>
        </div>
        <div className="panel-body">
          {cart.length === 0 ? (
            <div className="panel-empty">Пока пусто. Нажмите «+» на интересующих местах в каталоге.</div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div className="cart-item-top">
                  <span className="cart-item-title">{item.title}</span>
                  <button type="button" className="remove-btn" onClick={() => onRemove(item.id)}>убрать</button>
                </div>
                <div className="cart-item-sub">{item.sub}</div>
                <div className="cart-item-bottom">
                  <span></span>
                  <span className={`cart-item-price ${item.amount ? '' : 'muted'}`}>
                    {item.priceText || (item.amount ? formatRub(item.amount) : 'цена по запросу')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="panel-foot">
          <div className="total-row">
            <span>Сумма по позициям с известной ценой</span>
            <b>{formatRub(known)}</b>
          </div>
          <div className="total-note">
            {unknownCount ? `${unknownCount} поз. без цены — уточняется у партнёра, в сумму не входит` : 'Все цены по позициям известны'}
          </div>
          <button type="button" className="btn-primary" disabled={cart.length === 0} onClick={onCheckout}>
            Сформировать заявку
          </button>
        </div>
      </aside>
    </>
  );
}
