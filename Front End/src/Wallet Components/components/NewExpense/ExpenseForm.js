import React, { useContext, useState } from "react";
import axios from "axios";
import "./ExpenseForm.css";
import AuthContext from "../../../store of browser provider/auth-context";

const ExpenseForm = (props) => {
  const authCtx = useContext(AuthContext);
  const [Info, setInfo] = useState({
    title: "",
    amount: "",
    date: "",
    id: authCtx.userData.id,
  });
  function handelChange(event) {
    const { name, value } = event.target;
    setInfo((privous) => {
      return {
        ...privous,
        [name]: value,
      };
    });
  }

  const submitHandler = (event) => {
    event.preventDefault();

    axios.put("http://localhost:4000/app/addNewExpensse", Info).then((data) => {
      if (data.data.seccess) {
        console.log(data.data.seccess);
      } else {
        alert(data.data.messeg);
      }
    });

    props.onSaveExpenseData(Info);
  };

  return (
    <section>
      <div className="new-expense__controls">
        <div className="new-expense__control">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={Info.title}
            onChange={handelChange}
          />
        </div>
        <div className="new-expense__control">
          <label>Amount</label>
          <input
            name="amount"
            type="number"
            min="0.01"
            step="0.01"
            value={Info.amount}
            onChange={handelChange}
          />
        </div>
        <div className="new-expense__control">
          <label>Date</label>
          <input
            name="date"
            type="date"
            min="2019-01-01"
            max="2022-12-31"
            value={Info.date}
            onChange={handelChange}
          />
        </div>
      </div>
      <div className="new-expense__actions">
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button onClick={submitHandler}>Add Expense</button>
      </div>
    </section>
  );
};

export default ExpenseForm;
