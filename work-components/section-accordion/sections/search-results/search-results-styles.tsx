import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(2)
    },
    query: {
      paddingTop: "1.6rem"
    },
    queryButton: {
      float: "right",
      "&.MuiButton-text": {
        marginTop: "10px",
        padding: "5px 15px",
        backgroundColor: "#209e91",
        color: "#fff",
        "&:hover": {
          backgroundColor: "#1d8e82"
        }
      }
    },
    editQueryButton: {
      float: "right",
      "&.MuiButton-text": {
        marginRight: "10px"
      }
    },
    rightArrow: {
      paddingLeft: "5px",
      fontSize: "16px"
    }
  })
);

export default useStyles;
