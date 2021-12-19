import React from "react";

import "./ExpenseDate.css";

const ExpenseDate = (props) => {
  // console.log(props.date);
  // console.log(new Date(props.date));
  const convertedDate = new Date(props.date);
  const month = convertedDate.toLocaleString("en-US", { month: "long" });
  const day = convertedDate.toLocaleString("en-US", { day: "2-digit" });
  const year = convertedDate.getFullYear();

  return (
    <div className="expense-date">
      <div className="expense-date__month">{month}</div>
      <div className="expense-date__year">{year}</div>
      <div className="expense-date__day">{day}</div>
    </div>
  );
};

export default ExpenseDate;
