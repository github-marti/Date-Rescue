import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-date-picker';
import FormData from 'form-data';
import Search from '../Search';
import { useStoreContext } from '../../utils/GlobalState'
import API from '../../utils/eventAPI';
import { SET_CURRENT_EVENT, UPDATE_EVENT } from '../../utils/actions';

function CreateEvent() {
    const [state, dispatch] = useStoreContext();
    const [redirect, setRedirect] = useState(false);

    useEffect(() => {
        console.log('state', state);
    }, [redirect]);

    const handleInputChange = event => {
        let name = event.target.name;
        let value = event.target.value;
        dispatch({
            type: UPDATE_EVENT,
            column: name,
            update: value
        });
    };

    const handleDateChange = date => {
        dispatch({
            type: UPDATE_EVENT,
            column: "event_date",
            update: date
        });
    };

    const handleTimeChange = time => {
        dispatch({
            type: UPDATE_EVENT,
            column: "event_time",
            update: time
        });
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        let initialEvent = await API.saveEvent({
            event_name: state.currentEvent.event_name,
            event_date: state.currentEvent.event_date,
            event_time: state.currentEvent.event_time,
            event_location: state.currentEvent.event_location,
            event_note: state.currentEvent.event_note,
        });
        dispatch({
            type: SET_CURRENT_EVENT,
            newEvent: initialEvent.data
        });
        let eventImage = document.getElementById('event_image').files[0];
        let eventid = initialEvent.data.id
        // proceed to save image and update event with image link if image is detected AND initial event data was saved
        if (eventImage && initialEvent.data) {
            let formData = new FormData();
            formData.append("image", eventImage);
            let imageData = await API.saveImage(eventid, formData);
            if (imageData.data) {
                setRedirect(true);
            }
        }
    }

    const renderRedirect = () => {
        if (redirect) {
            return <Redirect to="/event/upcoming" />
        }
    };

    return (
        <div className="App">
            {renderRedirect()}
            <form onSubmit={handleFormSubmit}>
                <input type="text" name="event_name" required onChange={handleInputChange} />
                <br />
                <DatePicker value={state.currentEvent.event_date ? new Date(state.currentEvent.event_date) : null} onChange={handleDateChange} minDate={new Date()} />
                <br />
                <TimePicker onChange={handleTimeChange} disableClock={true} />
                <br />
                <Search handleInputChange={handleInputChange}/>
                <br />
                <textarea name="event_note" onChange={handleInputChange} />
                <br />
                <input type="file" id="event_image" />
                <br />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default CreateEvent;
