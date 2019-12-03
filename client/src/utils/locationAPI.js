import axios from "axios";

export default {
    // Gets all locations
    getLocation: function (locationid) {
        return axios.get(`/api/locations/${locationid}`);
    },
    // Gets the location with the given id that will filter city name
    getFilterLocation: function (locationid, location_city) {
        return axios.get(`/api/locations/:${locationid}?${location_city}=`);
    },
    // Saves the location to the database
    saveLocation: function (locationData) {
        return axios.post("/api/locations", locationData);
    },
    // Updates like with given information
    updateLike: function (locationid, likeData) {
        return axios.put(`/api/locations/:${locationid}?${likeData}=`);
    },
    // Updates dislike with given information
    updateDisLike: function (locationid, disLikeData) {
        return axios.put(`/api/locations/:${locationid}?${disLikeData}=`);
    }
};