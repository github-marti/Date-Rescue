import axios from "axios";

export default {
    // Gets all events from a user
    getEvents: function (userid) {
        return axios.get(`/api/users/${userid}/events`);
    },
    // Gets the event with the given id
    getEvent: function (userid, eventid) {
        return axios.get(`/api/users/${userid}/events/${eventid}`);
    },
    // Deletes the post with the given id
    getEventByGUIDt: function (guid) {
        return axios.get(`/events/${guid}`);
    },
    // Saves an event to the database
    saveEvent: function (eventData) {
        return axios.post("/api/events", eventData);
    },
    // Saves image to public/images
    saveImage: function (eventid) {
        return axios.post(`/api/events/${eventid}/images/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    // Updates existing event with given information
    updateEvent: function (eventid) {
        return axios.put(`/api/events/${eventid}`, eventData);
    },
    // Deletes event by id
    deleteEvent: function (eventid) {
        return axios.delete(`/api/events/${eventid}`)
    }
};
