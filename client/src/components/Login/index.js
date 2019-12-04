import React, { useState, useEffect } from './node_modules/react';
import { Redirect } from './node_modules/react-router-dom';
import axios from './node_modules/axios';
import { Container, Col, Form, FormGroup, Label, Input, Button, } from './node_modules/reactstrap';
import { useStoreContext } from '../../utils/GlobalState';
import "./style.css";
import { LOGIN_USER } from '../../utils/actions';

const Login = function () {

  const [user, setUser] = useState();
  const [redirect, setRedirect] = useState(false);

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
          userid: res.data.id
        })
        setRedirect(true);
      })
      .catch(err => {
        console.log(err)
      })
  };

  const renderRedirect = () => {
    if (redirect) {
      return <Redirect to='/home' />
    }
  }

  return (
    <div>
      {renderRedirect()}
      <div className="bcg1">
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
                <h6>Not a member <a href="/signup"><i className="click" color="light">Click Here</i></a></h6>
                <Button className="btn1" color="success">Submit</Button>
              </Form>
            </Col>
          </row>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
        </Container>
      </div>
    </div>
  );
}

export default Login;