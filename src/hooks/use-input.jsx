import { useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

const inputReducer = (state, action) => {
  if (action.type === "CHANGE") {
    return { value: action.value, isTouched: state.isTouched };
  }

  if (action.type === "BLUR") {
    return { value: state.value, isTouched: action.isTouched };
  }

  if (action.type === "RESET") return initialInputState;

  return initialInputState;
};

const useInput = () => {
  const [inputState, dispatchInputState] = useReducer(
    inputReducer,
    initialInputState
  );

  const valueIsValid = inputState.value.trim() !== "";
  const hasError = !valueIsValid && inputState.isTouched;

  const inputClass = hasError ? "invalid" : ``;

  const changeHandler = (event) => {
    dispatchInputState({ type: "CHANGE", value: event.target.value });
  };

  const blurHandler = () => {
    if (!valueIsValid) {
      dispatchInputState({ type: "BLUR", isTouched: true });
    }
  };

  const reset = () => {
    dispatchInputState({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    change: changeHandler,
    blur: blurHandler,
    error: hasError,
    class: inputClass,
    reset,
  };
};

export default useInput;
