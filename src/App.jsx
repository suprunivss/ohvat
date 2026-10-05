import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToHash from './components/ScrollToHash';
import Footer from './components/Footer';
import CartFab from './components/CartFab';
import CartPanel from './components/CartPanel';
import CheckoutModal from './components/CheckoutModal';
import { CartProvider, useCart } from './context/CartContext';

function CartWidgets() {
  const {
    cart, removeItem, clearCart, panelOpen, openPanel, closePanel,
    modalOpen, openModal, closeModal, name, setName, contact, setContact,
  } = useCart();

  return (
    <>
      <CartFab count={cart.length} onClick={openPanel} />
      <CartPanel open={panelOpen} cart={cart} onClose={closePanel} onRemove={removeItem} onClear={clearCart} onCheckout={openModal} />
      <CheckoutModal
        open={modalOpen}
        cart={cart}
        name={name}
        contact={contact}
        onNameChange={setName}
        onContactChange={setContact}
        onClose={closeModal}
      />
    </>
  );
}

function App() {
  return (
    <CartProvider>
      <ScrollToHash />
      <Navbar />
      <Outlet />
      <Footer />
      <CartWidgets />
    </CartProvider>
  );
}

export default App;
