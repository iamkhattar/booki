import React from "react";
import "../Login.css";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const LoginForm = () => {
    const history = useHistory();
    return (
        <div className={'vertical-center'}>
            <div className="forgotContainer">
                <h2>Member Login</h2>
            </div>

            <div className="form-group">
                <div>
                    <label>Email address</label>
                    <input type="text" className="form-control" id="email" placeholder="Enter email" />
                </div>

                <div>
                    <label>Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                </div>

                <br />

                <Link to="/" style={{ textDecoration: "none" }}>
                    <Button
                        variant="contained"
                        size="large"
                        className="h-100 w-100 landing-page-button"
                    >
                        <div className="btn-text">LOGIN</div>
                    </Button>
                </Link>
                <div className="forgotContainer">
                    <a href="" className="forgot"> Forgot Username/Password?</a>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
