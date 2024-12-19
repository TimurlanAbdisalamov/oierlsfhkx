import { useSelector, useDispatch } from 'react-redux';
import { addCart, decrementCart, deleteCart } from '../../redux/reducer';
import './cart.scss';
import { useState } from 'react';

const Cart = () => {
  const cart = useSelector(s => s.reducer.cart);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    setLoading(true);
    dispatch(addCart(item));
    setLoading(false);
  };

  const handleDecrementCart = (item) => {
    setLoading(true);
    if (item.count > 1) dispatch(decrementCart(item));
    setLoading(false);
  };

  const handleDeleteCart = (item) => {
    setLoading(true);
    dispatch(deleteCart(item));
    setLoading(false);
  };

  return (
    <div className='cart'>
      <div className="container">
        {loading && (
          <div className="loader"></div>
        )}
        {!loading && cart.length === 0 && (
          <p>Your cart is empty!</p>
        )}
        {
          cart.map(item => {
            return (
              <div key={item.id} className="cart-item">
                <div className="cart-item-left">
                  <img src={item.image} alt="" />
                  <div>
                    <h4>{item.title}</h4>
                    <p>{item.description}</p>
                  </div>
                </div>

                <div className="cart-item-right">
                  <div className="cart-count">
                    <button
                      onClick={() => handleAddToCart(item)}
                      className="cart-count-btn">+</button>
                    <span>{item.count}</span>
                    <button
                      onClick={() => handleDecrementCart(item)}
                      className="cart-count-btn">-</button>
                  </div>
                  <p className="cart-item-price">${(item.price * item.count).toFixed(2)}</p>
                  <button
                    onClick={() => handleDeleteCart(item)}
                    className="cart-delete-btn">delete</button>
                </div>
              </div>
            );
          })
        }

        <p>Total: ${
          cart.reduce((acc, rec) => acc + rec.price * rec.count, 0).toFixed(2)
        }</p>
      </div>
    </div>
  );
};

export default Cart;
