import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  formTextField: {
    "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "white",
    },
    width: "100%",
    fontColor: "white",
    marginBottom: "1.5rem",
  },
  formHelperText: {
    color: "white !important",
  },
  formTextStyle: {
    color: "white",
  },
});

export default useStyles;
