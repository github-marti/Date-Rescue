import React from 'react';
import Script from 'react-load-script';
import { UPDATE_EVENT } from '../../utils/actions';
import { useStoreContext } from '../../utils/GlobalState';

function Search(props) {

  const [state, dispatch] = useStoreContext();

  const handleScriptLoad = () => {
    /*global google*/ // To disable any eslint 'google not defined' errors
    state.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('autocomplete')
    );
    state.autocomplete.setFields(['formatted_address', 'name']);
    state.autocomplete.addListener('place_changed', handlePlaceSelect);
  };

  const handlePlaceSelect = () => {
    const addressObject = state.autocomplete.getPlace();
    const address = addressObject.formatted_address;
    if (address) {
      dispatch({
        type: UPDATE_EVENT,
        column: 'event_location',
        update: `${addressObject.name}, ${address}`
      });
    };
  };

  return (
    <div>
      <Script
        url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`}
        onLoad={handleScriptLoad}
      />
      <input id="autocomplete" name="event_location" onChange={props.handleInputChange} />
      <br />
      <iframe
        width="300"
        height="300"
        frameborder="0"
        src={state.currentEvent.event_location ?
          `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${state.currentEvent.event_location}`
          : `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=Los+Angeles`}
        allowfullscreen>
      </iframe>
    </div>
  );
}

export default Search;