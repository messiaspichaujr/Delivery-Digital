import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { FiX, FiShoppingCart, FiPlus, FiMinus, FiLoader, FiSend } from 'react-icons/fi';
import { AddonModal } from './AddonModal';
import capaCardapio from '../../assets/capa-cardapio.jpg'
import '../../css/CartModal.css';

const WHATSAPP_NUMBER = '5547996879248';

const categorizedAddons = [
  { category: 'Hambúrguer (ADICIONAL)', items: [ { id: 101, name: 'Industrializado', price: 5.00 }, { id: 102, name: 'Gourmet', price: 12.00 } ] },
  { category: 'Espetinhos (ADICIONAL)', items: [ { id: 103, name: 'Pão de alho', price: 6.00 }, { id: 104, name: 'Frango', price: 8.00 }, { id: 105, name: 'Porco', price: 8.00 }, { id: 106, name: 'Coração', price: 9.00 }, { id: 107, name: 'Queijo Coalho', price: 9.00 }, { id: 108, name: 'Carne Alcatra', price: 9.00 }, { id: 109, name: 'Linguiça', price: 9.00 }, { id: 110, name: 'Medalhão de Frango', price: 13.00 }, { id: 111, name: 'Medalhão de Alcatra', price: 13.00 } ] },
  { category: 'Demais (ADICIONAL)', items: [ { id: 112, name: 'Bacon', price: 4.00 }, { id: 113, name: 'Ovo', price: 3.00 }, { id: 114, name: 'Cebola', price: 3.00 } ] }
];

