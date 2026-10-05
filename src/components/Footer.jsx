import { Link } from 'react-router-dom';
import Logo from './Logo';

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <Logo />
          <div className="footer-links">
            <Link to="/#benefits">Преимущества</Link>
            <Link to="/#how">Как это работает</Link>
            <Link to="/catalog">Каталог</Link>
            <Link to="/#contacts">Контакты</Link>
          </div>
        </div>
        <div className="copyright">© {CURRENT_YEAR} Охват — рекламные места по всей России</div>
      </div>
    </footer>
  );
}
