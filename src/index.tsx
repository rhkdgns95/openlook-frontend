import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import { App } from "./App";
import { GlobalStyles } from "./styles";

ReactDOM.render(
  <ThemeProvider theme={{}}>
    <App />
    <GlobalStyles />
  </ThemeProvider>,
  document.getElementById("root")
);
