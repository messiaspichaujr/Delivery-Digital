import React, { createContext, useReducer, useContext } from 'react';

const initialState = {
  isCartOpen: false,
  cartItems: [],
  customerInfo: { name: '', phone: '', cep: '', number: '', neighborhood: '', street: '', city: '', state: '' },
  deliveryMethod: 'retirada',
  deliveryFee: 0,
  feeError: null,
};

function addItemToCart(cart, productToAdd) {
  const key = productToAdd.cartItemId ? 'cartItemId' : 'id';
  const idToFind = productToAdd[key];

  const existingItem = cart.find(item => item[key] === idToFind);

  if (existingItem) {
    return cart.map(item =>
      item[key] === idToFind
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  }

  return [...cart, { ...productToAdd, quantity: 1 }];
}

function removeItemFromCart(cart, productToRemove) {
  const key = productToRemove.cartItemId ? 'cartItemId' : 'id';
  const idToFind = productToRemove[key];

  const existingItem = cart.find(item => item[key] === idToFind);

  if (existingItem.quantity === 1) {
    return cart.filter(item => item[key] !== idToFind);
  }

  return cart.map(item =>
    item[key] === idToFind
      ? { ...item, quantity: item.quantity - 1 }
      : item
  );
}

function cartReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_CART':
      return { ...state, isCartOpen: !state.isCartOpen };
    case 'CLOSE_CART':
      return { ...state, isCartOpen: false };
    case 'ADD_ITEM':
      return { ...state, cartItems: addItemToCart(state.cartItems, action.payload) };
    case 'REMOVE_ITEM':
      return { ...state, cartItems: removeItemFromCart(state.cartItems, action.payload) };
    case 'CLEAR_CART':
      return { ...state, cartItems: [], customerInfo: initialState.customerInfo, deliveryFee: 0, feeError: null, deliveryMethod: 'retirada' };
      
    case 'SET_DELIVERY_METHOD':
      return { 
        ...state, 
        deliveryMethod: action.payload,
        deliveryFee: 0, 
        feeError: null,
        customerInfo: { ...state.customerInfo, cep: '', number: '', neighborhood: '', street: '', city: '', state: '' }
      };
    case 'SET_FORM_FIELD':
      return {
        ...state,
        customerInfo: { ...state.customerInfo, [action.payload.field]: action.payload.value }
      };
    case 'SET_DELIVERY_SUCCESS':
      return {
        ...state,
        deliveryFee: action.payload.fee,
        customerInfo: { 
          ...state.customerInfo, 
          neighborhood: action.payload.neighborhood,
          street: action.payload.street,
          city: action.payload.city,
          state: action.payload.state,
        },
        feeError: null,
      };
    case 'SET_DELIVERY_ERROR':
      return {
        ...state,
        deliveryFee: 0,
        feeError: action.payload,
        customerInfo: { ...state.customerInfo, neighborhood: '', street: '', city: '', state: '' }
      };
    default:
      return state;
  }
}

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const subtotal = state.cartItems.reduce((total, item) => {
    const pricePerUnit = item.totalItemPrice || item.price;
    return total + (item.quantity * pricePerUnit);
  }, 0);

  const totalItems = state.cartItems.reduce((total, item) => total + item.quantity, 0);
  const finalTotalPrice = subtotal + (state.deliveryMethod === 'entrega' ? state.deliveryFee : 0);

  const value = {
    state,
    dispatch,
    totalItems,
    subtotal,
    finalTotalPrice,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart deve ser usado dentro de um CartProvider');
  }
  return context;
};