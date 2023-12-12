import React, { createContext, useReducer } from "react";

// 5. The reducer - this is used to update the state, based on the action
export const AppReducer = (state, action) => {
  let new_expenses = [];
  switch (action.type) {
    case "ADD_ALLOCATEDBUDGET":
      let updatedqty = false;
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          expense.allocatedBudget =
            expense.allocatedBudget + action.payload.allocatedBudget;
          updatedqty = true;
        }
        new_expenses.push(expense);
        return true;
      });
      state.expenses = new_expenses;
      action.type = "DONE";
      return {
        ...state,
      };

    case "ALLOCATEDBUDGET":
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          expense.allocatedBudget =
            expense.allocatedBudget - action.payload.allocatedBudget;
        }
        expense.allocatedBudget =
          expense.allocatedBudget < 0 ? 0 : expense.allocatedBudget;
        new_expenses.push(expense);
        return true;
      });
      state.expenses = new_expenses;
      action.type = "DONE";
      return {
        ...state,
      };
    case "DELETE_ITEM":
      state.expenses.map((expense) => {
        if (expense.name === action.payload.name) {
          expense.allocatedBudget = 0;
        }
        new_expenses.push(expense);
        return true;
      });
      state.expenses = new_expenses;
      action.type = "DONE";
      return {
        ...state,
      };
    case "CURRENCY":
      action.type = "DONE";
      state.Currency = action.payload;
      return {
        ...state,
      };

    case "SET_BUDGET":
      return {
        ...state,
        budget: action.payload.budget,
      };

    default:
      return state;
  }
};

// 1. Sets the initial state when the app loads
const initialState = {
  expenses: [
    { id: "Marketing", name: "Marketing", allocatedBudget: 50 },
    { id: "Finance", name: "Finance", allocatedBudget: 300 },
    { id: "Sales", name: "Sales", allocatedBudget: 70 },
    {
      id: "Human Resource",
      name: "Human Resource",
      allocatedBudget: 40,
    },
    { id: "IT", name: "IT", allocatedBudget: 490 },
  ],
  Currency: "$",
  budget: 0,
};

// 2. Creates the context this is the thing our components import and use to get the state
export const AppContext = createContext();

// 3. Provider component - wraps the components we want to give access to the state
// Accepts the children, which are the nested(wrapped) components
export const AppProvider = (props) => {
  // 4. Sets up the app state. takes a reducer, and an initial state
  const [state, dispatch] = useReducer(AppReducer, initialState);

  const totalExpenses = state.expenses.reduce((total, item) => {
    return (total = total + item.unitprice * item.allocatedBudget);
  }, 0);
  state.Spent = totalExpenses;

  return (
    <AppContext.Provider
      value={{
        expenses: state.expenses,
        Spent: state.Spent,
        dispatch,
        Currency: state.Currency,
        budget: state.budget,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
