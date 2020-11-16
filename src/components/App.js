import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import AntLayout from "./AntLayout";
import Home from "../pages/Home";
import "../styles/App.css";

function App() {
  return (
    <BrowserRouter>
      <AntLayout>
        <Switch>
          <Route exact path="/" component={Home} />
        </Switch>
      </AntLayout>
    </BrowserRouter>
  );
}

export default App;
