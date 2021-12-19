import React from "react";

import classes from "./ErrorStyle.module.css";

const Button = (props) => {
  return (
    <button
      className={classes.button2}
      type={props.type || "button"}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};

export default Button;
