import React, { useEffect, useState } from 'react';
import TimePicker from 'react-time-picker';
import DatePicker from 'react-date-picker';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import FormData from 'form-data';
import Search from '../Search';
import EventModal from '../EventModal';
import { useStoreContext } from '../../utils/GlobalState';
import API from '../../utils/eventAPI';
import { SET_NEW_EVENT, UPDATE_EVENT, UPDATE_ACTIVE } from '../../utils/actions';

function CreateEvent() {
    const [state, dispatch] = useStoreContext();
    const [show, setShow] = useState(false);
    const [dropdownOpen, setDropdown] = useState(false);

    useEffect(() => {
        console.log('state', state);
    }, [state.active, show]);

    const handleClose = () => {
        setShow(false);
        dispatch({
            type: UPDATE_ACTIVE,
            active: 'upcoming'
        })
    }

    const toggle = () => {
        setDropdown(!dropdownOpen);
    };

    const handleFormSubmit = async event => {
        console.log("EVENT DATE ON SUBMIT", state.newEvent.event_date);
        event.preventDefault();
        let initialEvent = await API.saveEvent({
            event_name: state.newEvent.event_name,
            event_date: state.newEvent.event_date,
            event_time: state.newEvent.event_time,
            event_location: state.newEvent.event_location,
            event_note: state.newEvent.event_note,
        });
        dispatch({
            type: SET_NEW_EVENT,
            newEvent: initialEvent.data
        });
        let eventImage = document.getElementById('event_image').files[0];
        let eventid = initialEvent.data.id
        // proceed to save call if user selected to receive a call
        if (state.newEvent.call_time) {
            API.saveCall(eventid, {
                call_time: state.newEvent.call_time,
                call_type: state.newEvent.call_type
            })
        };
        // proceed to save image and update event with image link if image is detected AND initial event data was saved
        if (eventImage && initialEvent.data) {
            let formData = new FormData();
            formData.append("image", eventImage);
            let imageData = await API.saveImage(eventid, formData);
            dispatch({
                type: UPDATE_EVENT,
                column: "event_date_picture",
                update: imageData.data
            });
        };

        //proceed to show modal if event save was successful
        if (initialEvent.data) {
            setShow(true);
        } else {
            console.log('error in saving event');
        };
    };

    return (
        <div className="App">

            <input type="text" name="event_name" required onChange={state.handleInputChange} />
            <br />
            <DatePicker value={state.newEvent && state.newEvent.event_date ? new Date(state.newEvent.event_date) : null} onChange={state.handleDateChange} minDate={new Date()} />
            <br />
            <TimePicker onChange={state.handleTimeChange} disableClock={true} />
            <br />
            <Search />
            <br />
            <textarea name="event_note" onChange={state.handleInputChange} />
            <br />
            <TimePicker onChange={state.handleCallTime} disableClock={true} />
            <br />
            <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    {state.newEvent ? state.newEvent.call_type : "Call Type"}
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem name="call_type" onClick={state.handleInputChange}>Best Friend Breakup</DropdownItem>
                    <DropdownItem divider />
                    <DropdownItem name="call_type" onClick={state.handleInputChange}>Family Emergency</DropdownItem>
                </DropdownMenu>
            </ButtonDropdown>
            <br />
            <input type="file" id="event_image" />
            <br />
            <button onClick={handleFormSubmit}>Submit</button>
            <EventModal show={show} handleClose={handleClose} />

        </div>
    );
}

export default CreateEvent;
