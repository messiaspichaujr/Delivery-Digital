import React from 'react';
import { Link } from 'react-scroll'; // Para os links de navegação
import { FiPhone, FiInstagram, FiMail, FiLinkedin } from 'react-icons/fi';
import '../css/Footer.css';

const MAPS_URL = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d3577.5968099209167!2d-48.874821!3d-26.274746!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94deaff3899f4367%3A0x7d6116ec32343ddf!2sR.%20Cmte.%20Paulo%20Serra%2C%2091%20-%20Costa%20e%20Silva%2C%20Joinville%20-%20SC%2C%2089218-660%2C%20Brasil!5e0!3m2!1spt-BR!2sus!4v1762290675157!5m2!1spt-BR!2sus";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contato" className="footer-container">
      <div className="footer-fire-border"></div>
      
      <div className="container">
        <div className="footer-main-grid">
          <div className="footer-col">
            <Link 
              to="home" 
              smooth={true} 
              offset={-70} 
              duration={500} 
              className="footer-logo font-display"
            >
              Espetinho do Alemão
            </Link>
            <p className="footer-tagline">
              O melhor da região, direto na sua casa. Qualidade e sabor que você já conhece.
            </p>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title font-display">Navegação</h3>
            <ul className="footer-nav-links">
              <li><Link to="home" smooth={true} offset={-70} duration={500}>Home</Link></li>
              <li><Link to="sobre" smooth={true} offset={-70} duration={500}>Sobre Nós</Link></li>
              <li><Link to="avaliacoes" smooth={true} offset={-70} duration={500}>Avaliações</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title font-display">Fale Conosco</h3>
            <ul className="footer-contact-list">
              <li>
                <FiPhone />
                <a href="tel:+5547996879248">(47) 99687-9248</a>
              </li>
              <li>
                <FiInstagram />
                <a href="https://www.instagram.com/espetinho_alemao" target="_blank" rel="noopener noreferrer">
                  espetinho_alemao
                </a>
              </li>
              <li>
                <FiMail />
                <a href="mailto:messiaspichau15@gmail.com">messiaspichau15@gmail.com</a>
              </li>
            </ul>
          </div>

          <div className="footer-col">
            <h3 className="footer-col-title font-display">Nossa Localização</h3>
            <div className="map-wrapper">
              <iframe
                src={MAPS_URL}
                title="Localização Espetinho do Alemão"
                className="map-iframe"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

        </div>
        <hr className="footer-divider" />
        <div className="footer-bottom-bar">
          <p className="footer-copyright">
            © {currentYear} Espetinho do Alemão. Todos os direitos reservados.
          </p>
          <div className="footer-credit">
            <a href="https://www.linkedin.com/in/messiaspichaujr/" target="_blank" rel="noopener noreferrer">
              Desenvolvido por Messias Pichau
              <FiLinkedin />
            </a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};