import React, { useState } from 'react';
import { Link } from 'react-scroll';
import { useCart } from '../context/CartContext';
import { FiMenu, FiX } from 'react-icons/fi'; 
import { motion, AnimatePresence } from 'framer-motion'; 
import '../css/Navbar.css';

export const Navbar = () => {
  const { dispatch } = useCart();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const openCartModal = () => {
    setIsMobileMenuOpen(false); 
    dispatch({ type: 'TOGGLE_CART' });
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="header" style={{ position: 'relative' }}>
      <nav className="navbar container">
        
        <Link 
          to="home" 
          className="nav-logo font-display"
          spy={true} smooth={true} offset={-70} duration={500}
          onClick={closeMobileMenu}
        >
          Espetinho do Alemão
        </Link>

        <ul className="nav-menu">
          <li><Link to="home" activeClass="active" spy={true} smooth={true} offset={-70} duration={500}>Home</Link></li>
          <li><Link to="sobre" activeClass="active" spy={true} smooth={true} offset={-70} duration={500}>Sobre</Link></li>
          <li><Link to="avaliacoes" activeClass="active" spy={true} smooth={true} offset={-70} duration={500}>Avaliações</Link></li>
          <li><Link to="contato" activeClass="active" spy={true} smooth={true} offset={-70} duration={500}>Contato</Link></li>
        </ul>

        <button className="nav-button btn-primary" onClick={openCartModal}>
          Cardápio
        </button>

        <button className="nav-toggle" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.ul 
            className="nav-menu-mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
          >
            <li><Link to="home" onClick={closeMobileMenu} activeClass="active" spy={true} smooth={true} offset={-70} duration={500}>Home</Link></li>
            <li><Link to="sobre" onClick={closeMobileMenu} activeClass="active" spy={true} smooth={true} offset={-70} duration={500}>Sobre</Link></li>
            <li><Link to="avaliacoes" onClick={closeMobileMenu} activeClass="active" spy={true} smooth={true} offset={-70} duration={500}>Avaliações</Link></li>
            <li><Link to="contato" onClick={closeMobileMenu} activeClass="active" spy={true} smooth={true} offset={-70} duration={500}>Contato</Link></li>
            <li>
              <button className="nav-button-mobile btn-primary" onClick={openCartModal}>
                Ver Cardápio
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};