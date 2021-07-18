import React, { useContext, useState, useEffect } from "react";
import CartIcon from "../Cart/CartIcon";
import classes from "./HeaderCartButton.module.css";
import CartContext from "../../store/CartContext";

const HeaderCartButton = (props) => {
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const ctx = useContext(CartContext);
  const { items } = ctx;

  const cartItemCount = ctx.items.reduce((curNumber, item) => {
    return curNumber + item.amount;
  }, 0);

  const cartClickHandler = () => {
    // console.log(`Cart icon clicked`);
    props.onShowCart();
  };

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsCartUpdated(true);
    const timer = setTimeout(() => {
      setIsCartUpdated(false);
    }, 300);
    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  const btnClasses = `${classes.button} ${isCartUpdated ? classes.bump : ""}`;

  return (
    <button className={btnClasses} onClick={cartClickHandler}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{cartItemCount}</span>
    </button>
  );
};

export default HeaderCartButton;
