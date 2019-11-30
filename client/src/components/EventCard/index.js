import React from 'react';
import Moment from 'react-moment';
import { Card, CardBody } from 'reactstrap';

function EventCard(props) {

    const formatTime = time => {
        let hour = time.split(':')[0];
        if (hour.charAt(0) === '0') {
            hour = hour.substring(1);
        }
        let minutes = time.split(':')[1];
        return hour > 12 ? `${(hour - 12)}:${minutes} PM` : `${hour}:${minutes} AM`;
    };

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
                            {formatTime(props.event_time)}
                        </p>
                        <p>{props.event_location}</p>
                        <p>{props.event_note}</p>
                        <p><img width="100px" src={props.event_date_picture}></img></p>
                        {Date.parse(`${props.event_date}T${props.event_time}`) > new Date() ? (
                            <div>
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