import { priceForLift, priceForHall, parseAmount } from './pricing';
import { transport } from '../data/catalogData';

export function liftCartItem(item) {
  const info = priceForLift(item.lift.format);
  return {
    id: 'bc-lift-' + item.address,
    cat: 'bc',
    title: item.name + ' · лифт',
    sub: item.lift.format,
    amount: info.amount,
    priceText: info.text,
  };
}

export function hallCartItem(item) {
  const info = priceForHall(item.hall.format);
  return {
    id: 'bc-hall-' + item.address,
    cat: 'bc',
    title: item.name + ' · холл',
    sub: item.hall.format + (info.extra ? ' + печать ' + info.extra + ' ₽' : ''),
    amount: info.amount,
    priceText: info.text,
  };
}

export function tariffCartItem(city, dur, priceStr) {
  return {
    id: 'av-' + city + '-' + dur,
    cat: 'av',
    title: 'Автовокзал ' + city,
    sub: 'ролик ' + dur,
    amount: parseAmount(priceStr),
    priceText: priceStr,
  };
}

export function universityCartItem(v) {
  return {
    id: 'vuz-' + v.abbr,
    cat: 'vuz',
    title: v.name + ' (' + v.abbr + ')',
    sub: v.total + ' позиций · цена по запросу',
    amount: null,
    priceText: 'цена по запросу',
  };
}

export function routeCartItem(route) {
  const priceStr = transport.prices[route.type] || '';
  return {
    id: 'tr-' + route.num + '-' + route.type,
    cat: 'tr',
    title: 'Подголовник · маршрут ' + route.num + ' (' + route.type + ')',
    sub: route.route,
    amount: parseAmount(priceStr),
    priceText: priceStr || 'цена по запросу',
  };
}
