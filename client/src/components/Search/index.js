import React, { Component } from 'react';
import Script from 'react-load-script';

class Search extends Component {

  render() {
    return (
      <div>
        <Script
          url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_API_KEY}&libraries=places`}
          onLoad={this.props.handleScriptLoad}
        />
        <input id="autocomplete" name="event_location" onChange={this.props.handleInputChange} />
        <br />
        <iframe
          width="300"
          height="300"
          frameborder="0"
          src={this.props.location ? 
          `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=${this.props.location}` 
          : `https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_API_KEY}&q=Los+Angeles`} 
          allowfullscreen>
        </iframe>
      </div>
    );
  }
}

export default Search;