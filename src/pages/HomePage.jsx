import Hero from '../components/Hero';
import Benefits from '../components/Benefits';
import HowItWorks from '../components/HowItWorks';
import ContactCta from '../components/ContactCta';
import { computeStats } from '../utils/stats';
import { useCart } from '../context/CartContext';

export default function HomePage() {
  const stats = computeStats();
  const { openPanel } = useCart();

  return (
    <>
      <Hero stats={stats} />
      <Benefits />
      <HowItWorks />
      <ContactCta onOpenCart={openPanel} />
    </>
  );
}
