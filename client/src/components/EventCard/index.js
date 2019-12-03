import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import CopyLink from '../CopyLink';
import UpdateModal from '../UpdateModal';
import CancelModal from '../CancelModal';
import { Card, CardBody } from 'reactstrap';
import { useStoreContext } from '../../utils/GlobalState';
import { SET_NEW_EVENT, SET_RELOAD } from '../../utils/actions';
import API from '../../utils/eventAPI';

function EventCard(props) {
    const [state, dispatch] = useStoreContext();
    const [updateShow, setUpdateShow] = useState(false);
    const [cancelShow, setCancelShow] = useState(false);

    const handleShow = event => {
        let name = event.target.name;
        if (name === 'update') {
            dispatch({
                type: SET_NEW_EVENT,
                newEvent: {
                    event_name: props.event_name,
                    event_date: props.event_date,
                    event_time: props.event_time,
                    event_location: props.event_location,
                    event_note: props.event_note
                }
            });
            setUpdateShow(true);
        } else {
            setCancelShow(true);
        }
    };

    const handleClose = event => {
        let name = event.target.name;
        if (name === 'update') {
            setUpdateShow(false);
        } else {
            setCancelShow(false);
        }
    };

    const handleUpdate = async event => {
        try {
            event.preventDefault();
            let eventData = state.newEvent
            let eventImage = document.getElementById('event_image').files[0];
            let updatedEvent = await API.updateEvent(props.id, eventData);
            console.log('eventData', updatedEvent);
            if (eventImage && updatedEvent.data) {
                console.log('image detected');
                let formData = new FormData();
                formData.append("image", eventImage);
                let updatedImage = API.saveImage(props.id, formData);
                API.updateEvent(props.id, { event_date_picture: updatedImage.data })
            };
            dispatch({
                type: SET_RELOAD
            });
            setUpdateShow(false);
        } catch {
            console.log('update unsuccessful');
        };     
    };

    const handleCancel = event => {
        event.preventDefault();
        API.cancelEvent(props.id)
            .then(results => {
                console.log(results);
                setCancelShow(false);
                dispatch({
                    type: SET_RELOAD
                });
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <>
            {props.event_name ? (
                <Card>
                    <CardBody>
                        {!props.active ? (<h4>CANCELED</h4>) : (<></>)}
                        <h4>{props.event_name}</h4>
                        <p>
                            <Moment date={props.event_date} format="MMMM Do YYYY" />
                        </p>
                        <p>
                            {state.formatTime(props.event_time)}
                        </p>
                        <p>{props.event_location}</p>
                        <p>{props.event_note}</p>
                        <p><img width="100px" src={props.event_date_picture}></img></p>
                        {Date.parse(`${props.event_date.split('T')[0]}T${props.event_time}`) > new Date() && props.active ? (
                            <div>
                                <CopyLink shortid={props.shortid} />
                                <button name="update" onClick={handleShow}>Update Date</button>
                                <button name="cancel" onClick={handleShow}>Cancel Date</button>
                            </div>
                        ) : (<p></p>)}
                        <UpdateModal
                            show={updateShow}
                            event_name={props.event_name}
                            event_date={props.event_date}
                            event_time={props.event_time}
                            event_location={props.event_location}
                            event_note={props.event_note}
                            handleClose={handleClose}
                            handleUpdate={handleUpdate}
                        />
                        <CancelModal
                            show={cancelShow}
                            handleClose={handleClose}
                            handleCancel={handleCancel}
                        />
                    </CardBody>
                </Card>
            ) : (<p>You don't have any events yet.</p>)
            }
        </>
    )
}

export default EventCard