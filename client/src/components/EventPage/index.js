import React from 'react';
import API from '../../utils/eventAPI'

class EventPage extends React.Component {
    state = {
        event_name: "",
        event_date: "",
        event_time: "",
        event_location: "",
        event_date_picture: ""
    }

    async componentDidMount() {
        const { shortid } = this.props.match.params;
        let eventData = await API.getEventByShortId(shortid);
        console.log(eventData.data);
        this.setState({
            event_name: eventData.data.event_name,
            event_date: eventData.data.event_date,
            event_time: eventData.data.event_time,
            event_location: eventData.data.event_location,
            event_date_picture: eventData.data.event_date_picture
        })
    }

    render() {
        return (
            <div>
                <h1>Public Event Page</h1>
                <p>Date: {this.state.event_date}</p>
                <p>Time: {this.state.event_time}</p>
                <p>Location: {this.state.event_location}</p>
                <iframe width="300" height="200" frameborder="0"
                    src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${this.state.event_location}`} allowfullscreen></iframe>
                <p><img width="200" src={this.state.event_date_picture}></img></p>
            </div>
        )
    }

}

export default EventPage;