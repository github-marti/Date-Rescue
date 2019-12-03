import React from 'react';
import Moment from 'react-moment';
import API from '../../utils/eventAPI';

class EventPage extends React.Component {
    state = {
        event_name: "",
        event_date: "",
        event_time: "",
        event_location: "",
        event_note: "",
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
            event_note: eventData.data.event_note,
            event_date_picture: eventData.data.event_date_picture
        })
    }

    formatTime = time => {
        let hour = time.split(':')[0];
        if (hour.charAt(0) === '0') {
            hour = hour.substring(1);
        }
        let minutes = time.split(':')[1];
        return hour > 12 ? `${(hour - 12)}:${minutes} PM` : `${hour}:${minutes} AM`;
    };

    render() {
        if (this.state.event_name) {
            return (
                <div>
                    <h4>Public Event Page</h4>
                    <p>Date: <Moment date={this.state.event_date} format="MMMM Do YYYY" /></p>
                    <p>Time: {this.formatTime(this.state.event_time)}</p>
                    <p>Location: {this.state.event_location}</p>
                    <p>Note: {this.state.event_note}</p>
                    <iframe width="300" height="200" frameBorder="0"
                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${this.state.event_location}`} allowFullScreen></iframe>
                    <p><img width="200" src={this.state.event_date_picture}></img></p>
                </div>
            )
        } else {
            return (
                <div>
                    <h1>Sorry, this event address is either invalid or has expired.</h1>
                    <h3>If you think there's been some sort of mistake, ask your friend to resend their unique event address,
                    or if this is your event, login to Date Rescue and double-check the address is correct.</h3>
                </div>
            )
        }
    }

}

export default EventPage;