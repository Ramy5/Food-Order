import { useRef, useState } from "react";
import Input from "../../UI/Input";
import classes from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [amountIsValid, setAmountIsValid] = useState(false);
  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const amountValue = amountInputRef.current.value;
    const amountValueNumber = +amountValue;

    if (
      amountValue.trim().length === 0 ||
      amountValueNumber > 5 ||
      amountValueNumber < 1
    ) {
      setAmountIsValid(true);
      return;
    }

    props.onAddCart(amountValueNumber)
  };

  return (
    <form action="" className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {amountIsValid && <p>please add a correct value of number [1-5]</p>}
    </form>
  );
};

export default MealItemForm;
