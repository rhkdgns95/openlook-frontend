import { BrowserRouter, Route, Switch } from "react-router-dom";
import { Room, Home } from "./routes";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/room/:roomId/position/:positionId" exact component={Room} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
