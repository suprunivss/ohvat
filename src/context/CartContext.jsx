import { createContext, useCallback, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'ad-catalog-cart-v1';

function loadCart() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(loadCart);
  const [panelOpen, setPanelOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [contact, setContact] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {
      // localStorage недоступен (приватный режим и т.п.) — пропускаем сохранение
    }
  }, [cart]);

  const isInCart = useCallback((id) => cart.some((item) => item.id === id), [cart]);

  const toggleItem = useCallback((item) => {
    setCart((prev) => {
      if (prev.some((c) => c.id === item.id)) {
        return prev.filter((c) => c.id !== item.id);
      }
      return [...prev, item];
    });
  }, []);

  const removeItem = useCallback((id) => {
    setCart((prev) => prev.filter((c) => c.id !== id));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const openPanel = useCallback(() => setPanelOpen(true), []);
  const closePanel = useCallback(() => setPanelOpen(false), []);
  const openModal = useCallback(() => setModalOpen(true), []);
  const closeModal = useCallback(() => setModalOpen(false), []);

  const value = {
    cart, isInCart, toggleItem, removeItem, clearCart,
    panelOpen, openPanel, closePanel,
    modalOpen, openModal, closeModal,
    name, setName, contact, setContact,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
