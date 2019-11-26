import React from 'react';
import ReactDOM from 'react-dom';
import { Form, FormGroup, Label, Input, FormText } from 'reactstrap';

const HomePage = function() {
    return (
        <FormGroup>
        <Label for="exampleDate">Date</Label>
        <Input
          type="date"
          name="date"
          id="exampleDate"
          placeholder="date placeholder"
        />
      </FormGroup>
      <FormGroup>
        <Label for="exampleTime">Time</Label>
        <Input
          type="time"
          name="time"
          id="exampleTime"
          placeholder="time placeholder"
        />
      </FormGroup>
    );
}
    
export default HomePage;
