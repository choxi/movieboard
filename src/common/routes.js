import { Route, IndexRoute } from "react-router";
import React from "react";

import App from "./containers/App";
import Explore from "./containers/Explore";

export default (
  <Route name="app" path="/" component={App}>
    <IndexRoute component={Explore} />
    <Route path="explore" component={Explore} />
  </Route>
);
