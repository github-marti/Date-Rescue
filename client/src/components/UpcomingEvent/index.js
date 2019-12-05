import React, { useEffect } from 'react';
import EventCard from '../EventCard';
import { useStoreContext } from '../../utils/GlobalState';
import API from '../../utils/eventAPI';
import { SET_UPCOMING_EVENT } from '../../utils/actions';

function UpcomingEvent() {
    const [state, dispatch] = useStoreContext();
    console.log('state', state);

    useEffect(() => {
        API.getEvents(state.userid)
            .then(results => {
                console.log("RESULTS UPCOMING", results.data);
                if (results.data) {
                    let upcomingEvents = results.data.filter(el => el.active && (Date.parse(`${el.event_date}T${el.event_time}`) + 10800000) > Date.parse(new Date()));
                    console.log('show upcoming event', upcomingEvents[0])
                    dispatch({
                        type: SET_UPCOMING_EVENT,
                        event: upcomingEvents[0]
                    });
                };
            });
    }, [state.reload]);

    return (
        <div>
            {state.upcomingEvent ? (
                <>
                    <EventCard
                        id={state.upcomingEvent.id}
                        event_name={state.upcomingEvent.event_name}
                        event_date={state.upcomingEvent.event_date}
                        event_time={state.upcomingEvent.event_time}
                        event_location={state.upcomingEvent.event_location}
                        event_note={state.upcomingEvent.event_note}
                        event_date_picture={state.upcomingEvent.event_date_picture}
                        call_time={state.upcomingEvent.Call ? state.upcomingEvent.Call.call_time : null}
                        call_type={state.upcomingEvent.Call ? state.upcomingEvent.Call.call_type : null}
                        callid={state.upcomingEvent.Call ? state.upcomingEvent.Call.id : null}
                        active={state.upcomingEvent.active}
                        shortid={state.upcomingEvent.shortid}
                    />
                </>
            ) : (
                    <p>You don't have any upcoming events.</p>
                )}
        </div>
    )
}

export default UpcomingEvent;