import React from "react";
import "../Login.css";
import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import useStyles from "../../MaterialUI/Styles";

const LoginForm = () => {
  const classes = useStyles();
  return (
    <div className={"vertical-center"}>
      <div className="forgotContainer">
        <h2 className="mb-4">Member Login</h2>
      </div>

      <div className="form-group">
        <div>
          <TextField
            id="outlined-helperText"
            label="Email Address"
            variant="outlined"
            className={classes.formTextField}
            InputProps={{
              className: classes.formTextStyle,
            }}
            InputLabelProps={{
              className: classes.formHelperText,
            }}
          />
        </div>

        <div>
          <TextField
            id="outlined-helperText"
            label="Password"
            variant="outlined"
            className={classes.formTextField}
            InputProps={{
              className: classes.formTextStyle,
            }}
            InputLabelProps={{
              className: classes.formHelperText,
            }}
          />
        </div>

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
          <Link
            to="/forgotpassword"
            style={{
              color: "white",
            }}
          >
            <div className="forgot">Forgot Password?</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
