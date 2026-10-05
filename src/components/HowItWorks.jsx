const STEPS = [
  { num: '01', title: 'Выбираете места', text: 'Фильтруйте каталог по категориям или ищите по названию и адресу. На каждой позиции сразу видна цена.' },
  { num: '02', title: 'Собираете заявку', text: 'Нажимаете «+» на нужных позициях — они добавляются в заявку, сумма по известным ценам считается автоматически.' },
  { num: '03', title: 'Отправляете нам', text: 'Одним кликом получаете готовый текст заявки и отправляете его удобным способом — мы согласуем размещение с партнёрами.' },
];

export default function HowItWorks() {
  return (
    <section id="how" className="how">
      <div className="how-inner">
        <div className="section-kicker">Процесс</div>
        <h2 className="section-title-lg">Как это работает</h2>
        <p className="section-sub">Без звонков и долгих согласований на старте — только то, что нужно для первой заявки.</p>
        <div className="how-steps">
          {STEPS.map((step) => (
            <div key={step.num} className="how-step">
              <div className="how-step-num">{step.num}</div>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
