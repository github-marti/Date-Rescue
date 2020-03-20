import React, { useState, useEffect } from 'react';
import Moment from 'react-moment';
import CopyLink from '../CopyLink';
import UpdateModal from '../UpdateModal';
import CancelModal from '../CancelModal';
import { Card, CardBody } from 'reactstrap';
import { useStoreContext } from '../../utils/GlobalState';
import { SET_NEW_EVENT, SET_RELOAD } from '../../utils/actions';
import API from '../../utils/eventAPI';
import './style.css';

function EventCard(props) {
    const [state, dispatch] = useStoreContext();
    const [updateShow, setUpdateShow] = useState(false);
    const [cancelShow, setCancelShow] = useState(false);

    useEffect(() => {

    }, [state.reload]);

    const handleShow = event => {
        let name = event.target.name;
        if (name === 'update') {
            dispatch({
                type: SET_NEW_EVENT,
                upcomingEvent: {
                    event_name: props.event_name,
                    event_utc: props.event_utc,
                    event_location: props.event_location,
                    event_note: props.event_note,
                    call_utc: props.call_utc,
                    call_type: props.call_type
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
            let eventData = {
                event_utc: state.upcomingEvent.event_utc,
                event_location: state.upcomingEvent.event_location,
                event_name: state.upcomingEvent.event_name,
                event_note: state.upcomingEvent.event_note
            };
            let eventImage = document.getElementById('event_image').files[0];
            let updatedEvent = await API.updateEvent(props.id, eventData);
            if (state.upcomingEvent.call_utc || state.upcomingEvent.call_type) {
                if (props.call_utc) {
                    API.updateCall(props.id, props.callid, {
                        call_utc: state.upcomingEvent.call_utc,
                        call_type: state.upcomingEvent.call_type
                    })
                } else {
                    API.saveCall(props.id, {
                        call_utc: state.upcomingEvent.call_utc,
                        call_type: state.upcomingEvent.call_type
                    })
                };
            };
            if (eventImage && updatedEvent.data) {
                let formData = new FormData();
                formData.append("image", eventImage);
                let updatedImage = API.saveImage(props.id, formData);
                API.updateEvent(props.id, { event_date_picture: updatedImage.data })
            };
            dispatch({
                type: SET_RELOAD
            });
            setUpdateShow(false);
        } catch (err) {
            console.log(err);
        };
    };

    const handleCancel = event => {
        event.preventDefault();
        API.cancelEvent(props.id)
            .then(() => {
                API.cancelCall(props.id, props.callid)
                    .then(() => {
                        setCancelShow(false);
                        dispatch({
                            type: SET_RELOAD
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    })
            })
            .catch(err => {
                console.log(err);
            });
    };

    const cancelCall = () => {
        API.cancelCall(props.id, props.callid)
            .then(() => {
                setCancelShow(false);
                dispatch({
                    type: SET_RELOAD
                })
            })
            .catch(err => {
                console.log(err);
            });
    };

    return (
        <>
            {props.event_name ? (
                <Card>
                    <CardBody>
                        {!props.active ? (<h4 className="canceled">CANCELED</h4>) : (<></>)}
                        <h4 className="font-weight-bold">{props.event_name}</h4>
                        <p>
                            <Moment date={props.event_utc} format="MMMM Do YYYY" />
                        </p>
                        <p>
                            Time goes here
                        </p>
                        <p>{props.event_location}</p>
                        <iframe title="google-maps" width="300" height="100" frameBorder="0"
                            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${props.event_location}`} allowFullScreen></iframe>
                        <p><span className="font-weight-bold">Notes: </span>{props.event_note}</p>
                        {props.call_utc ?
                            (<div className="call-container">
                                <p className="font-weight-bold">Scheduled Call</p>
                                <p>Call time: {state.formatTime(props.call_utc)}</p>
                                <p>Call type: {props.call_type}</p>
                            </div>) :
                            <p>You don't have a call scheduled.</p>}
                        <p><img width="200px" src={props.event_date_picture} alt="date"></img></p>
                        {(props.event_utc + 10800000) > new Date() && props.active ? (
                            <div>
                                <CopyLink shortid={props.shortid} />
                                <button className="btn btn-primary" name="update" onClick={handleShow}>Update Date</button>
                                {props.call_utc ? (<button className="btn btn-secondary" onClick={cancelCall}>Cancel Call</button>)
                                    : <></>}
                                <button className="btn btn-secondary" name="cancel" onClick={handleShow}>Cancel Date</button>
                            </div>
                        ) : (<p></p>)}
                        <UpdateModal
                            show={updateShow}
                            event_name={props.event_name}
                            event_utc={props.event_utc}
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