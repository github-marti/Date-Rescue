import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import Nav from "../components/Nav";
import Events from "../components/Events";
import eventAPI from "../utils/eventAPI";
import userAPI from "../utils/userAPI";
import LocationView from "../components/LocationView";
import { useStoreContext } from "../utils/GlobalState";
import { SET_NEW_EVENT, UPDATE_HOME_ACTIVE } from "../utils/actions";

function Home() {
    const [state, dispatch] = useStoreContext();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        userAPI.getUser()
            .then(results => {
                if (results.data) {
                    eventAPI.getEvents(state.userid)
                        .then(results => {
                            dispatch({
                                type: SET_NEW_EVENT,
                                newEvent: results.data[0]
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        })
                } else {
                    console.log('no user')
                    setRedirect(true);
                }
            })
            .catch(err => {
                console.log(err)
            });
    }, [redirect]);

    const handleClick = event => {
        let name = event.target.name;
        dispatch({
            type: UPDATE_HOME_ACTIVE,
            homeActive: name
        })
    };

    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to='/' />
        };
    };

    return (
        <>
            {renderRedirect()}
            <Nav handleClick={handleClick} />
            {state.homeActive === 'events' ? <Events />
                : state.homeActive === 'locations' ? <LocationView />
                    : <Events />}
        </>
    )
}

export default Home;