const ICONS = {
  list: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M9 6h11M9 12h11M9 18h11" />
      <path d="M4 6h.01M4 12h.01M4 18h.01" />
    </svg>
  ),
  tag: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M20.59 13.41 11 3.83A2 2 0 0 0 9.59 3.2L3.2 3.2a1 1 0 0 0-1 1l.01 6.4a2 2 0 0 0 .58 1.4l9.6 9.6a2 2 0 0 0 2.83 0l5.37-5.37a2 2 0 0 0 0-2.82Z" />
      <circle cx="7.5" cy="7.5" r="1.3" fill="currentColor" stroke="none" />
    </svg>
  ),
  pin: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  ),
  bolt: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="22" height="22">
      <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
    </svg>
  ),
};

const ITEMS = [
  { icon: 'list', title: 'Единая заявка на всё', text: 'Собираете лифты в БЦ, экраны на автовокзалах, места в вузах и транспорт в одну заявку — не нужно писать в десяток разных мест.' },
  { icon: 'tag', title: 'Прозрачные цены', text: 'У каждой позиции сразу видна цена или честная пометка «по запросу» — никаких скрытых условий до звонка менеджеру.' },
  { icon: 'pin', title: 'Растущая география', text: 'Начинаем с Воронежа и области — 21 бизнес-центр, 5 автовокзалов, 18 вузов и 20 маршрутов транспорта. Дальше добавляем новые города и регионы.' },
  { icon: 'bolt', title: 'Быстрый старт', text: 'От выбора места до готового текста заявки — пара минут. Отправьте его в Telegram, WhatsApp или на почту тем, кто удобен.' },
];

export default function Benefits() {
  return (
    <section id="benefits" className="benefits">
      <div className="section-kicker">Почему «Охват»</div>
      <h2 className="section-title-lg">Удобнее, чем согласовывать с каждой площадкой отдельно</h2>
      <p className="section-sub">
        Мы собираем рекламные места по городам России в один каталог, чтобы вы тратили время на кампанию,
        а не на переписку с десятком партнёров.
      </p>
      <div className="benefits-grid">
        {ITEMS.map((item) => (
          <div key={item.title} className="benefit-card">
            <div className="benefit-icon">{ICONS[item.icon]}</div>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
