import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  ul, li, p, a {
    margin: 0;
    padding: 0;
    list-style: inherit;
    text-decoration: inherit;
  }
`;
