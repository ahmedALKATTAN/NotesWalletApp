import { useContext } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import NoteApp from "./Note Components/NoteApp";
import Layout from "./components/Layout/Layout";

import AuthPage from "./pages/LoginAndSignUpPage";
import HomePage from "./pages/HomePage";
import AuthContext from "./store of browser provider/auth-context";
import ChooseGat from "./components/ChooseBetween/ChooseGat";
import Wallet from "./Wallet Components/WalletApp";
function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        <div className="main-wrapper">
          <Route path="/" exact>
            <HomePage />
          </Route>
          {!authCtx.isLoggedIn && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}
          <Route path="/choosePage">
            {authCtx.isLoggedIn && <ChooseGat />}
            {!authCtx.isLoggedIn && <Redirect to="/auth" />}
          </Route>
          <Route path="/NotOrWallet">
            {console.log(authCtx.categoryType)}
            {authCtx.categoryType === "wallet" && <Wallet />}
            {authCtx.categoryType === "note" && <NoteApp />}
          </Route>
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </div>
      </Switch>
    </Layout>
  );
}

export default App;
