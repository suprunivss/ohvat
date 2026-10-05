import { Link, NavLink } from 'react-router-dom';
import Logo from './Logo';
import { useCart } from '../context/CartContext';

const LINKS = [
  { to: '/#benefits', label: 'Преимущества' },
  { to: '/#how', label: 'Как это работает' },
  { to: '/catalog', label: 'Каталог', exact: true },
  { to: '/calculator', label: 'Калькулятор', exact: true },
  { to: '/#contacts', label: 'Контакты' },
];

export default function Navbar() {
  const { openPanel } = useCart();

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" style={{ display: 'flex' }}>
          <Logo />
        </Link>
        <div className="nav-links">
          {LINKS.map((link) =>
            link.exact ? (
              <NavLink key={link.to} to={link.to} className={({ isActive }) => (isActive ? 'active' : '')}>
                {link.label}
              </NavLink>
            ) : (
              <Link key={link.to} to={link.to}>{link.label}</Link>
            )
          )}
        </div>
        <div className="nav-right">
          <button type="button" className="btn-lg primary" onClick={openPanel}>Оставить заявку</button>
        </div>
      </div>
    </nav>
  );
}
