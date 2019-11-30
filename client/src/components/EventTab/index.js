import React from "react";
import "./style.css"

function EventTab(props) {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <button className="nav-link active" name="upcoming" onClick={props.handleClick}>Upcoming Date</button>
      </li>
      <li className="nav-item">
        <button className="nav-link" name="create" onClick={props.handleClick}>Create-a-Date</button>
      </li>
      <li className="nav-item">
        <button className="nav-link" name="all" onClick={props.handleClick}>View All Dates</button>
      </li>
    </ul>
  );
}

export default EventTab;
