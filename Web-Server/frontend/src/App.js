import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import { Provider } from "react-redux";
import store from "./store";

import { Navbar } from "./components/layout/common/Navbar";
import { Footer } from "./components/layout/common/Footer";

import { MainPage } from "./components/layout/main/MainPage";
import { RegisterPage } from "./components/layout/main/RegisterPage";
import { LoginPage } from "./components/layout/main/LoginPage";

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Navbar />
          <Route exact path="/" component={MainPage} />
          <Route exact path="/register" component={RegisterPage} />
          <Route exact path="/login" component={LoginPage} />
          <Footer />
        </Router>
      </Provider>
    </div>
  );
}

export default App;
