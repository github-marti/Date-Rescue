import React from 'react';
import ReactDOM from 'react-dom';
import { Container, Col, Form, FormGroup, Label, Input, Button, } from 'reactstrap';
import "./style.css";

const login = function () {
  return (
    <div className="bcg1">
      <Container className="login">
        <row>
          <Col sm="12" md={{ size: 6, offset: 3 }}>
            <Form className="form">
              <Col>
                <h2>Log In</h2>
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
              <Button className="btn1" color="success">Submit</Button>
            </Form>
          </Col>
        </row>
      </Container>
    </div>
  );
}

export default login;