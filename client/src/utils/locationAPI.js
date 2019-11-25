import axios from "axios";

app.get("/api/locations", locationsController.findAll);
    app.get("/api/locations/:id?location_city=", locationsController.filter)
    app.post("/api/locations", locationsController.create);
    app.put("/api/locations/:id?like=", locationsController.update);
    app.put("/api/locations/:id?dislike=", locationsController.update);

export default {
    // Gets all locations
    getLocation: function (locationid) {
        return axios.get(`/api/locations/${locationid}`);
    },
    // Gets the location with the given id that will filter city name
    getFilterLocation: function (locationid, location_city) {
        return axios.get(`/api/locations/:${locationid}?${location_city}=`);
    },
    // Saves an event to the database
    saveLocation: function (eventData) {
        return axios.post("/api/events", eventData);
    },
    // Saves image to public/images
    saveImage: function (eventid, formData) {
        return axios.post(`/api/events/${eventid}/images/upload`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    // Updates existing event with given information
    updateEvent: function (eventid, eventData) {
        return axios.put(`/api/events/${eventid}`, eventData);
    },
    // Deletes event by id
    deleteEvent: function (eventid) {
        return axios.delete(`/api/events/${eventid}`)
    }
};