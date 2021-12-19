import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../store of browser provider/auth-context";
import classes from "./AuthForm.module.css";
import axios from "axios";
import validateInfo from "../../ValidateForm";
import ErrorModal from "../../pages/Errot component/ErrorPage";

const AuthForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);
  const [isSubmited, setIsSubmited] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorPage, setErrorPage] = useState(true);
  const [errorFromServer, setErrorFromServer] = useState(null);

  function submitForm() {
    setIsSubmited(true);
  }

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [Info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const handelChange = (event) => {
    const { name, value } = event.target;
    setInfo((privous) => {
      return {
        ...privous,
        [name]: value,
      };
    });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorPage(true);
    setErrors(validateInfo(Info));
    setIsSubmitting(true);
  };

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
    setInfo({
      email: "",
      password: "",
    });
    setErrors({});
    setIsSubmited(false);
    setErrorPage(false);
  };

  useEffect(() => {
    if (Object.keys(errors).length === 0 && isSubmitting && errorPage) {
      submitForm();
    }
  }, [errors, errorPage, isSubmitting]);

  if (isSubmitting && isSubmited) {
    setIsSubmitting(false);
    setIsSubmited(false);
    if (!isLogin) {
      axios.post("http://localhost:4000/app/signup", Info).then((data) => {
        if (data.data.seccess) {
          setIsLoading(false);
          authCtx.isLoggedIn = true;
          setIsLogin(true);

          history.push("/auth");

          setInfo({
            email: "",
            password: "",
          });
        } else {
          setErrorFromServer(data.data.messeg);

          setInfo({
            email: "",
            password: "",
          });
        }
      });
    } else {
      axios.post("http://localhost:4000/app/login", Info).then((data) => {
        setIsLoading(false);
        if (data.data.auth) {
          authCtx.isLoggedIn = true;

          const expirationTime = new Date(
            new Date().getTime() + +data.data.expiresIn * 1000
          );

          authCtx.login(
            data.data.token,
            expirationTime.toISOString(),
            data.data.userData
          );
          history.replace("/choosePage");
        } else {
          setErrorFromServer(data.data.messeg);
          setInfo({
            email: "",
            password: "",
          });
        }
      });
    }
  }
  const errorHandler = () => {
    setErrorFromServer(null);
  };
  return (
    <div>
      <div>
        {errorFromServer && (
          <ErrorModal
            title={"An error Occured!"}
            message={errorFromServer}
            onConfirm={errorHandler}
          />
        )}
      </div>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input
            placeholder="Enter your email"
            //required
            onChange={handelChange}
            value={Info.email}
            name="email"
            id="email"
          />
        </div>
        <p className={classes.errorP}>{errors.email}</p>

        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>

          <input
            type="password"
            id="password"
            placeholder="Enter your password"
            onChange={handelChange}
            name="password"
            value={Info.password}
          />
        </div>

        <p className={classes.errorP}>{errors.password}</p>

        <div className={classes.actions}>
          {!isLoading && (
            <button type="button" onClick={handleSubmit}>
              {isLogin ? "Login" : "Create Account"}
            </button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing account"}
          </button>
        </div>
      </section>
    </div>
  );
};

export default AuthForm;

// const StrongVadility = function password_Strong_validate(password) {
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
// };
