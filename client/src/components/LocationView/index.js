import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../../utils/GlobalState'
import API from '../../utils/locationAPI';
import LocationForm from "./../LocationForm";
import LocationCard from "./../LocationCard";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function viewCard() {
    const [state, dispatch] = useStoreContext()
    const [likebtn, setLikebtn] = useState(false)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function btnClick() {
        setLikebtn(!likebtn)
    }

    useEffect(() => {
        API.getAllLocations().then(data => {
            dispatch({
                type: "SET_LOCATION",
                locations: data.data
            })
            console.log(data.data)
        })
    }, [likebtn])
    return (
        <div>
            <nav class="navbar navbar-light bg-light">
                <a class="navbar-brand">Have a recommendation that is not listed? Click<Button onClick={handleShow}>here</Button>to add one.</a>
                <form class="form-inline">
                    <input class="form-control mr-sm-2" type="search" placeholder="Search By City" aria-label="Search" />
                    <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </nav>

            {state.locations ? state.locations.map((location, i) => {
                return <LocationCard click={btnClick} data={location} i={i}></LocationCard>
            }) : ""}

            <Modal show={show} onHide={handleClose}>
                <ModalHeader closeButton>
                </ModalHeader>
                <ModalBody><LocationForm /></ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
          </Button>
                    <Button variant="primary" onClick={handleClose}>
                        Save
          </Button>
                </ModalFooter>
            </Modal>

        </div>


    )
}
export default viewCard;