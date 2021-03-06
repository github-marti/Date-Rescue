import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import Nav from "../components/Nav";
import Events from "../components/Events";
import eventAPI from "../utils/eventAPI";
import userAPI from "../utils/userAPI";
import LocationView from "../components/LocationView";
import { useStoreContext } from "../utils/GlobalState";
import {
  SET_UPCOMING_EVENT,
  UPDATE_HOME_ACTIVE,
  LOGIN_USER
} from "../utils/actions";

function Home() {
  const [state, dispatch] = useStoreContext();
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    userAPI
      .getUser()
      .then(results => {
        if (results.data) {
          dispatch({
            type: LOGIN_USER,
            username: results.data.username,
            userid: results.data.id,
            phoneNumber: results.data.phoneNumber
          });
          eventAPI
            .getUpcoming(state.userid)
            .then(results => {
              console.log(results.data);
              if (results.data) {
                dispatch({
                  type: SET_UPCOMING_EVENT,
                  upcomingEvent: results.data
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          setRedirect(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
    console.log(state);
  }, [redirect, state.userid, dispatch]);

  const handleClick = event => {
    let name = event.target.name;
    dispatch({
      type: UPDATE_HOME_ACTIVE,
      homeActive: name
    });
  };

  const handleLogout = () => {
    userAPI.logout();
    setRedirect(true);
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to="/login" />;
    }
  };

  return (
    <>
      {renderRedirect()}
      <Nav handleClick={handleClick} handleLogout={handleLogout} />
      {state.homeActive === "events" ? (
        <Events />
      ) : state.homeActive === "locations" ? (
        <LocationView />
      ) : (
        <Events />
      )}
    </>
  );
}

export default Home;
