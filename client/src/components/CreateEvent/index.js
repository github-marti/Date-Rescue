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
    const dateRef = useRef();
    const timeRef = useRef();
    const locationRef = useRef();

    console.log('state', state);

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

    const handleFormSubmit = event => {
        event.preventDefault();
        API.saveEvent({
            event_name: nameRef.current.value,
            event_date: state.currentEvent.event_date,
            event_time: state.currentEvent.event_time,
            event_location: locationRef.current.value
        })
            .then(results => {
                console.log('results', results);
                let eventid = results.data.id;
                let eventImage = document.getElementById('event_image').files[0];
                if (eventImage) {
                    let formData = new FormData();
                    formData.append("image", eventImage);
                    API.saveImage(eventid, formData)
                        .then(results => {
                            console.log('results', results);
                            let filePath = results.data.filepath;
                            console.log("filepath", filePath);
                            API.updateEvent({ event_date_picture: filePath })
                                .then(results => {
                                    dispatch({
                                        type: SET_CURRENT_EVENT,
                                        newEvent: results.data
                                    });
                                });
                        });
                } else {
                    console.log('no image selected');
                    console.log(results);
                    dispatch({
                        type: SET_CURRENT_EVENT,
                        newEvent: results.data
                    })
                }
            });
    }

    return (
        <div className="App">
            <form onSubmit={handleFormSubmit}>
                <input type="text" required ref={nameRef} />
                <br />
                <DatePicker ref={dateRef} value={state.currentEvent.event_date ? new Date(state.currentEvent.event_date) : null} onChange={handleDateChange}/>
                <br />
                <TimePicker ref={timeRef} onChange={handleTimeChange}/>
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
