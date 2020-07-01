import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "../pages/Main/Main";
import Statistics from "../pages/Statictics";
import { Navigation } from "../components/Navigation";

export const Routes = ({}) => {
  return (
    <BrowserRouter>
      <Navigation />
      <Switch>
        <Route exact path={"/"}>
          <Main />
        </Route>

        <Route exact path={"/statistics"}>
          <Statistics />
        </Route>
      </Switch>
    </BrowserRouter>
  );
};
