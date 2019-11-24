import React, { useState, useEffect, useRef } from 'react';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-date-picker';
import FormData from 'form-data';
import { useStoreContext } from '../../utils/GlobalState'
import API from '../../utils/eventAPI';
import { SET_CURRENT_EVENT, UPDATE_EVENT } from '../../utils/actions';

function CreateEvent() {

    const [state, dispatch] = useStoreContext();
    const nameRef = useRef();
    const locationRef = useRef();

    const handleDateChange = date => {
        dispatch({
            type: UPDATE_EVENT,
            column: "event_date",
            update: date
        })
    };

    const handleTimeChange = time => {
        dispatch({
            type: UPDATE_EVENT,
            column: "event_time",
            update: time
        })
    };

    const handleFormSubmit = async event => {
        event.preventDefault();
        let initialEvent = await API.saveEvent({
            event_name: nameRef.current.value,
            event_date: state.currentEvent.event_date,
            event_time: state.currentEvent.event_time,
            event_location: locationRef.current.value
        });
        dispatch({
            type: SET_CURRENT_EVENT,
            newEvent: initialEvent.data
        });
        let eventImage = document.getElementById('event_image').files[0];
        let eventid = initialEvent.data.id
        // proceed to save image and update event with image link if image is detected
        if (eventImage) {
            let formData = new FormData();
            formData.append("image", eventImage);
            let imageData = await API.saveImage(eventid, formData);
            console.log(imageData);
        }
    }

    return (
        <div className="App">
            <form onSubmit={handleFormSubmit}>
                <input type="text" required ref={nameRef} />
                <br />
                <DatePicker value={state.currentEvent.event_date ? new Date(state.currentEvent.event_date) : null} onChange={handleDateChange} minDate={new Date()}/>
                <br />
                <TimePicker onChange={handleTimeChange} disableClock={true}/>
                <br />
                <input type="text" required ref={locationRef} />
                <br />
                <input type="file" id="event_image" />
                <br />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
}

export default CreateEvent;
