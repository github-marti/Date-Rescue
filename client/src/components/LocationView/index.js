import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../../utils/GlobalState'
import API from '../../utils/locationAPI';
import LocationForm from "./../LocationForm";
import LocationCard from "./../LocationCard";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';

function ViewCard() {

    const [state, dispatch] = useStoreContext()
    const [likebtn, setLikebtn] = useState(false)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function btnClick() {
        setLikebtn(!likebtn)
    }

    function saveLocation(obj){
        setShow(false)
        API.saveLocation(obj)
    }

    // function handleSearchChange(event) {
    //     console.log(event.target.value);
    //     const filter = event.target.value;
    //     const filteredList = users.users.filter(item => {
    //       // merge data together, then see if user input is anywhere inside
    //       let values = Object.values(item)
    //         .join("")
    //         .toLowerCase();
    //       return values.indexOf(filter.toLowerCase()) !== -1;
    //     });
    //     setUsers({ ...users, filteredUsers: filteredList });
    //   }

    useEffect(() => {
        API.getAllLocations().then(data => {
            dispatch({
                type: "SET_LOCATION",
                locations: data.data
            })
            console.log(data.data)
        })
    }, [likebtn, show])
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
            <Modal isOpen={show} onHide={handleClose}>
                <ModalHeader closeButton>
                </ModalHeader>
                <ModalBody><LocationForm handleClose={handleClose}/></ModalBody>
                <ModalFooter>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </ModalFooter>
            </Modal>

        </div>


    )
}
export default ViewCard;