import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { GlobalContext } from "./contexts/global";
import SignIn from "./screens/SignIn";
import Header from "./components/Header";

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
            Hello Home Screen
          </Route>
        </Switch>
      </Header>
    </Router>
  );
}

export default App;
