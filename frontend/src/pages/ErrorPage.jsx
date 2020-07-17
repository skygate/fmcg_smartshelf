import React from "react";
import styled from "styled-components";

const ErrorPageWrapper = styled.div`
  text-align: center;
  margin: 6em;
`;

const ErrorPage = () => (
  <ErrorPageWrapper>
    <h1>404</h1>
    <h2>Nie znaleziono strony</h2>
    <p>
      Przepraszamy, ale strona, której szukasz, albo nie została znaleziona,
      albo nie istnieje.
    </p>
  </ErrorPageWrapper>
);

export default ErrorPage;
