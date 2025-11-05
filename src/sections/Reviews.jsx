import React from 'react';
import { motion } from 'framer-motion';
import { FiStar } from 'react-icons/fi'; 
import '../css/Review.css';

const reviewsData = [
  {
    name: 'Pablo Romualdo',
    quote: 'Minha namorada agora sempre viemos ou levamos pra comer em casa, lanche top e diferenciado, sensação diferente com muito sabor.',
    stars: 5,
  },
  {
    name: 'Kelly Silva',
    quote: 'O Espetinho do Alemão é o melhor lanche de Joinville na minha opinião, venho do RS e lá nós temos o "Xis" que para quem...',
    stars: 5,
  },
  {
    name: 'Alice C. Fernandes',
    quote: 'Super recomendo, atendimento nota dez, hambúrguer maravilhosos e os espetinhos também.',
    stars: 5,
  },
  {
    name: 'D. Felizardo',
    quote: 'Se comer a maionese caseira já era. Não vai mais em nenhum outro lugar.',
    stars: 5,
  },
  {
    name: 'BoniFish',
    quote: 'Melhor hambúrguer de Joinville disparado. Vou em vários lugares que vende hambúrguer mas sempre volto aqui pq sinto falta do sabor...',
    stars: 5,
  },
  {
    name: 'Lucas Santos',
    quote: 'A comida é ótima, o hambúrguer gourmet deles é melhor, e por um preço justo. Recomendo muito, além dos donos serem muito gente boa.',
    stars: 5,
  }
];

const StarRating = ({ count }) => {
  return (
    <div className="review-card-header">
      {Array.from({ length: count }, (v, i) => (
        <FiStar key={i} fill="#EAAA49" /> 
      ))}
    </div>
  );
};

export const Reviews = () => {
  return (
    <section id="avaliacoes" className="reviews-section">
      <div className="container">

        <motion.div 
          className="reviews-header"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="font-display">
            O que nossos <span className="color-accent">Clientes Dizem</span>
          </h2>
          <p>
            Confira as avaliações reais de quem já provou e aprovou
            o Espetinho do Alemão no Google.
          </p>
        </motion.div>

        <motion.div 
          className="reviews-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }} 
        >
          {reviewsData.map((review, index) => (
            <motion.div
              key={index}
              className="review-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }} 
            >
              <div className="review-card-header">
                <StarRating count={review.stars} />
              </div>
              <p className="review-card-body">
                "{review.quote}"
              </p>
              <footer className="review-card-footer">
                - {review.name}
              </footer>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};