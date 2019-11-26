import React from 'react';
import EventCard from '../EventCard';
import { useStoreContext } from '../../utils/GlobalState';

function UpcomingEvent () {
    const [state, _] = useStoreContext();
    console.log('state', state);

    return (
        <div>
            <EventCard 
            event_name={state.currentEvent.event_name}
            event_date={state.currentEvent.event_date}
            event_time={state.currentEvent.event_time}
            event_location={state.currentEvent.event_location}
            event_note={state.currentEvent.event_note}
            event_date_picture={state.currentEvent.event_date_picture}
            formatTime={state.formatTime}
            />
        </div>
    )
}

export default UpcomingEvent;