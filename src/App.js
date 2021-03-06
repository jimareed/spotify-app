import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import './App.css';
import SpotifyLogin from "./SpotifyLogin";
import SpotifyAuthRedirect from "./SpotifyAuthRedirect";


const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <SpotifyLogin />
        </Route>
        <Route path="/auth">
          <SpotifyAuthRedirect />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;