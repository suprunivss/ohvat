import { formatRub } from './pricing';

export function buildRequestText(cart, name, contact) {
  const lines = [];
  lines.push('Заявка на размещение рекламы — Охват');
  lines.push('От: ' + (name.trim() || '—') + (contact.trim() ? ' · ' + contact.trim() : ''));
  lines.push('');
  lines.push('Позиции:');
  cart.forEach((item, i) => {
    lines.push((i + 1) + '. ' + item.title + ' — ' + item.sub);
    lines.push('   ' + (item.priceText || (item.amount ? formatRub(item.amount) : 'цена по запросу')));
  });
  const known = cart.filter((c) => c.amount).reduce((s, c) => s + c.amount, 0);
  lines.push('');
  lines.push('Сумма по позициям с известной ценой: ' + formatRub(known));
  const unknownCount = cart.filter((c) => !c.amount).length;
  if (unknownCount) lines.push(`(${unknownCount} поз. — цена уточняется отдельно)`);
  return lines.join('\n');
}
