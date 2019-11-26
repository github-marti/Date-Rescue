import React, { useEffect } from 'react';
import { useStoreContext } from '../../utils/GlobalState';
import API from '../../utils/eventAPI';
import EventCard from '../EventCard';
import { SET_PAST_EVENTS } from '../../utils/actions';

function PastEvents() {
    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        API.getEvents(1)
            .then(results => {
                console.log(results.data);
                dispatch({
                    type: SET_PAST_EVENTS,
                    pastEvents: results.data.slice(1)
                })
            })
    }, []);

    const formatTime = time => {
        let hour = time.split(':')[0];
        if (hour.charAt(0) === '0') {
            hour = hour.substring(1);
        }
        let minutes = time.split(':')[1];
        return hour > 12 ? `${(hour - 12)}:${minutes} PM` : `${hour}:${minutes} AM`;
    }

    return (
        <div>
            {state.pastEvents.map(event => {
                return <EventCard 
                key={event.shortid} 
                event_name={event.event_name}
                event_date={event.event_date}
                event_time={event.event_time}
                event_location={event.event_location}
                event_note={event.event_note}
                event_date_picture={event.event_date_picture}
                formatTime={formatTime}
                />
            })}
        </div>
    )
};

export default PastEvents