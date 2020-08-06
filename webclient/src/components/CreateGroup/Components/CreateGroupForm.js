import React from "react";
import "../CreateGroup.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";

const CreateGroupForm = () => {
    return (
        <div>
            <div>
                <h2>Create Group</h2>
            </div>

            <div className="form-group">
                <div>
                    <label>Group Name</label>
                    <input type="text" className="form-control" id="groupName" placeholder="Group Name" />
                </div>

                <div>
                    <label>Add Book</label>
                    <input type="text" className="form-control" id="currentBook" placeholder="Add Book" />
                </div>

                <br />

                <Link to="/" style={{ textDecoration: "none" }}>
                    <Button
                        variant="contained"
                        size="large"
                        className="h-100 w-100 landing-page-button"
                    >
                        <div className="btn-text">CREATE GROUP</div>
                    </Button>
                </Link>
                <div className="forgotContainer">
                    <Link to="/login" style={{ textDecoration: "none" }}>
                        <a href="" className="forgot">View Existing Groups</a>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CreateGroupForm;
