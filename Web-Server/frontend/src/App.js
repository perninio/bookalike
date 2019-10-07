import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import { Navbar } from "./components/layout/common/Navbar";
import { Footer } from "./components/layout/common/Footer";

import { MainPage } from "./components/layout/main/MainPage";
import { RegisterPage } from "./components/layout/main/RegisterPage";
import { LoginPage } from "./components/layout/main/LoginPage";

import { PrivateRoute } from "./components/common/PrivateRoute";
import { Profil } from "./components/layout/user/Profil";

import { RestrictedRoute } from "./components/common/RestrictedRoute";
import { ManageUsers } from "./components/layout/admin/ManageUsers";
import { NotFound } from "./components/layout/common/NotFound";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <PrivateRoute exact path="/profil" component={Profil} />
            <RestrictedRoute
              exact
              path="/manage/users"
              component={ManageUsers}
            />
            <Route path="/" component={NotFound} />
          </Switch>
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
