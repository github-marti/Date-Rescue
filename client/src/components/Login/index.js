import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Container, Col, Form, FormGroup, Label, Input, Button, } from 'reactstrap';
import { useStoreContext } from '../../utils/GlobalState';
import "./style.css";
import { LOGIN_USER } from '../../utils/actions';

const Login = function () {

  const [user, setUser] = useState();
  const [redirect, setRedirect] = useState({
    home: false,
    signup: false
  });

  const [_, dispatch] = useStoreContext();

  useEffect(() => {
    console.log("redirectState");
  }, [redirect])

  const handleOnChange = event => {
    let name = event.target.name;
    let value = event.target.value;

    setUser({
      ...user,
      [name]: value
    })
  };

  const handleFormSubmit = event => {
    event.preventDefault();
    axios.post('/api/login', user)
      .then(res => {
        console.log(res);
        dispatch({
          type: LOGIN_USER,
          username: res.data.username,
          userid: res.data.id,
          phoneNumber: res.data.phoneNumber
        })
        setRedirect({
          home: true
        });
      })
      .catch(err => {
        console.log(err)
      })
  };

  const handleClick = event => {
    setRedirect({
      signup: true
    })
  }

  const renderRedirect = () => {
    if (redirect.home) {
      return <Redirect to='/' />
    } else if (redirect.signup) {
      return <Redirect to="/signup" />
    }
  }

  return (
    <div>
      {renderRedirect()}
      <div className="bcg1">
        <span class="logo">
          <img src={require("./redblock2.png")} height="150" width="200" />
        </span>
        <Container className="login">
          <row>
            <Col sm="12" md={{ size: 6, offset: 3 }}>
              <Form className="form" onSubmit={handleFormSubmit}>
                <Col>
                  <h2>Log In</h2>
                  <FormGroup>
                    <Label>Username</Label>
                    <Input
                      type="username"
                      name="username"
                      id="user"
                      onChange={handleOnChange}
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
                      onChange={handleOnChange}
                    />
                  </FormGroup>
                </Col>
                <h6>Not a member? <i className="click" color="light" onClick={handleClick}>Click Here</i></h6>
                <Button className="btn1" color="success">Log In</Button>
              </Form>
            </Col>
          </row>
        </Container>
      </div>
    </div>
  );
}

export default Login;