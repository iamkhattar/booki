import React from "react";
import "./Register.css";
import RegisterForm from "./Components/RegisterForm";

const Register = () => {
    return (
        <div className="register-wrapper">
            <div className="background-wrapper h-100 w-100">
                <div className="background-image h-100 w-100"></div>
            </div>

            <div className="container">
               
                <div className="content registerContent p-5">

                    <div className="row">
                        <div className="col-sm-12">
                            <img width="40%"  alt="Logo" className="logo m-2" src={require("../../assets/white-logo.png")} fluid />

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <RegisterForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Register;
