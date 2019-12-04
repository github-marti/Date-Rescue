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
    <div>
      {renderRedirect()}
      <body className="bcg">
        <Container className="signUp">
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
                <h6>Already a member <a href="/"><i className="click" color="light">Click Here</i></a></h6>
                <Button type="submit" className="btn" color="success">Join Today</Button>
              </Form></Col>
          </row>
        </Container>
      </body>
    </div>
  );
};

export default SignUp;