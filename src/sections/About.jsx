import React from 'react';
import { motion } from 'framer-motion';
import '../css/About.css';
import sobreNos from "../assets/sobre-foto.jpg"

export const About = () => {
  return (
    <section id="sobre" className="about-section">
      <div className="container about-container">
        
        <motion.div 
          className="about-content"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display">
            Quem <span className="color-accent">Somos</span>
          </h2>
          <p>
            O espetinho do alemão chegou em Joinville no ano de 2017 para apreciar os clientes com a comida, educação e satisfação. Antes de nos mudarmos moravamos em Foz do Iguaçu, Terra das cataratas do iguaçu e da Itaipu.
          </p>
          <p>
            O Food Truck Espetinho do Alemão é uma referência gastronômica na Região Norte Catarinense. Muito conhecido pela qualidade e variedade de Espetinhos (todos assados na hora) e pelos Lanches de carne assada, o Food truck possui um cardápio bem diversificado que atende todos os gostos.
          </p>
        </motion.div>

        <motion.div 
          className="about-image-wrapper"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <img 
            src={sobreNos} 
            alt="O Food Truck Espetinho do Alemão" 
            className="about-image"
            onError={(e) => { e.currentTarget.src = 'https://via.placeholder.com/600x400/222/FFF?text=Foto+Quem+Somos'; }}
          />
        </motion.div>

      </div>
    </section>
  );
};