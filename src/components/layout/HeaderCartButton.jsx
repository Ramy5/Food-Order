import { useContext, useEffect, useState } from "react";
import CartIcon from "../cart/CartIcon";
import context from "../../store/cart-context";
import classes from "./HeaderCartButton.module.css";

const HeaderCartButton = (props) => {
  const [btnIsBump, setBtnIsBump] = useState(false);

  const ctx = useContext(context);
  const { items } = ctx;

  const numberOfCartAmount = items.reduce((acc, curr) => acc + curr.amount, 0);

  const btnClass = `${classes.button} ${btnIsBump ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) return;

    setBtnIsBump(true);
    const timer = setTimeout(() => setBtnIsBump(false), 300);

    return () => clearTimeout(timer);
  }, [items]);

  return (
    <button className={btnClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>{numberOfCartAmount}</span>
    </button>
  );
};

export default HeaderCartButton;
