import React, { Suspense } from 'react'; // 1. Manter Suspense e lazy
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext'; 
import '../css/Hero.css';
import logoEspetinho from '../assets/LogoEspetinho.png';
const FireBackground = React.lazy(() => 
  import('../components/FireBackground').then(module => ({ default: module.FireBackground }))
);

export const Hero = () => {
  const { dispatch } = useCart();
  const openCartModal = () => dispatch({ type: 'TOGGLE_CART' });

  return (
    <section id="home" className="hero-section">

      <div className="hero-background-layer">
        <Suspense fallback={null}> 
          <FireBackground />
        </Suspense>
      </div>

      <div className="hero-foreground-layer container">

        <motion.div 
          className="hero-content"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="hero-tag font-display">#PEÇAJÁ</span>
          <h1 className="hero-title">Faça Seu Pedido Online</h1>
          <p className="hero-subtitle">
            Veja nosso Cardápio online, faça o pedido e receba 
            em Casa ou retire no balcão!
          </p>
          <div className="hero-ctas">
            <button onClick={openCartModal} className="btn-primary">
              Fazer Pedido Agora!
            </button>
          </div>
        </motion.div>

        <motion.div 
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >

          <img 
            src={logoEspetinho} 
            alt="Logo Espetinho do Alemão" 
            className="hero-logo-image" 
          />
        </motion.div>
      </div>

    </section>
  );
};