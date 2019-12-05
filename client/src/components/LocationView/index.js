import React, { useEffect, useState } from 'react';
import { useStoreContext } from '../../utils/GlobalState'
import API from '../../utils/locationAPI';
import LocationForm from "./../LocationForm";
import LocationCard from "./../LocationCard";
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import "./style.css";

function ViewCard() {

    const [state, dispatch] = useStoreContext()
    const [likebtn, setLikebtn] = useState(false)
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [location, setLocation] = useState([]);

    function btnClick() {
        setLikebtn(!likebtn)
    }

    function saveLocation(obj){
        setShow(false)
        API.saveLocation(obj)
    }

    function handleSearchChange(event) {
        console.log(event.target.value);
        console.log("this is state: ", state )
        const filter = event.target.value;
        const filteredList = state.locations.filter(location => {
            let values = Object.values(location)
        .join("")
        .toLowerCase();
        return values.indexOf(filter.toLowerCase()) !== -1;
        });
        console.log(filteredList)
        setLocation(filteredList);
        event.preventDefault();   
    }
      

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
        <div id="bgi">
            <nav className="navbar navbar-light" id="nav">
                <a className="navbar-brand" id="text">Have a recommendation that is not listed? Click<Button onClick={handleShow} id="link">here</Button>to add one.</a>
                <form className="form-inline">
                    <input className="form-control mr-sm-2" type="search" placeholder="Search By City" aria-label="Search" onChange={e => handleSearchChange(e)} />
                </form>
            </nav>
            <div id="card">
            {location.length ? location.map((location, i) => {
                return <LocationCard click={btnClick} data={location} i={i}></LocationCard>
            }) : state.locations ? state.locations.map((location, i) => {
                return <LocationCard click={btnClick} data={location} i={i}></LocationCard>
            }) : ""}
            </div>
            <Modal isOpen={show} onHide={handleClose}>
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