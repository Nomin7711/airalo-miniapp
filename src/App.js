import Loader from "@components/Loader";
import { colors } from "@constants/colors";
import React, { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

const Airalo = lazy(() => import("./apps/Airalo/index"));
const Travelsim = lazy(() => import("./apps/Travelsim/index"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loader visible={true} color={colors.primary} />}>
        <Switch>
          <Route path="/airalo*" component={Airalo} exact />
          <Route path="/travelsim*" component={Travelsim} exact />
          <Redirect exact from="/" to="/airalo" />
          <Redirect exact from="/travel" to="/travelsim" />
        </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
