import React, { useState } from 'react';
import FormData from 'form-data';
import { useStoreContext } from '../../utils/GlobalState'
import API from '../../utils/locationAPI';
import { ADD_LOCATION, ADD_LIKE, ADD_DISLIKE } from '../../utils/actions';

function CreateLocation() {
    const [dispatch] = useStoreContext();

    const [location, setLocation] = useState({
        location_name: "",
        location_address: "",
        location_city: "",
        location_state: "",
        location_zip: "",
        angel_shot: "",
        location_like: 0,
        location_dislike: 0
    })
}

export default CreateLocation;