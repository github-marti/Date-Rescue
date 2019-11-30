import React from 'react';
import CopyLink from '../CopyLink';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function EventModal (props) {
    console.log(props.show);

    return (
        <Modal isOpen={props.show} onHide={props.handleClose}>
            <ModalHeader closeButton>
                <h3>Date Saved</h3>
            </ModalHeader>
            <ModalBody>
                <p>Your date has been successfully saved!</p>
                <p>Here is your unique date page link that you can share with friends.</p>
                <CopyLink />
            </ModalBody>
            <ModalFooter>
                <Button variant="primary" onClick={props.handleClose}>
                    Got it!
          </Button>
            </ModalFooter>
        </Modal>
    )
};

export default EventModal;