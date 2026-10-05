import bcLift1 from '../assets/examples/bc-lift-1.jpg';
import bcLift2 from '../assets/examples/bc-lift-2.jpg';
import bcHall1 from '../assets/examples/bc-hall-1.jpg';
import avVoronezh1 from '../assets/examples/av-voronezh-1.jpg';
import avVoronezh2 from '../assets/examples/av-voronezh-2.jpg';

// Реальные фото от партнёра, но без привязки к конкретному объекту —
// это примеры того, как выглядит размещение данного типа/формата.
export const EXAMPLE_PHOTOS = {
  bcLift: [
    { src: bcLift1, caption: 'Пример: реклама в лифте (рамка)' },
    { src: bcLift2, caption: 'Пример: реклама в лифте (рамка)' },
  ],
  bcHall: [
    { src: bcHall1, caption: 'Пример: реклама в холле (лайтбокс/стенд)' },
  ],
  avVoronezh: [
    { src: avVoronezh1, caption: 'Автовокзал Воронеж — медиаэкран в зале' },
    { src: avVoronezh2, caption: 'Автовокзал Воронеж — медиаэкран в зале' },
  ],
};

export function photosForPlace(category, item) {
  if (category === 'bc') {
    const photos = [];
    if (item?.lift) photos.push(...EXAMPLE_PHOTOS.bcLift);
    if (item?.hall) photos.push(...EXAMPLE_PHOTOS.bcHall);
    return photos;
  }
  if (category === 'av') {
    if (item?.city === 'Воронеж') return EXAMPLE_PHOTOS.avVoronezh;
    return EXAMPLE_PHOTOS.bcHall.map((p) => ({ ...p, caption: 'Пример медиаэкрана на автовокзале (фото другого города)' }));
  }
  if (category === 'vuz') {
    return EXAMPLE_PHOTOS.bcHall.map((p) => ({ ...p, caption: 'Пример размещения в холле учебного заведения' }));
  }
  return [];
}

export function coverPhoto(category, item) {
  const photos = photosForPlace(category, item);
  return photos[0] || null;
}
