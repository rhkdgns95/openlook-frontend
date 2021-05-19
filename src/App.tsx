import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Room } from "./routes";

export const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/room/:roomId" component={Room} />
      </Switch>
    </BrowserRouter>
  );
};
