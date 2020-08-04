import React from "react";
import "../Register.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const RegisterForm = () => {
    return (
        <div>
            <div>
                <h2>Member Registration</h2>
            </div>

            <div className="form-group">
                <div className="row">
                    <div className="col-md-6">
                        <label>Name</label>
                        <input type="text" className="form-control" id="name" placeholder="Name" />
                    </div>

                    <div className="col-md-6">
                        <label>Username</label>
                        <input type="text" className="form-control" id="username" placeholder="Username" />
                    </div>
                </div>
                <div>
                    <label>Email address</label>
                    <input type="text" className="form-control" id="email" placeholder="Email address" />
                </div>


                <div>
                    <label>Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                </div>

                <div>
                    <label>Confirm Password</label>
                    <input type="password" className="form-control" id="password" placeholder="Password" />
                </div>

                <br />

                <Link to="/" style={{ textDecoration: "none" }}>
                    <Button
                        variant="contained"
                        size="large"
                        className="h-100 w-100 landing-page-button"
                    >
                        <div className="btn-text">REGISTER</div>
                    </Button>
                </Link>
                <div className="forgotContainer">
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <a href="" className="forgot"> Already a member?</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
