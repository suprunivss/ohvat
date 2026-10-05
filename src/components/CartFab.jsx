import { useEffect, useRef, useState } from 'react';

export default function CartFab({ count, onClick }) {
  const [bump, setBump] = useState(false);
  const prevCount = useRef(count);

  useEffect(() => {
    if (count > prevCount.current) {
      setBump(true);
      const timer = setTimeout(() => setBump(false), 300);
      prevCount.current = count;
      return () => clearTimeout(timer);
    }
    prevCount.current = count;
  }, [count]);

  return (
    <button type="button" className="cart-fab" onClick={onClick}>
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="9" cy="21" r="1"></circle>
        <circle cx="20" cy="21" r="1"></circle>
        <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
      </svg>
      Заявка
      <span className={`cart-badge ${bump ? 'bump' : ''}`}>{count}</span>
    </button>
  );
}
