import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { FiX, FiCheckCircle } from 'react-icons/fi';
import '../../css/AddonModal.css';

const formatPrice = (price) => price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });

export const AddonModal = ({ product, onClose }) => {
  const { dispatch } = useCart();
  const [selectedAddons, setSelectedAddons] = useState([]);

  const handleAddonToggle = (addon) => {
    setSelectedAddons((prev) => {
      const isSelected = prev.find(a => a.id === addon.id);
      if (isSelected) {
        return prev.filter(a => a.id !== addon.id);
      } else {
        return [...prev, addon];
      }
    });
  };

  const basePrice = product.price;
  const addonsPrice = selectedAddons.reduce((total, addon) => total + addon.price, 0);
  const totalItemPrice = basePrice + addonsPrice;

  const handleConfirm = () => {
    const sortedAddonIds = selectedAddons.map(a => a.id).sort().join('_');
    const uniqueCartItemId = sortedAddonIds ? `${product.id}_${sortedAddonIds}` : `${product.id}`;

    const cartItem = {
      id: product.id,
      name: product.name,
      description: product.description, 
      cartItemId: uniqueCartItemId,
      price: basePrice, 
      addons: selectedAddons,
      totalItemPrice: totalItemPrice
    };
    
    dispatch({ type: 'ADD_ITEM', payload: cartItem });
    onClose();
  };

  const modalVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: { scale: 1, opacity: 1 },
    exit: { scale: 0.9, opacity: 0 }
  };

  return (
    <motion.div 
      className="addon-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="addon-modal-container"
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        transition={{ type: 'spring', stiffness: 300, damping: 25 }}
      >
        <div className="addon-modal-header">
          <div>
            <h3 className="font-display">Adicionais</h3>
            <p>{product.name}</p>
          </div>
          <button onClick={onClose} className="modal-close-btn"><FiX /></button>
        </div>
        
        <div className="addon-modal-body">
          {product.addons.map(categoryGroup => (
            <div key={categoryGroup.category} className="addon-category">
              <h5 className="addon-category-title font-display">{categoryGroup.category}</h5>
              
              {categoryGroup.items.map(addon => (
                <label key={addon.id} className="addon-item">
                  <div className="addon-info">
                    <h4>{addon.name}</h4>
                    <p>+ {formatPrice(addon.price)}</p>
                  </div>
                  <input 
                    type="checkbox" 
                    className="addon-checkbox"
                    onChange={() => handleAddonToggle(addon)} 
                  />
                </label>
              ))}
              
            </div>
          ))}
        </div>
        
        <div className="addon-modal-footer">
          <button className="btn-primary" onClick={handleConfirm}>
            <FiCheckCircle />
            Adicionar (Total: {formatPrice(totalItemPrice)})
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};