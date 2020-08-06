import React from "react";
import "./CreateGroup.css";
import CreateGroupForm from "./Components/CreateGroupForm";

const CreateGroup = () => {
    return (
        <div className="createGroup-wrapper">
            <div className="background-wrapper h-100 w-100">
                <div className="background-image h-100 w-100"></div>
            </div>

            <div className="container">
               
                <div className="content createGroupContent p-5">

                    <div className="row">
                        <div className="col-sm-12">
                            <img width="40%"  alt="Logo" className="logo m-2" src={require("../../assets/white-logo.png")} fluid />

                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-12">
                            <CreateGroupForm />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default CreateGroup;

