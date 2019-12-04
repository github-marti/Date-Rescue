import React, { useState } from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import Search from '../Search';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import { useStoreContext } from '../../utils/GlobalState';

function UpdateModal(props) {
    const [state] = useStoreContext();
    const [dropdownOpen, setDropdown] = useState();

    const toggle = () => {
        setDropdown(!dropdownOpen);
    };

    return (
        <Modal isOpen={props.show}>
            <ModalHeader closeButton>
                <h3>Update-a-Date</h3>
            </ModalHeader>
            <ModalBody>
                <input type="text" name="event_name" value={state.newEvent.event_name} required onChange={state.handleInputChange} />
                <br />
                <DatePicker value={new Date(`${state.newEvent.event_date}`)} onChange={state.handleDateChange} minDate={new Date()} />
                <br />
                <TimePicker value={state.newEvent.event_time} onChange={state.handleTimeChange} disableClock={true} />
                <br />
                <textarea name="event_note" value={state.newEvent.event_note} onChange={state.handleInputChange} />
                <br />
                <TimePicker value={state.newEvent.call_time} onChange={state.handleCallTime} disableClock={true} />
                <br />
                <ButtonDropdown isOpen={dropdownOpen} toggle={toggle}>
                    <DropdownToggle caret>
                        {state.newEvent.call_type && state.newEvent.call_type !== '' ? state.newEvent.call_type : "Call Type"}
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem name="call_type" onClick={state.handleInputChange}>Best Friend Breakup</DropdownItem>
                        <DropdownItem divider />
                        <DropdownItem name="call_type" onClick={state.handleInputChange}>Family Emergency</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
                <br />
                <Search handleInputChange={state.handleInputChange} />
                <br />
                <input type="file" id="event_image" />
                <br />
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" name="update" onClick={props.handleClose}>
                    Cancel
                </Button>
                <Button variant="primary" name="update" onClick={props.handleUpdate}>
                    Update
                </Button>
            </ModalFooter>
        </Modal>
    )
};

export default UpdateModal;