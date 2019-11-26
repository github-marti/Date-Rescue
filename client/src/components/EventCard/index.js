import React from 'react';
import Moment from 'react-moment';
import { Card, CardBody } from 'reactstrap';

function EventCard (props) {

    return (
        <Card>
            <CardBody>
            <h4>{props.event_name}</h4>
            <p>
                <Moment date={props.event_date} format="MMMM Do YYYY"/>
            </p>
            <p>
                {props.formatTime(props.event_time)}
            </p>
            <p>{props.event_location}</p>
            <p>{props.event_note}</p>
            <p><img width="100px" src={props.event_date_picture}></img></p>
            </CardBody>
        </Card>
    )
}

export default EventCard