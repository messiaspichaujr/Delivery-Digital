import React from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext'; 
import { LogoModel } from '../components/LogoModel';
import { FireBackground } from '../components/FireBackground';
import '../css/Hero.css';

export const Hero = () => {
  const { dispatch } = useCart();
  const openCartModal = () => dispatch({ type: 'TOGGLE_CART' });

  return (
    <section id="home" className="hero-section">
    
      <div className="hero-background-layer">
        <FireBackground />
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
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <LogoModel /> 
        </motion.div>
      </div>

    </section>
  );
};