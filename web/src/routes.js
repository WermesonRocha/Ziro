import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Main from "./pages/Main";
import Details from "./pages/Details";
import Update from "./pages/Update";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Main} />
        <Route path="/details/:id" component={Details} />
        <Route path="/update/:id" component={Update} />
      </Switch>
    </BrowserRouter>
  );
}
