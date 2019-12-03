import React from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import Search from '../Search';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useStoreContext } from '../../utils/GlobalState';

function UpdateModal(props) {
    const [state, dispatch] = useStoreContext();

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
                <Search handleInputChange={state.handleInputChange} />
                <br />
                <textarea name="event_note" value={state.newEvent.event_note} onChange={state.handleInputChange} />
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