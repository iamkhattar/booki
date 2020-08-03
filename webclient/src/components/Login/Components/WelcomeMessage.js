import React from "react";
import "../Login.css";
import { useHistory } from "react-router-dom";
import Jumbotron from 'react-bootstrap/Jumbotron'
import Button from 'react-bootstrap/Button'

const WelcomeMessage = () => {
    return (
        <div >
            <Jumbotron>
                <h1>Welcome back!</h1>
                <br />
                <p>
                    Thank you for choosing Booki to facilitate your bookgroup needs.<br /> 
                    Happy reading!
  </p>
            </Jumbotron>
        </div>
    );
};

export default WelcomeMessage;