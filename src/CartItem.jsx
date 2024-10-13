import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping, onDeleteFromCart }) => {
  const cart = useSelector(state => state.cart.items);
  const totalQuantity = useSelector(state => state.cart.totalQuantity);
  const dispatch = useDispatch();

  const parseCost = (cost) => {
    return typeof cost === 'string' ? Number(cost.replace(/[^0-9.-]+/g, "")) : cost;
  };

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart.reduce((total, item) => total + parseCost(item.cost) * item.quantity, 0);
  };

  const handleContinueShopping = (e) => {
   onContinueShopping(e);
  };

  const handleIncrement = (item) => {
    console.log(`Incrementing: ${item.name} (current quantity: ${item.quantity})`);
    dispatch(updateQuantity({name: item.name, quantity: item.quantity + 1}));
  };

  const handleDecrement = (item) => {
    console.log(`Decrementing: ${item.name} (current quantity: ${item.quantity})`);
    if (item.quantity === 1) {
        dispatch(removeItem(item.name));
        onDeleteFromCart(item);
    } else {
        dispatch(updateQuantity({name: item.name, quantity: item.quantity - 1}));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
    onDeleteFromCart(item);
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return item.quantity * parseCost(item.cost);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" 
                        onClick={() => handleDecrement(item)}>
                    -
                </button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" 
                        onClick={() => handleIncrement(item)}>
                    +
                </button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item) }>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'>
        <h4>Total Items: {totalQuantity}</h4>
      </div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1">Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


