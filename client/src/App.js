import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Nav from "./components/Nav";
import Login from "./components/Login";
import CreateEvent from "./components/CreateEvent";
import EventPage from "./components/EventPage";
import SignUp from "./components/SignUp";
import { StoreProvider } from "./utils/GlobalState";
import EventTab from "./components/EventTab";

function App() {
  return (
    <Router>
      <div>
        <StoreProvider>
          <EventTab />
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/events/:shortid" component={EventPage} />
            <Route exact path="/event/create" component={CreateEvent} />
            <Route component={Login} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
