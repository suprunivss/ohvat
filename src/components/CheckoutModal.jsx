import { useMemo, useState } from 'react';
import { buildRequestText } from '../utils/buildRequestText';

export default function CheckoutModal({ open, cart, name, contact, onNameChange, onContactChange, onClose }) {
  const [copied, setCopied] = useState(false);
  const requestText = useMemo(() => buildRequestText(cart, name, contact), [cart, name, contact]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(requestText);
    } catch {
      // буфер обмена недоступен — пользователь может скопировать текст из textarea вручную
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const handleClose = () => {
    setCopied(false);
    onClose();
  };

  return (
    <div className={`modal-overlay ${open ? 'open' : ''}`} onClick={handleClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h3>Оформление заявки</h3>
        <p className="hint">
          Это не оплата и не автоматическая бронь — ниже готовый текст заявки с вашими позициями.
          Скопируйте его и отправьте тем способом, который сейчас удобен (почта, Telegram, WhatsApp).
        </p>
        <div className="field">
          <label>Имя / компания</label>
          <input
            type="text"
            placeholder="Например, ООО «Ромашка»"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </div>
        <div className="field">
          <label>Телефон или email для связи</label>
          <input
            type="text"
            placeholder="+7 900 000-00-00"
            value={contact}
            onChange={(e) => onContactChange(e.target.value)}
          />
        </div>
        <textarea className="request-text" readOnly value={requestText}></textarea>
        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={handleClose}>Закрыть</button>
          <button type="button" className="btn-primary" style={{ flex: 1 }} onClick={handleCopy}>
            Скопировать текст заявки
          </button>
        </div>
        <div className={`copied-flag ${copied ? 'show' : ''}`}>Скопировано</div>
      </div>
    </div>
  );
}
