import React from 'react';
import EventCard from '../EventCard';
import { useStoreContext } from '../../utils/GlobalState';

function UpcomingEvent () {
    const [state, _] = useStoreContext();
    console.log('state', state);

    return (
        <div>
            {state.newEvent ? ( 
                <EventCard 
                event_name={state.newEvent.event_name}
                event_date={state.newEvent.event_date}
                event_time={state.newEvent.event_time}
                event_location={state.newEvent.event_location}
                event_note={state.newEvent.event_note}
                event_date_picture={state.newEvent.event_date_picture}
                formatTime={state.formatTime}
            />
            ) : (
                <p>You don't have any upcoming events.</p>
            )}
        </div>
    )
}

export default UpcomingEvent;