import React from "react";
import { initialState } from "./initialState";

const ReportContext = React.createContext();

const STATUSES = {
  SUCCESS: "good",
  CREASED: "creased",
  FAILURE: "defective",
};

const ReportContextProvider = ({ children }) => {
  const [report, setReport] = React.useState(initialState);
  const value = { report, setReport };
  return (
    <ReportContext.Provider value={value}>{children}</ReportContext.Provider>
  );
};

export { ReportContext, ReportContextProvider, STATUSES };
