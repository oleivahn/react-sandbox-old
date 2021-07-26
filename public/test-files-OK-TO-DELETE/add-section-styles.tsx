import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // root: {
    //   padding: theme.spacing(3)
    // },
    // addSectionButton: {
    //   backgroundColor: "#209e91",
    //   color: "#fff",
    //   "&:hover": {
    //     backgroundColor: "#1d8e82"
    //   },
    //   marginRight: "0.7em"
    // },
    // buttonGroup: {
    //   padding: "0 20px"
    // },
    // actionButtons: {
    //   padding: "0 16px 16px 0"
    // },
    // divider: {
    //   marginBottom: "1em"
    // },
    // setNumberOfColumnsInput: {
    //   maxWidth: 190
    // },
    helperText: {
      marginTop: "-12px",
      marginBottom: "10px",
      paddingLeft: "31px"
    }
  })
);

export default useStyles;
