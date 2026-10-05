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
