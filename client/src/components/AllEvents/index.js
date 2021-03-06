import React, { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import API from '../../utils/eventAPI';
import EventCard from '../EventCard';
import { SET_ALL_EVENTS } from '../../utils/actions';
import './style.css';
import { prefixedCollapsibleMap } from 'twilio/lib/base/serialize';

function AllEvents() {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        API.getEvents(state.userid)
            .then(results => {
                if (results) {
                    dispatch({
                        type: SET_ALL_EVENTS,
                        allEvents: results.data
                    })
                };
            })
    }, [state.reload, state.userid, dispatch]);

    return (
        <div style={{}}>
            {state.allEvents ? (
                <div>
                    {state.allEvents.map(event => {
                        return <EventCard
                            key={event.shortid}
                            id={event.id}
                            event_name={event.event_name}
                            event_utc={event.event_utc}
                            event_location={event.event_location}
                            event_note={event.event_note}
                            event_date_picture={event.event_date_picture}
                            call_utc={event.Call ? event.Call.call_utc : null}
                            call_type={event.Call ? event.Call.call_type : null}
                            callid={event.Call ? event.Call.id : null}
                            active={event.active}
                            shortid={event.shortid}
                        />
                    })}
                </div>
            ) : (<h5 className="m-3"><em>You don't have any events to show.</em></h5>)}
        </div>
    )
};

export default AllEvents