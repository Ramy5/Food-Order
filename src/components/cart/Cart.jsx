import { useContext, useState } from "react";
import context from "../../store/cart-context";
import Model from "../UI/Model";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [isOrder, setIsOrder] = useState(false);
  const [faild, setFaild] = useState();
  const [isSubmiting, setIsSubmiting] = useState(false);
  const [successSubmit, setSuccessSubmit] = useState(false);
  const ctx = useContext(context);

  const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
  const hasItems = ctx.items.length > 0;

  const cartItemAddHandler = (item) => ctx.addItem({ ...item, amount: 1 });
  const cartItemRemoveHandler = (id) => ctx.removeItem(id);

  const orderHandler = () => {
    setIsOrder(true);
  };

  const submitOrderHandler = async (userData) => {
    try {
      setIsSubmiting(true);
      const api = await fetch(
        "https://react-http-9927e-default-rtdb.firebaseio.com/order.json",
        {
          method: "POST",
          body: JSON.stringify({
            order: userData,
            items: ctx.items,
          }),
        }
      );

      if (!api.ok) throw new Error("Sending data is faild!");
      setSuccessSubmit(true);
      ctx.clearItems();
    } catch (error) {
      setFaild(error.message);
    } finally {
      setIsSubmiting(false);
    }
  };

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

  const buttonActionsHandler = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onHideModal}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const model = (
    <>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {isOrder && (
        <Checkout onCancel={props.onHideModal} onOrder={submitOrderHandler} />
      )}
      {!isOrder && buttonActionsHandler}
    </>
  );

  const submitContent = <p>Data is sending...</p>;
  const successContent = (
    <>
      <p>Successfuly submit data.</p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideModal}>
          Close
        </button>
      </div>
    </>
  );
  const faildContent = <p>{faild}</p>;

  return (
    <Model onClick={props.onHideModal}>
      {!isSubmiting && !successSubmit && model}
      {isSubmiting && submitContent}
      {faild && !isSubmiting && faildContent}
      {successSubmit && !isSubmiting && successContent}
    </Model>
  );
};

export default Cart;
