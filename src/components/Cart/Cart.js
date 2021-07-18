import React, { useContext } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/CartContext";
import CartItem from "./CartItem";

const Cart = (props) => {
  const cartCtx = useContext(CartContext);
  const isEmpty = cartCtx.items.length === 0;

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  return (
    <Modal onClose={props.onCloseCart}>
      {isEmpty ? (
        <EmptyCart />
      ) : (
        <React.Fragment>
          <ul className={classes["cart-items"]}>
            {cartCtx.items.map((item, index) => (
              <CartItem
                key={index}
                item={item}
                onAdd={cartItemAddHandler.bind(null, item)}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
              ></CartItem>
            ))}
          </ul>
          <div className={classes.total}>
            <span>Total Amount</span>
            <span>₹ {cartCtx.totalAmount.toFixed(2)}</span>
          </div>
          <div className={classes.actions}>
            <button
              className={classes["button--alt"]}
              onClick={props.onCloseCart}
            >
              Close
            </button>
            <button className={classes.button}>Order</button>
          </div>
        </React.Fragment>
      )}
    </Modal>
  );
};

const EmptyCart = () => {
  return (
    <div className={classes.emptyCart}>
      <h1 style={{ fontSize: 100 + "px" }}>&#128542;</h1>
      <h2>Your Cart is empty! </h2>
      <h3>Why don't add something!</h3>
    </div>
  );
};

export default Cart;
