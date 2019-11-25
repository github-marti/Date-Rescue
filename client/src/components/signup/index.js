import React, { useState } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, } from 'reactstrap';
import "./style.css";
import axios from 'axios';

class SignUp extends React.Component {

  state = {
    email: "",
    username: "",
    password: "",
    phoneNumber: ""
  }

  handleInputChange = event => {
    let name = event.target.name.trim();
    let value = event.target.value.trim();
    this.setState({
      [name]: value
    })
  }

  handleFormSubmit = event => {
    event.preventDefault();
    let userData = this.state;
    if (!this.state.email || !this.state.username || !this.state.password || !this.state.phoneNumber) {
      return;
    }
    axios.post('/api/signup', userData)
      .then(() => {
        console.log('signup successful!');
      })
      .catch(err => {
        console.log(err);
      });
    this.setState({});
  }

  render() {
    return (
      <body className="bcg">
        <Container className="signUp">
          <row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Form className="form" onSubmit={this.handleFormSubmit}>
                <Col>
                  <h2>Sign Up</h2>
                </Col>
                <Col>
                  <FormGroup>
                    <Label>E-mail</Label>
                    <Input
                      type="email"
                      name="email"
                      id="email"
                      value={this.state.email}
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      value={this.state.username}
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      value={this.state.password}
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Phone Number</Label>
                    <Input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      value={this.state.phoneNumber}
                      onChange={this.handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <h6>Already a member <a href="/"><i className="click" color="light">Click Here</i></a></h6>
                <Button type="submit" className="btn" color="success">Join Today</Button>
              </Form></Col>
          </row>
        </Container>
      </body>
    );
  }
};

export default SignUp;