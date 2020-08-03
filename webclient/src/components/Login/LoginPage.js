import React from "react";
import "./Login.css";
import LoginForm from "./Components/LoginForm";
import WelcomeMessage from "./Components/WelcomeMessage";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";




const LoginPage = () => {
    return (
        <div className = "loginPage">
            <Container>
                <Row>
                    <Col className="text-center heading">
                        <Image width="40%" src={require('../Images/cover.png')} fluid />
                    </Col>
                </Row>
                <Row>
                    <Col sm={6}>
                        <WelcomeMessage />
                    </Col>
                    <Col sm={1}>
                    </Col>
                    <Col sm={5}>
                        <LoginForm />
                    </Col>
                </Row>

            </Container>
        </div>
    );
};

export default LoginPage;
