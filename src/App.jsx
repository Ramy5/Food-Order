import { useState } from "react";
import Cart from "./components/cart/Cart";
import Header from "./components/layout/Header";
import Meals from "./components/meals/Meals";
import ContextProvider from "./store/contextProvider";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);

  const openModalHandler = () => setCartIsShown(true);
  const closeModalHandler = () => setCartIsShown(false);

  return (
    <ContextProvider>
      {cartIsShown && <Cart onHideModal={closeModalHandler} />}
      <Header onShowModal={openModalHandler} />
      <main>
        <Meals />
      </main>
    </ContextProvider>
  );
}

export default App;
