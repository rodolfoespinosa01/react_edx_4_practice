import React, { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const Budget = () => {
  const { dispatch, Currency } = useContext(AppContext);
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (event) => {
    setUserInput(parseFloat(event.target.value));
  };

  const handleKeyDown = (event) => {
    if (event.key === "ArrowUp") {
      setUserInput((prevValue) => (parseFloat(prevValue) || 0) + 10);
    } else if (event.key === "ArrowDown") {
      setUserInput((prevValue) => (parseFloat(prevValue) || 0) - 10);
    }
  };

  const handleKeyUp = (event) => {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      // Optionally, you can handle any specific logic when the key is released
    }
  };

  const handleSetBudget = () => {
    const enteredBudget = parseFloat(userInput);

    // Check if the entered budget exceeds the upper limit
    if (enteredBudget > 19000) {
      alert("You cannot reduce the budget value lower than the spending");
      return;
    }
    dispatch({
      type: "SET_BUDGET",
      payload: { budget: parseFloat(userInput) },
    });
  };

  return (
    <div className="alert alert-secondary">
      <span>
        Budget: {Currency}
        <input
          className="ms-2"
          type="number"
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onKeyUp={handleKeyUp}
        />
        <button className="btn btn-primary ms-2" onClick={handleSetBudget}>
          Set Budget
        </button>
      </span>
    </div>
  );
};

export default Budget;
