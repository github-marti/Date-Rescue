import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Events from "../components/Events";
import API from "../utils/eventAPI";
import LocationView from "../components/LocationView";
import { useStoreContext } from "../utils/GlobalState";
import { SET_NEW_EVENT, UPDATE_HOME_ACTIVE } from "../utils/actions";

function Home() {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        API.getEvents(state.userid)
            .then(results => {
                dispatch({
                    type: SET_NEW_EVENT,
                    newEvent: results.data[0]
                })
            });
    }, [state.reload]);

    const handleClick = event => {
        let name = event.target.name;
        dispatch({
            type: UPDATE_HOME_ACTIVE,
            homeActive: name
        })
    }

    return (
        <>
            <Nav handleClick={handleClick}/>
            {state.homeActive === 'events' ? <Events />
            : state.homeActive === 'locations' ? <LocationView />
            : <Events />}
        </>
    )
}

export default Home;