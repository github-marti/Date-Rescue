import React from 'react';
import Moment from 'react-moment';
import CopyLink from '../CopyLink';
import { Card, CardBody } from 'reactstrap';
import { useStoreContext } from '../../utils/GlobalState';

function EventCard(props) {
    const [state, _] = useStoreContext();

    return (
        <>
            {props.event_name ? (
                <Card>
                    <CardBody>
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
                        {Date.parse(`${props.event_date}T${props.event_time}`) > new Date() ? (
                            <div>
                                <CopyLink shortid={props.shortid}/>
                                <button>Update Date</button>
                                <button>Delete Date</button>
                            </div>
                        ) : (<p></p>)}
                    </CardBody>
                </Card>
            ) : (<p>You don't have any events yet.</p>)
            }
        </>
    )
}

export default EventCard