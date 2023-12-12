import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";

const Spent = () => {
  const { expenses, Currency } = useContext(AppContext);
  const totalExpenses = expenses.reduce((total, item) => {
    return (total += item.allocatedBudget);
  }, 0);

  return (
    <div className="alert alert-primary">
      <span>
        Spent so far: {Currency}
        {totalExpenses}
      </span>
    </div>
  );
};

export default Spent;
