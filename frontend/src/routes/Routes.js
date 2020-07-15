import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";

import Main from "../pages/Main/Main";
import Statistics from "../pages/Statictics";
import { ReportContextProvider } from "../context/ReportContext";
import { Navigation } from "../components/Navigation";
import { fontFamily } from "../styles/variable";

const GlobalStyle = createGlobalStyle`
 body{
    font-family:${fontFamily.spartan};  
 }
  
`;

export const Routes = () => (
  <>
    <ReportContextProvider>
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
    </ReportContextProvider>
  </>
);
