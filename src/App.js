import React, { Suspense } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Landing from "./components/Landing";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import LoadingSpinner from "./UIElements/LoadingSpinner";
import { AuthContext } from "./utils/auth-context";
import { useAuth } from "./hooks/auth-hook";
import Auth from "./components/Auth";
// import ThanksComponent from "./components/ThanksComponent";
// import TableCompo from "./components/TableCompo";

const TableCompo = React.lazy(() => import("./components/TableCompo"));
const TermsConditions = React.lazy(() => import("./components/TermsConditions"));
const ThanksComponent = React.lazy(() =>
  import("./components/ThanksComponent")
);
function App() {
  const { userName, userId, token, login, logout } = useAuth();
  let routes;
  if (token) {
    routes = (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/terminosYCondiciones" component={TermsConditions} />
        <Route exact path="/thanks" component={ThanksComponent} />
        <Route exact path="/privateDataAccess" component={TableCompo} />
        <Route exact path="/login" component={Auth} />
        <Route path="/" component={Landing} />
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route exact path="/thanks" component={ThanksComponent} />
        <Route exact path="/login" component={Auth} />
        <Route exact path="/terminosYCondiciones" component={TermsConditions} />
        {/* <Redirect to="/"></Redirect> */}
        <Route component={Landing} />
      </Switch>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userName: userName,
        userId: userId,
        token: token,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <div className="App">
          <main>
            <Suspense
              fallback={
                <div className="center">
                  <LoadingSpinner />
                </div>
              }
            >
              {routes}
            </Suspense>
          </main>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
