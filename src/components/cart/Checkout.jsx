import useInput from "../../hooks/use-input";
import classes from "./Checkout.module.css";

const Checkout = (props) => {
  const {
    value: name,
    isValid: nameIsValid,
    change: nameChangeHandler,
    blur: nameBlurHandler,
    reset: resetName,
    error: nameError,
    class: nameClass,
  } = useInput();

  const {
    value: street,
    isValid: streetIsValid,
    change: streetChangeHandler,
    blur: streetBlurHandler,
    reset: resetStreet,
    error: streetError,
    class: streetClass,
  } = useInput();

  const {
    value: code,
    isValid: codeIsValid,
    change: codeChangeHandler,
    blur: codeBlurHandler,
    reset: resetCode,
    error: codeError,
    class: codeClass,
  } = useInput();

  const {
    value: city,
    isValid: cityIsValid,
    change: cityChangeHandler,
    blur: cityBlurHandler,
    reset: resetCity,
    error: cityError,
    class: cityClass,
  } = useInput();

  let formIsValid = false;
  if (nameIsValid && streetIsValid && codeIsValid && cityIsValid)
    formIsValid = true;

  const controlSubmitHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) return;

    props.onOrder({
      name,
      street,
      code,
      city,
    });

    resetName("");
    resetStreet("");
    resetCode("");
    resetCity("");
  };

  const errorMessage = (
    <p className={classes.text__error}>This field can not be empty!</p>
  );

  return (
    <form
      className={`${classes.control} ${classes.form}`}
      onSubmit={controlSubmitHandler}
    >
      <div className={classes[nameClass]}>
        <label htmlFor="name">Name</label>
        <input
          required
          type="text"
          id="name"
          value={name}
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
        />
        {nameError && errorMessage}
      </div>
      <div className={classes[streetClass]}>
        <label htmlFor="street">Street</label>
        <input
          required
          type="text"
          id="street"
          value={street}
          onChange={streetChangeHandler}
          onBlur={streetBlurHandler}
        />
        {streetError && errorMessage}
      </div>
      <div className={classes[codeClass]}>
        <label htmlFor="postal">Postal code</label>
        <input
          required
          type="text"
          id="postal"
          value={code}
          onChange={codeChangeHandler}
          onBlur={codeBlurHandler}
        />
        {codeError && errorMessage}
      </div>
      <div className={classes[cityClass]}>
        <label htmlFor="city">City</label>
        <input
          required
          type="text"
          id="city"
          value={city}
          onChange={cityChangeHandler}
          onBlur={cityBlurHandler}
        />
        {cityError && errorMessage}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Close
        </button>
        <button className={classes.submit} disabled={!formIsValid}>
          Confirm
        </button>
      </div>
    </form>
  );
};

export default Checkout;
