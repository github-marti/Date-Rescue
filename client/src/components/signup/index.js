import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Col, Form, FormGroup, Label, Input, Button,} from 'reactstrap';
import "./style.css";

const SignUp = function () {
    return (
        <body className="bcg">
        <Container className="signUp">
          <row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
        <Form className="form">
          <Col>
          <h2>Sign Up</h2>
            <FormGroup>
              <Label>Name</Label>
              <Input
                type="name"
                name="clientName"
                id="name"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="username"
                name="username"
                id="username"
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
              />
            </FormGroup>
            <FormGroup>
              <Label>Phone Number</Label>
              <Input
                type="number"
                name="phone"
                id="phone"
              />
            </FormGroup>
          </Col>
          <h6>Already a member <a href="/"><i className="click" color="light">Click Here</i></a></h6> 
          <Button className="btn" color="success">Join Today</Button>
        </Form></Col>
          </row>
      </Container>
    </body>
  );
}
 
export default SignUp;