const products = {
  espetinhos: [
    { id: 1, name: 'Pão de Alho', price: 6.00, totalItemPrice: 6.00 },
    { id: 2, name: 'Frango', price: 8.00, totalItemPrice: 8.00 },
    { id: 3, name: 'Porco', price: 8.00, totalItemPrice: 8.00 },
    { id: 4, name: 'Coração', price: 9.00, totalItemPrice: 9.00 },
    { id: 5, name: 'Queijo Coalho', price: 9.00, totalItemPrice: 9.00 },
    { id: 6, name: 'Carne Alcatra', price: 9.00, totalItemPrice: 9.00 },
    { id: 7, name: 'Linguiça', price: 9.00, totalItemPrice: 9.00 },
    { id: 8, name: 'Medalhão de Frango', description: '(Frango com bacon)', price: 13.00, totalItemPrice: 13.00 },
    { id: 9, name: 'Medalhão de Carne Alcatra', description: '(Carne com bacon)', price: 13.00, totalItemPrice: 13.00 },
  ],
  lanches: [
    { id: 10, name: 'Gourmet do Alemão', description: '(pão,hambúrguer gourmet,bacon,tomate,alface,queijo cheddar e maionese caseira)', price: 25.00, addons: categorizedAddons },
    { id: 11, name: 'Gourmet Duplo do Alemão', description: '(pão,2 hambúrguer gourmet,bacon,tomate,alface,queijo cheddar e maionese caseira)', price: 35.00, addons: categorizedAddons },
    { id: 12, name: 'Gourmet Triplo do Alemão', description: '(pão,3 hambúrguer gourmet,bacon,tomate,alface,queijo cheddar e maionese caseira)', price: 45.00, addons: categorizedAddons },
    { id: 13, name: 'Gourmet Especial', description: '(pão,hambúrguer gourmet,bacon,cebola crispy,molho barbecue,queijo cheddar e maionese caseira)', price: 27.00, addons: categorizedAddons },
    { id: 14, name: 'Gourmet Especial Duplo', description: '(pão,2 hambúrguer gourmet,bacon,cebola crispy,molho barbecue,queijo cheddar e maionese caseira)', price: 37.00, addons: categorizedAddons },
    { id: 15, name: 'Gourmet Especial Triplo', description: '(pão,3 hambúrguer gourmet,bacon,cebola crispy,molho barbecue,queijo cheddar e maionese caseira)', price: 47.00, addons: categorizedAddons },
    { id: 16, name: 'X-Bacon', description: '(pão,hambúrguer,bacon,queijo mussarela,presunto,tomate,alface,milho,batata palha,maionese caseira)', price: 25.00, addons: categorizedAddons },
    { id: 17, name: 'X Calabresa', description: '(pão,hambúrguer,calabresa,queijo mussarela,presunto,tomate,alface,milho,batata palha,maionese caseira)', price: 25.00, addons: categorizedAddons },
    { id: 18, name: 'Lanche de Churrasco de Frango', description: '(pão ,frango,bacon,queijo,cebola,tomate,alface e maionese caseira)', price: 20.00, addons: categorizedAddons },
    { id: 19, name: 'Lanche de Churrasco de Porco', description: '(pão ,porco,bacon,queijo,cebola,tomate,alface e maionese caseira)', price: 20.00, addons: categorizedAddons },
    { id: 20, name: 'Lanche de Churrasco de Coração', description: '(pão ,coração,bacon,queijo,cebola,tomate,alface e maionese caseira)', price: 20.00, addons: categorizedAddons },
    { id: 21, name: 'Lanche de Churrasco de Carne Alcatra', description: '(pão ,alcatra,bacon,queijo,cebola,tomate,alface e maionese caseira)', price: 25.00, addons: categorizedAddons },
    { id: 22, name: 'Lanche de Churrasco de Linguiça', description: '(pão ,linguiça,bacon,queijo,cebola,tomate,alface e maionese caseira)', price: 25.00, addons: categorizedAddons },
  ],
  bebidas: [
    { id: 23, name: 'Guaraná Antarctica 2 L', price: 16.00, totalItemPrice: 16.00 },
    { id: 24, name: 'Guaraná Antarctica 600ml', price: 9.00, totalItemPrice: 9.00 },
    { id: 25, name: 'Guaraná Antarctica lata', price: 7.00, totalItemPrice: 7.00 },
    { id: 26, name: 'Coca-cola sem açucar 2 L', price: 15.00, totalItemPrice: 15.00 },
    { id: 27, name: 'Coca-cola 2 L', price: 15.00, totalItemPrice: 15.00 },
    { id: 28, name: 'Coca-cola sem açucar 600ml', price: 9.00, totalItemPrice: 9.00 },
    { id: 29, name: 'Coca-cola 600ml', price: 9.00, totalItemPrice: 9.00 },
    { id: 30, name: 'Coca-cola lata sem açúcar', price: 7.00, totalItemPrice: 7.00 },
    { id: 31, name: 'Coca-cola Lata', price: 7.00, totalItemPrice: 7.00 },
    { id: 32, name: 'Água sem gás', price: 4.00, totalItemPrice: 4.00 },
    { id: 33, name: 'Água com gás', price: 4.00, totalItemPrice: 4.00 },
  ]
};

