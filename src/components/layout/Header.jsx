import { Fragment } from "react";
import img from "../../assets/img/meals.jpg";
import HeaderCartButton from "./HeaderCartButton";
import classes from "./Header.module.css";

const Header = (props) => {
  return (
    <Fragment>
      <header className={classes.header}>
        <h1>Meals</h1>
        <HeaderCartButton onClick={props.onShowModal} />
      </header>
      <div className={classes["main-image"]}>
        <img src={img} alt="Food on Table" />
      </div>
    </Fragment>
  );
};

export default Header;
