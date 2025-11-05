import React, { useEffect } from 'react';
import { useCart } from './context/CartContext';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Hero } from './sections/Hero';
import { About } from './sections/About';
import { Reviews } from './sections/Reviews';
import { CartModal } from './components/CartModal/CartModal'; 

function App() {
  const { state } = useCart();
  const { isCartOpen } = state; 

  useEffect(() => {
    if (isCartOpen) {
      document.body.setAttribute('data-modal-open', 'true');
    } else {
      document.body.removeAttribute('data-modal-open');
    }

    return () => {
      document.body.removeAttribute('data-modal-open');
    };
  }, [isCartOpen]); 

  return (
    <div className="app">
      <Navbar />
      <CartModal />
      
      <main>
        <Hero />
        <About />
        <Reviews />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;