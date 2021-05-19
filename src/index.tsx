import ReactDOM from "react-dom";
import { ThemeProvider } from "styled-components";
import App from "./App";
import { GlobalStyles } from "./styles";

if (module.hot) {
  module.hot.dispose(function() {
    // 모듈이 곧 폐기 됨
  })

  module.hot.accept(function() {
    // 모듈이나 모듈의 의존 사항이 곧 갱신 됨
  })
}

ReactDOM.render(
  <ThemeProvider theme={{}}>
    <App />
    <GlobalStyles />
  </ThemeProvider>,
  document.getElementById("root")
);