export const CartModal = () => {
  const { state, dispatch, subtotal, finalTotalPrice } = useCart();
  const { isCartOpen, cartItems, customerInfo, deliveryMethod, deliveryFee, feeError } = state;

  const [isLoadingFee, setIsLoadingFee] = useState(false);
  const [productToCustomize, setProductToCustomize] = useState(null);

  const formatPrice = (price) => price.toLocaleString('pt-br', { style: 'currency', currency: 'BRL' });
  
  const getSimpleItemQuantity = (id) => {
    const item = cartItems.find(item => item.id === id && !item.cartItemId);
    return item ? item.quantity : 0;
  };
  
  const closeCart = () => dispatch({ type: 'CLOSE_CART' });
  
  const addItem = (product) => {
    if (product.addons) {
      setProductToCustomize(product);
    } else {
      dispatch({ type: 'ADD_ITEM', payload: product });
    }
  };
  
  const removeItem = (product) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product });
  };

  const handleFieldChange = (field, value) => dispatch({ type: 'SET_FORM_FIELD', payload: { field, value } });
  const handleDeliveryMethodChange = (method) => dispatch({ type: 'SET_DELIVERY_METHOD', payload: method });

  const handleCalculateFee = async () => {
    if (customerInfo.cep.length < 8) return;
    setIsLoadingFee(true);
    try {
      const response = await fetch('/api/calculate-fee', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cep: customerInfo.cep }), 
      });
      const data = await response.json();
      if (!response.ok) {
        dispatch({ type: 'SET_DELIVERY_ERROR', payload: data.error || 'Erro ao calcular taxa.' });
      } else {
        dispatch({ 
          type: 'SET_DELIVERY_SUCCESS', 
          payload: { 
            fee: data.fee, 
            neighborhood: data.neighborhood,
            street: data.street,
            city: data.city,
            state: data.state
          } 
        });
      }
    } catch (error) {
      dispatch({ type: 'SET_DELIVERY_ERROR', payload: 'Não foi possível conectar ao servidor.' });
    } finally {
      setIsLoadingFee(false);
    }
  };

  const handleSendToWhatsApp = () => {
    let itemsText = "*=== ITENS DO PEDIDO ===*\n";

    const espetinhos = cartItems.filter(item => products.espetinhos.find(p => p.id === item.id));
    const lanches = cartItems.filter(item => products.lanches.find(p => p.id === item.id));
    const bebidas = cartItems.filter(item => products.bebidas.find(p => p.id === item.id));

    if (espetinhos.length > 0) {
      itemsText += "\n*Espetinhos*\n";
      espetinhos.forEach(item => {
        itemsText += `- ${item.quantity}x ${item.name} (${formatPrice(item.quantity * item.totalItemPrice)})\n`;
      });
    }
    
    if (lanches.length > 0) {
      itemsText += "\n*Lanches*\n";
      lanches.forEach(item => {
        itemsText += `- ${item.quantity}x ${item.name} (${formatPrice(item.quantity * item.totalItemPrice)})\n`;
        if (item.addons && item.addons.length > 0) {
          item.addons.forEach(addon => {
            itemsText += `    ↳ Adicional: ${addon.name} (+${formatPrice(addon.price)})\n`;
          });
        }
      });
    }
    
    if (bebidas.length > 0) {
      itemsText += "\n*Bebidas*\n";
      bebidas.forEach(item => {
        itemsText += `- ${item.quantity}x ${item.name} (${formatPrice(item.quantity * item.totalItemPrice)})\n`;
      });
    }

    let deliveryText = "";
    let paymentText = "";

    if (deliveryMethod === 'retirada') {
      deliveryText = "*MÉTODO: RETIRADA NO BALCÃO* 🚶‍♂️\n";
      paymentText = "_Pagamento: No balcão (Cartão, Dinheiro ou PIX)_";
    } else {
      deliveryText = 
`*MÉTODO: ENTREGA* 🛵
*Endereço:* ${customerInfo.street}, N° ${customerInfo.number}
*Bairro:* ${customerInfo.neighborhood}
*Cidade:* ${customerInfo.city} - ${customerInfo.state}
*CEP:* ${customerInfo.cep}
----------------------------------------
*Taxa de Entrega:* ${formatPrice(deliveryFee)}\n`;
      paymentText = 
`_Pagamento via PIX (Aguardando confirmação)._
*Nossa Chave CPF: 033.326.159-39*`;
    }

    const message = `
*=== NOVO PEDIDO: ESPETINHO DO ALEMÃO ===*
*Cliente:* ${customerInfo.name}
*WhatsApp:* ${customerInfo.phone}
----------------------------------------
${deliveryText}
${itemsText}
----------------------------------------
*TOTAL DO PEDIDO: ${formatPrice(finalTotalPrice)}*
${paymentText}
    `;

    const encodedMessage = encodeURIComponent(message.trim());
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;

    window.open(url, '_blank');
    dispatch({ type: 'CLEAR_CART' });
    dispatch({ type: 'CLOSE_CART' });
  };

  const isFormValid = () => {
    if (cartItems.length === 0) return false;
    if (!customerInfo.name || !customerInfo.phone) return false;
    if (deliveryMethod === 'entrega' && (deliveryFee === 0 || feeError || !customerInfo.number)) {
      return false;
    }
    return true;
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            className="modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
          />
          
          <motion.div
            className="modal-container"
            initial={{ opacity: 0, y: '-50%', x: '-50%', top: '45%' }}
            animate={{ opacity: 1, y: '-50%', x: '-50%', top: '50%' }}
            exit={{ opacity: 0, y: '-50%', x: '-50%', top: '45%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            
            <AnimatePresence>
              {productToCustomize && (
                <AddonModal 
                  product={productToCustomize} 
                  onClose={() => setProductToCustomize(null)} 
                />
              )}
            </AnimatePresence>
            
            <div className="modal-header">
              <h2 className="font-display">Cardápio</h2>
              <button onClick={closeCart} className="modal-close-btn"><FiX /></button>
            </div>
            
            <div className="modal-body">
              <img 
                src={capaCardapio} 
                alt="Capa do Cardápio" 
                className="modal-cover-image"
                onError={(e) => { e.currentTarget.src = '/src/assets/capa-cardapio.jpg'; }}
              />

              {/* --- CARDÁPIO (ESPETINHOS) --- */}
              <div className="product-category">
                <h3 className="font-display">Espetinhos</h3>
                {products.espetinhos.map(product => (
                  <div className="product-item" key={product.id}>
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      {product.description && <p className="product-description">{product.description}</p>}
                      <p>{formatPrice(product.price)}</p>
                    </div>
                    {getSimpleItemQuantity(product.id) === 0 ? (
                      <button className="btn-add" onClick={() => addItem(product)}>Adicionar</button>
                    ) : (
                      <div className="quantity-control">
                        <button onClick={() => removeItem(product)}><FiMinus /></button>
                        <span>{getSimpleItemQuantity(product.id)}</span>
                        <button onClick={() => addItem(product)}><FiPlus /></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* --- CARDÁPIO (LANCHES) --- */}
              <div className="product-category">
                <h3 className="font-display">Lanches</h3>
                {products.lanches.map(product => (
                  <div className="product-item" key={product.id}>
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      {product.description && <p className="product-description">{product.description}</p>}
                      <p>{formatPrice(product.price)}</p>
                    </div>
                    <button className="btn-add" onClick={() => addItem(product)}>
                      Adicionar
                    </button>
                  </div>
                ))}
              </div>
              
              {/* --- CARDÁPIO (BEBIDAS) --- */}
              <div className="product-category">
                <h3 className="font-display">Bebidas</h3>
                {products.bebidas.map(product => (
                  <div className="product-item" key={product.id}>
                    <div className="product-info">
                      <h4>{product.name}</h4>
                      <p>{formatPrice(product.price)}</p>
                    </div>
                    {getSimpleItemQuantity(product.id) === 0 ? (
                      <button className="btn-add" onClick={() => addItem(product)}>Adicionar</button>
                    ) : (
                      <div className="quantity-control">
                        <button onClick={() => removeItem(product)}><FiMinus /></button>
                        <span>{getSimpleItemQuantity(product.id)}</span>
                        <button onClick={() => addItem(product)}><FiPlus /></button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* --- 1. MUDANÇA: "MEU PEDIDO" (MOVEMOS PARA CÁ) --- */}
              {cartItems.length > 0 && (
                <div className="cart-summary">
                  <h3 className="font-display">Meu Pedido</h3>
                  {cartItems.map((item) => (
                    <div className="product-item" key={item.cartItemId || item.id}>
                      <div className="product-info">
                        <h4>{item.name}</h4>
                        {item.addons && item.addons.length > 0 && (
                          <div className="summary-item-addons">
                            {item.addons.map(addon => addon.name).join(', ')}
                          </div>
                        )}
                        <p>{formatPrice(item.totalItemPrice)}</p>
                      </div>
                      <div className="quantity-control">
                        <button onClick={() => removeItem(item)}><FiMinus /></button>
                        <span>{item.quantity}</span>
                        <button onClick={() => addItem(item)}><FiPlus /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {/* --- FIM DE "MEU PEDIDO" --- */}

              {cartItems.length > 0 && (
                <div className="checkout-form">
                  <h3 className="font-display">Seus Dados</h3>
                  
                  <div className="form-group">
                    <label htmlFor="name">Seu Nome</label>
                    <input 
                      type="text" id="name" className="form-input" placeholder="Como devemos te chamar?"
                      value={customerInfo.name}
                      onChange={(e) => handleFieldChange('name', e.target.value)} 
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Seu WhatsApp</label>
                    <input 
                      type="tel" id="phone" className="form-input" placeholder="(47) 99999-9999"
                      value={customerInfo.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)} 
                    />
                  </div>

                  <div className="form-group">
                    <label>Método de Entrega</label>
                    <div className="radio-group">
                      <button 
                        className={`radio-btn ${deliveryMethod === 'retirada' ? 'active' : ''}`}
                        onClick={() => handleDeliveryMethodChange('retirada')}
                      >
                        Retirada no Balcão
                      </button>
                      <button 
                        className={`radio-btn ${deliveryMethod === 'entrega' ? 'active' : ''}`}
                        onClick={() => handleDeliveryMethodChange('entrega')}
                      >
                        Entrega (Delivery)
                      </button>
                    </div>
                  </div>

                  {deliveryMethod === 'entrega' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="delivery-fields"
                    >
                      <div className="form-group">
                        <label htmlFor="cep">CEP</label>
                        <input 
                          type="text" id="cep" className="form-input" placeholder="Ex: 89200-000"
                          value={customerInfo.cep}
                          onChange={(e) => handleFieldChange('cep', e.target.value)} 
                          onBlur={handleCalculateFee}
                        />
                      </div>
                      
                      {customerInfo.street && (
                        <div className="form-group">
                          <label htmlFor="street">Rua</label>
                          <input 
                            type="text" 
                            id="street" 
                            className="form-input" 
                            value={customerInfo.street}
                            disabled 
                          />
                        </div>
                      )}

                      <div className="form-group">
                        <label htmlFor="number">Número da Casa</label>
                        <input 
                          type="text" id="number" className="form-input" placeholder="Ex: 123"
                          value={customerInfo.number}
                          onChange={(e) => handleFieldChange('number', e.target.value)} 
                        />
                      </div>
                      
                      <div className="fee-result">
                        {isLoadingFee && <div className="fee-loading"><FiLoader className="spinner" /> Verificando CEP...</div>}
                        {feeError && <div className="fee-error">{feeError}</div>}
                        {deliveryFee > 0 && (
                          <div className="fee-success">
                            Taxa para {customerInfo.neighborhood}: {formatPrice(deliveryFee)}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  )}
                  
                  {deliveryMethod === 'retirada' && (
                    <div className="form-group">
                      <label>Pagamento na Retirada</label>
                      <p className="payment-info">Você pode pagar com Cartão, Dinheiro ou PIX no balcão.</p>
                    </div>
                  )}
                  {deliveryMethod === 'entrega' && (
                    <div className="form-group">
                      <label>Pagamento da Entrega</label>
                      <p className="payment-info">Pagamento via PIX. (O pedido será enviado pelo WhatsApp para confirmação).</p>
                    </div>
                  )}
                  
                </div>
              )}
            </div> 

            {cartItems.length > 0 && (
              <div className="modal-footer">
                <div className="total-price">
                  <p>Total:</p>
                  <span className="font-display">{formatPrice(finalTotalPrice)}</span>
                </div>
                <button 
                  className="btn-primary btn-checkout"
                  onClick={handleSendToWhatsApp}
                  disabled={!isFormValid()}
                >
                  <FiSend />
                  <span>Enviar Pedido</span>
                </button>
              </div>
            )}

          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};