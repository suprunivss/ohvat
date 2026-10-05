const TRANSLIT = {
  а: 'a', б: 'b', в: 'v', г: 'g', д: 'd', е: 'e', ё: 'e', ж: 'zh', з: 'z', и: 'i',
  й: 'y', к: 'k', л: 'l', м: 'm', н: 'n', о: 'o', п: 'p', р: 'r', с: 's', т: 't',
  у: 'u', ф: 'f', х: 'h', ц: 'ts', ч: 'ch', ш: 'sh', щ: 'sch', ъ: '', ы: 'y',
  ь: '', э: 'e', ю: 'yu', я: 'ya',
};

export function slugify(input) {
  return (input || '')
    .toString()
    .toLowerCase()
    .split('')
    .map((ch) => (ch in TRANSLIT ? TRANSLIT[ch] : ch))
    .join('')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function placeId(category, ...parts) {
  const slug = parts.map(slugify).filter(Boolean).join('-');
  return `${category}-${slug}`;
}

export function placePath(id) {
  return `/catalog/place/${id}`;
}

export function placeUrl(id) {
  // import.meta.env.BASE_URL includes the GitHub Pages project subpath
  // (e.g. "/ohvat/") — without it, copied links 404 on project pages.
  const base = import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${window.location.origin}${base}${placePath(id)}`;
}
