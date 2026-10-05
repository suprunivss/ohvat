export function priceForLift(format) {
  if (/а3/i.test(format)) {
    return { amount: 5000, text: '5 000 ₽/мес / место', muted: false };
  }
  return { amount: null, text: 'цена по запросу', muted: true };
}

export function priceForHall(format) {
  if (/а0/i.test(format)) {
    return { amount: 10000, extra: 1000, text: '10 000 ₽/мес + 1 000 ₽ печать', muted: false };
  }
  return { amount: null, text: 'цена по запросу', muted: true };
}

export function parseAmount(priceStr) {
  const digits = (priceStr || '').replace(/\D/g, '');
  return digits ? parseInt(digits, 10) : null;
}

export function formatRub(amount) {
  return amount.toLocaleString('ru-RU') + ' ₽';
}

// Справочная "вилка" для ВУЗов — точная цена зависит от конкретной позиции
// и подтверждается у партнёра, но для карточки нужен ориентир.
export const UNIVERSITY_PRICE_FROM = 7000;

export function bcHeadlineAmount(item) {
  const amounts = [];
  if (item.lift) {
    const p = priceForLift(item.lift.format);
    if (p.amount) amounts.push(p.amount);
  }
  if (item.hall) {
    const p = priceForHall(item.hall.format);
    if (p.amount) amounts.push(p.amount);
  }
  return amounts.length ? Math.min(...amounts) : null;
}

export function minTariffAmount(tariffs) {
  const amounts = tariffs.map(([, priceStr]) => parseAmount(priceStr)).filter(Boolean);
  return amounts.length ? Math.min(...amounts) : null;
}

export function headlineText(amount) {
  return amount ? `от ${formatRub(amount)}/мес` : 'цена по запросу';
}
