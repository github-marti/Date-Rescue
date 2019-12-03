import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import Login from "./components/Login";
import Home from "./pages/Home";
import CreateEvent from "./components/CreateEvent";
import EventPage from "./components/EventPage";
import SignUp from "./components/SignUp";
import UpcomingEvent from "./components/UpcomingEvent";
import AllEvents from "./components/AllEvents"
import { StoreProvider } from "./utils/GlobalState";
import Button from './components/LocationCard'
// import EventTab from "./components/EventTab";
import LocationForm from "./components/LocationForm"
function App() {

  return (
    <Router>
      <div>
        <StoreProvider>
          <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/signup" component={SignUp} />
            <Route exact path="/events/:shortid" component={EventPage} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/event/upcoming" component={UpcomingEvent} />
            <Route exact path="/events" component={AllEvents} />
            <Route exact path="/location" component={LocationForm} />
            <Route component={Login} />
          </Switch>
        </StoreProvider>
      </div>
    </Router>
  );
}

export default App;
