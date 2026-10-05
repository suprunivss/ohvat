import { Link } from 'react-router-dom';

export default function ContactCta({ onOpenCart }) {
  return (
    <section id="contacts" className="contact-cta">
      <div className="contact-card">
        <div>
          <h2>Готовы разместить рекламу?</h2>
          <p>
            Откройте заявку, проверьте выбранные места и получите готовый текст для отправки в Telegram,
            WhatsApp или на почту — это займёт меньше минуты.
          </p>
        </div>
        <div className="contact-card-actions">
          <button type="button" className="btn-lg primary" onClick={onOpenCart}>Сформировать заявку</button>
          <Link to="/catalog" className="btn-lg ghost-light">Вернуться в каталог</Link>
          <span className="contact-card-note">Это не оплата и не автобронь — черновик заявки для согласования.</span>
        </div>
      </div>
    </section>
  );
}
