import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import "./index.css";
import App from "./App";
import { AuthContextProviderData } from "./store of browser provider/auth-context";
ReactDOM.render(
  <AuthContextProviderData>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthContextProviderData>,
  document.getElementById("root")
);

// function password_validate(password) {
//   var re = {
//     capital: /[A-Z]/,
//     digit: /[0-9]/,
//     charecter: /[!@#\$%\^&\*]/,
//     small: /[a-z]/,
//     // full: /^[A-Z]{7,20}$/,
//   };

//   return (
//     re.capital.test(password) &&
//     re.digit.test(password) &&
//     re.charecter.test(password) &&
//     re.small.test(password)
//   );
// }
