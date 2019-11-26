import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./components/Login";
import CreateEvent from "./components/CreateEvent";
import EventPage from "./components/EventPage";
import SignUp from "./components/SignUp";
import UpcomingEvent from "./components/UpcomingEvent";
import PastEvents from "./components/PastEvents"
import { StoreProvider } from "./utils/GlobalState";

function App() {

  return (
    <Router>
      <div>
        <StoreProvider>
          <Nav />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/events/:shortid" component={EventPage} />
            <Route exact path="/event/create" component={CreateEvent} />
            <Route exact path="/event/upcoming" component={UpcomingEvent} />
            <Route component={Login} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
