import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { GlobalContext } from "./contexts/global";
import Header from "./components/Header";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";

function App() {
  const [{ auth }] = useContext(GlobalContext);

  if (!auth.token) {
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <SignIn />
          </Route>
        </Switch>
      </Router>
    );
  }

  return (
    <Router>
      <Header>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
        </Switch>
      </Header>
    </Router>
  );
}

export default App;
