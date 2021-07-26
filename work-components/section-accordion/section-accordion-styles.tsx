import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingTop: theme.spacing(2)
    },
    accordionHeader: {
      backgroundColor: "#e0e0e0",
      borderBottom: "1px solid rgba(0, 0, 0, .125)",
      "&  p": {
        paddingTop: 3
      }
    },
    editButton: {
      color: "gray",
      bottom: "7px",
      marginBottom: "-15px"
    },
    inactive: {
      display: "none"
    },
    sectionTitle: {
      marginTop: 0,
      marginBottom: 0,
      margin: `${theme.spacing(1)}px 0 0 0`,
      "& p": { textAlign: "right" }
    },
    doneBtn: {
      marginTop: 6
    },
    headerTitle: {
      minWidth: 550,
      maxWidth: 700,
      margin: `${theme.spacing(1)}px 0 0 0`,
      "& p": { textAlign: "right" }
    },
    pocValidation: {
      color: "#f44336",
      fontSize: 20
    }
  })
);

export default useStyles;
