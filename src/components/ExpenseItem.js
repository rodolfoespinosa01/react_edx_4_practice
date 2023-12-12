import React, { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { FaTimesCircle } from "react-icons/fa";
import { IoMdAddCircle } from "react-icons/io";
import { FaMinusCircle } from "react-icons/fa";

const ExpenseItem = (props) => {
  const { dispatch, Currency } = useContext(AppContext);

  const handleDeleteItem = () => {
    const item = {
      name: props.name,
    };

    dispatch({
      type: "DELETE_ITEM",
      payload: item,
    });
  };

  return (
    <tr>
      <td>{props.name}</td>
      <td>
        {Currency}
        {props.allocatedBudget}
      </td>
      <td>
        <IoMdAddCircle
          size="2.2em"
          color="green"
          onClick={handleDeleteItem}
        ></IoMdAddCircle>
      </td>
      <td>
        <FaMinusCircle
          size="2.2em"
          color="red"
          onClick={handleDeleteItem}
        ></FaMinusCircle>
      </td>
      <td>
        <FaTimesCircle
          size="2.2em"
          color="red"
          onClick={handleDeleteItem}
        ></FaTimesCircle>
      </td>
    </tr>
  );
};

export default ExpenseItem;
