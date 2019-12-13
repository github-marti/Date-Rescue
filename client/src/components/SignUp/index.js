import React, { useState, useEffect } from 'react';
import { Container, Col, Form, FormGroup, Label, Input, Button, } from 'reactstrap';
import { Redirect } from 'react-router-dom';
import "./style.css";
import axios from 'axios';

function SignUp() {

  const [user, setUser] = useState({})
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    console.log('signup')
  }, [redirect]);

  const handleInputChange = event => {
    let name = event.target.name.trim();
    let value = event.target.value.trim();
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    let userData = user;
    if (!user.email || !user.username || !user.password || !user.phoneNumber) {
      return;
    }
    console.log('user', user);
    axios.post('/api/signup', userData)
      .then(() => {
        console.log('signup successful!');
        setRedirect(true);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/login' />
    }
  }

  return (
    <div className="signUp">
      {renderRedirect()}
        <br></br>
        <span class="logo">
                            <img src={require("./redblock2.png")} height="150" width="200" />
                        </span>
        <Container className="sign">
          <row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Form className="form" onSubmit={handleFormSubmit}>
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
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type="text"
                      name="username"
                      id="username"
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Password</Label>
                    <Input
                      type="password"
                      name="password"
                      id="examplePassword"
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>Phone Number</Label>
                    <Input
                      type="tel"
                      name="phoneNumber"
                      id="phoneNumber"
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                </Col>
                <Button type="submit" className="btn" color="success">Join Today</Button>
                <h6><a href="/">Return to login</a></h6>
              </Form></Col>
          </row>
        </Container>
      </div>
  );
};

export default SignUp;