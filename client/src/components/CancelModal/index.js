import React from 'react';
import DatePicker from 'react-date-picker';
import TimePicker from 'react-time-picker';
import Search from '../Search';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { useStoreContext } from '../../utils/GlobalState';

function CancelModal(props) {
    const [state, dispatch] = useStoreContext();

    return (
        <Modal isOpen={props.show}>
            <ModalHeader closeButton>
                <h3>Cancel Date</h3>
            </ModalHeader>
            <ModalBody>
                <p>Ready to cancel your date? If so, click the "Cancel Date" button below and friends will no longer be able to access the link you gave them.</p> 
            </ModalBody>
            <ModalFooter>
                <Button variant="secondary" name="cancel" onClick={props.handleClose}>
                    Go Back
                </Button>
                <Button variant="primary" name="cancel" onClick={props.handleCancel}>
                    Cancel Date
                </Button>
            </ModalFooter>
        </Modal>
    )
};

export default CancelModal;