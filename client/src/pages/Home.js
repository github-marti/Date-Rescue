import React, { useEffect } from "react";
import Nav from "../components/Nav";
import Events from "../components/Events";
import API from "../utils/eventAPI";
import { useStoreContext } from "../utils/GlobalState";
import { SET_NEW_EVENT } from "../utils/actions";

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
    }, [state.reload])

    return (
        <>
            <Nav />
            <Events />
        </>
    )
}

export default Home;