import { useContext } from "react";
import context from "../../store/cart-context";
import Model from "../UI/Model";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";

const Cart = (props) => {
  const ctx = useContext(context);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemAddHandler = (item) => ctx.addItem({ ...item, amount: 1 });
  const cartItemRemoveHandler = (id) => ctx.removeItem(id);

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {ctx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onAdd={cartItemAddHandler.bind(null, item)}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
        />
      ))}
    </ul>
  );

  return (
    <Model onClick={props.onHideModal}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        <button className={classes["button--alt"]} onClick={props.onHideModal}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Model>
  );
};

export default Cart;
