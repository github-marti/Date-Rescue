import React, { useEffect } from 'react';
import EventCard from '../EventCard';
import { useStoreContext } from '../../utils/GlobalState';
import API from '../../utils/eventAPI';
import { SET_UPCOMING_EVENT } from '../../utils/actions';

function UpcomingEvent () {
    const [state, dispatch] = useStoreContext();
    console.log('state', state);

    useEffect(() => {
        API.getEvents(state.userid)
        .then(results => {
            let upcomingEvents = results.data.filter(el => Date.parse(`${el.event_date}T${el.event_time}`) > new Date());
            console.log(upcomingEvents[0])
            dispatch({
                type: SET_UPCOMING_EVENT,
                event: upcomingEvents[0]
            });
        });
    }, [])

    return (
        <div>
            {state.upcomingEvent ? ( 
                <EventCard 
                event_name={state.upcomingEvent.event_name}
                event_date={state.upcomingEvent.event_date}
                event_time={state.upcomingEvent.event_time}
                event_location={state.upcomingEvent.event_location}
                event_note={state.upcomingEvent.event_note}
                event_date_picture={state.upcomingEvent.event_date_picture}
                shortid={state.upcomingEvent.shortid}
            />
            ) : (
                <p>You don't have any upcoming events.</p>
            )}
        </div>
    )
}

export default UpcomingEvent;