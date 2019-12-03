import React,{ useEffect, useState } from 'react';
import {useStoreContext} from '../../utils/GlobalState'
import API from '../../utils/locationAPI';
import LocationForm from "./../LocationForm"
import LocationCard from "./../LocationCard"

function viewCard() {
    const [ state, dispatch] = useStoreContext()
    const [likebtn, setLikebtn] = useState(false)

    function btnClick(){
        setLikebtn(!likebtn)
    }

    useEffect(() => {
        API.getAllLocations().then(data => {
            dispatch({
                type: "SET_LOCATION",
                locations: data.data
            })
            console.log(data.data)
        })
    },[likebtn])
    return (
        <div>
           {state.locations? state.locations.map((location, i)=>{
               return <LocationCard click={btnClick} data={location} i={i}></LocationCard>
           }): ""}
            
            <LocationForm />
        </div>

        
    )
}
export default viewCard;