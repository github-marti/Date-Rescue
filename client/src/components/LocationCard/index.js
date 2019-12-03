import React, { useEffect } from 'react';
import API from '../../utils/locationAPI';
import { StoreProvider, useStoreContext } from '../../utils/GlobalState';
import { ADD_LIKE, ADD_DISLIKE } from '../../utils/actions';

function CreateCard() {

    const [state, dispatch] = useStoreContext();

    useEffect(() => {
        console.log('state', state);
    }, [state.location]);

    const handleLikeIncrement = event => {

        dispatch({type:ADD_LIKE})
        API.updateLike();
        event.preventDefault();
    }

    const handleDisLikeIncrement = event => {
        dispatch({type:ADD_DISLIKE})
        API.updateDisLike();
        event.preventDefault();
    }

    return(
        <div>
            {/* {state.location.map(location,i=>{
                <Card data={location:location, i:i}></Card>
            })} */}
        <button onClick={handleLikeIncrement}>{state.locations.likes}</button>
        <button onClick={handleDisLikeIncrement}>{state.locations.dislikes}</button>
        </div>
    )
}

export default CreateCard