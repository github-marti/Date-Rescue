import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Col, Form, FormGroup, Label, Input, Button,} from 'reactstrap';


const login = function () {
    return (
        <Container className="sign-in">
        <h2>Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Username</Label>
              <Input
                type="username"
                name="username"
                id="user"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                type="password"
                name="password"
                id="examplePassword"
              />
            </FormGroup>
          </Col>
          <Button>Submit</Button>
        </Form>
      </Container>
        
  );
}
 
export default login;