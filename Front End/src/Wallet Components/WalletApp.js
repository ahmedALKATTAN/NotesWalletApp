import React, { useEffect, useState } from "react";
import axios from "axios";

import NewExpense from "./components/NewExpense/NewExpense";
import Expenses from "./components/Expenses/Expenses";

import AuthContext from "../store of browser provider/auth-context";
import { useContext } from "react";

const Wallet = () => {
  const DUMMY_EXPENSES = [];

  const authCtx = useContext(AuthContext);
  const userId = authCtx.userData;

  const [expenses, setExpenses] = useState(DUMMY_EXPENSES);

  useEffect(() => {
    axios
      .post("http://localhost:4000/app/GetItems", userId)
      .then((response) => {
        localStorage.setItem("notes", JSON.stringify(response.data.data));
        setExpenses(response.data.data);
        JSON.parse(localStorage.getItem("notes"));
      });
  }, [userId]);

  const addExpenseHandler = (expense) => {
    setExpenses((prevExpenses) => {
      return [expense, ...prevExpenses];
    });
  };

  return (
    <div>
      <NewExpense onAddExpense={addExpenseHandler} />
      <Expenses items={expenses} />
    </div>
  );
};

export default Wallet;
