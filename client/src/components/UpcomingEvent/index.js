import React, { useEffect } from 'react';
import EventCard from '../EventCard';
import { useStoreContext } from '../../utils/GlobalState';
import API from '../../utils/eventAPI';
import { SET_UPCOMING_EVENT } from '../../utils/actions';

function UpcomingEvent() {
    const [state, dispatch] = useStoreContext();

    return (
        <div>
            {state.upcomingEvent ? (
                <>
                    <EventCard
                        id={state.upcomingEvent.id}
                        event_name={state.upcomingEvent.event_name}
                        event_utc={state.upcomingEvent.event_utc}
                        event_location={state.upcomingEvent.event_location}
                        event_note={state.upcomingEvent.event_note}
                        event_date_picture={state.upcomingEvent.event_date_picture}
                        call_utc={state.upcomingEvent.Call ? state.upcomingEvent.Call.call_utc : null}
                        call_type={state.upcomingEvent.Call ? state.upcomingEvent.Call.call_type : null}
                        callid={state.upcomingEvent.Call ? state.upcomingEvent.Call.id : null}
                        active={state.upcomingEvent.active}
                        shortid={state.upcomingEvent.shortid}
                    />
                </>
            ) : (
                    <h5 className="m-3"><em>You don't have any upcoming events.</em></h5>
                )}
        </div>
    )
}

export default UpcomingEvent;