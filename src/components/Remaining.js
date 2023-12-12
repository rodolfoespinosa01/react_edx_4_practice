import React, { useContext, useEffect } from "react";
import { AppContext } from "../context/AppContext";

const Remaining = () => {
  const { expenses, Currency, budget } = useContext(AppContext);

  const totalAllocatedBudget = expenses.reduce((total, item) => {
    return total + item.allocatedBudget;
  }, 0);

  const remaining = budget - totalAllocatedBudget;

  useEffect(() => {
    if (remaining < 0) {
      alert("The value cannot exceed remaining funds");
    }
  }, [remaining]);

  return (
    <div className="alert alert-success">
      <span>
        Remaining: {Currency}
        {remaining}
      </span>
    </div>
  );
};

export default Remaining;
