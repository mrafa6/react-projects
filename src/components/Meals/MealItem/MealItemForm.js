import classes from "./MealItemForm.module.css";

import React, { useRef, useState } from "react";
import Input from "../../UI/Input";

const MealItemForm = (props) => {
  const [isEnteredValueValid, setIsEnteredValueValid] = useState(true);

  const amountInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredValue = amountInputRef.current.value;
    const enteredNumValue = +enteredValue;

    if (
      enteredValue.trim().length === 0 ||
      enteredNumValue < 1 ||
      enteredNumValue > 5
    ) {
      setIsEnteredValueValid(false);
      return;
    }

    props.onAddItem(enteredNumValue);
  };

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount",
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button type="submit">+ Add</button>
      {!isEnteredValueValid && <p>Please enter a valid amount (1-5). </p>}
    </form>
  );
};

export default MealItemForm;
