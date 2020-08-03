import React from "react";
import "../Login.css";
import { useHistory } from "react-router-dom";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

const LoginForm = () => {
    const history = useHistory();
    return (
        <div className={'vertical-center'}>
            <div className="forgotContainer">
                <h2>Member Login</h2>
            </div>

            <Form>
                <Form.Group controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button
                    variant="primary"
                    type="submit"
                    block
                    onClick={() => { history.push('/') }}
                >

                    Login
                </Button>
                <div className="forgotContainer">
                    <a href="" className="forgot"> Forgot Username/Password?</a>
                </div>
            </Form>
        </div>
    );
};

export default LoginForm;
