import React, { useEffect } from 'react';
import API from '../../utils/eventAPI'

class EventPage extends React.Component {
    state = {
        eventName: "",
        eventDate: "",
        eventTime: "",
        eventLocation: "",
        eventImage: ""
    }

    async componentDidMount() {
        const { shortid } = this.props.match.params;
        let eventData = await API.getEventByShortId(shortid);
        console.log(eventData.data);
    }

    render() {
        return (
            <h1>Public page</h1>
        )
    }

}

export default EventPage;