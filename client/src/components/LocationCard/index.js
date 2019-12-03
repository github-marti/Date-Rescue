import React, { useEffect } from 'react';
import API from '../../utils/locationAPI';
import { StoreProvider, useStoreContext } from '../../utils/GlobalState';
import { ADD_LIKE, ADD_DISLIKE } from '../../utils/actions';

function CreateCard(props) {

    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        console.log('state', state);
    }, [state.location]);

    const handleLikeIncrement = event => {
        API.updateLike({likes:state.locations[props.i].location_like, id:state.locations[props.i].id}).then(data=>{
            console.log(data)
            props.click()
        });
        
        event.preventDefault();
    }

    const handleDisLikeIncrement = event => {
        API.updateDisLike({dislikes:state.locations[props.i].location_dislike, id:state.locations[props.i].id}).then(data=>{
            props.click()
        });
        
        event.preventDefault();
    }

    return(
       
        <div>
            <h4>{props.data.location_name}</h4>
            <p>{props.data.location_address}</p>
            <p>{props.data.location_city}, {props.data.location_state}. {props.data.location_zip}</p>
            <p>Does this location offer an angel shot service?  {props.data.angel_shot}</p>
            <button onClick={handleLikeIncrement}><i class="fas fa-thumbs-up"></i>{state.locations[props.i].location_like||0}</button>
            <button onClick={handleDisLikeIncrement}><i class="fas fa-thumbs-down"></i>{state.locations[props.i].location_dislike||0}</button>
        </div>
    )
}
       


export default CreateCard