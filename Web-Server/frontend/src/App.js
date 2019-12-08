import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

// common
import { Navbar } from "./components/layout/common/Navbar";
import { Footer } from "./components/layout/common/Footer";

// main
import { MainPage } from "./components/layout/main/MainPage";
import { RegisterPage } from "./components/layout/main/RegisterPage";
import { LoginPage } from "./components/layout/main/LoginPage";
import { ActivateAccountPage } from "./components/layout/main/ActivateAccountPage";
import { ActivateAccount } from "./components/layout/main/ActivateAccount";

// public
import { BooksPage } from "./components/layout/public/book/BooksPage";
import { BookPage } from "./components/layout/public/book/BookPage";

// private (user)
import { PrivateRoute } from "./components/common/PrivateRoute";
import { EditProfilePage } from "./components/layout/user/EditProfilPage";
import { InvitesPage } from "./components/layout/user/InvitesPage";
import { UserPage } from "./components/layout/user/UserPage";

//admin
import { RestrictedRoute } from "./components/common/RestrictedRoute";
import { ManageUsers } from "./components/layout/admin/ManageUsers";
import { EditUserProfile } from "./components/layout/admin/EditUserProfile";
import { RecommendationsPage } from "./components/layout/admin/RecommendationsPage";

// not found
import { NotFound } from "./components/layout/common/NotFound";

import { setAuthorizationToken } from "./utils/jwtUtils";
import { setCurrentUser } from "./actions/authAction";
import jwt_decode from "jwt-decode";
import { SearchPage } from "./components/layout/public/search/SearchPage";

if (localStorage.getItem("jwtToken")) {
  setAuthorizationToken(localStorage.getItem("jwtToken"));
  const decoded_data = jwt_decode(localStorage.getItem("jwtToken"));
  store.dispatch(setCurrentUser(decoded_data));
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/" component={MainPage} />
            <Route
              exact
              path="/aktywuj-konto"
              component={ActivateAccountPage}
            />
            <Route exact path="/potwierdz-kod" component={ActivateAccount} />
            <Route exact path="/book/:id" component={BookPage} />
            <Route exact path="/books/" component={BooksPage} />
            <Route exact path="/books/:category" component={BooksPage} />
            <Route exact path="/register" component={RegisterPage} />
            <Route exact path="/login" component={LoginPage} />
            <Route exact path="/search/:text" component={SearchPage} />
            <PrivateRoute
              exact
              path="/profile/edit"
              component={EditProfilePage}
            />
            <PrivateRoute exact path="/invites" component={InvitesPage} />
            <PrivateRoute exact path="/user-page/:id" component={UserPage} />
            <RestrictedRoute
              exact
              path="/manage/users"
              component={ManageUsers}
            />
            <RestrictedRoute
              exact
              path="/manage/edit-user-profile/:id"
              component={EditUserProfile}
            />

            <RestrictedRoute
              exact
              path="/manage/recommendations"
              component={RecommendationsPage}
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
