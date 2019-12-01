import React, { useEffect } from 'react';
import EventTab from '../EventTab';
import UpcomingEvent from '../UpcomingEvent';
import CreateEvent from '../CreateEvent';
import AllEvents from '../AllEvents';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_ACTIVE } from '../../utils/actions';

function Events() {
    const [state, dispatch] = useStoreContext();

    const handleClick = (event) => {
        let name = event.target.name;
        dispatch({
            type: UPDATE_ACTIVE,
            active: name
        });
    }

    return (
        <div>
            <EventTab handleClick={handleClick} />
            <div className="events-container">
                {state.active === 'upcoming' ? (
                    <UpcomingEvent />
                ) : state.active === 'create' ? (
                    <CreateEvent handleClick={handleClick}/>
                ) : state.active === 'all' ? (
                    <AllEvents />
                ) : (<UpcomingEvent />)}
            </div>
        </div>
    )
};

export default Events;