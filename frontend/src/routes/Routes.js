import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Main from "../pages/Main/Main";
import Statistics from "../pages/Statictics";
import { Navigation } from "../components/Navigation";
import { fontFamily } from "../styles/variable";

const GlobalStyle = createGlobalStyle`
 body{
    font-family:${fontFamily.spartan};  
 }
  
`;

export const Routes = () => (
  <>
    <GlobalStyle />
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
  </>
);