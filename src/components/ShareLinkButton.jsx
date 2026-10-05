import { useState } from 'react';
import { IconLink, IconCheck } from './icons';
import { placeUrl } from '../utils/slug';

export default function ShareLinkButton({ id, label = false, className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleClick = async (e) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(placeUrl(id));
    } catch {
      // буфер обмена недоступен — пропускаем
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const baseClass = label ? 'listing-share' : 'share-btn';

  return (
    <button
      type="button"
      className={`${baseClass} ${copied ? 'copied' : ''} ${className}`}
      onClick={handleClick}
      title="Скопировать ссылку на это место"
    >
      {copied ? <IconCheck size={13} /> : <IconLink size={13} />}
      {label && <span>{copied ? 'Скопировано' : 'Ссылка'}</span>}
    </button>
  );
}
