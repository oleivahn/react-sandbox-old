import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      display: "flex",
      overflow: "hidden",
      width: "max-content"
    },
    paper: {
      padding: "1rem",
      width: "100%",
      overflow: "auto"
    },
    gridItem: {
      position: "relative",
      display: "inline-block"
    },
    textField: {
      marginBottom: "13px",
      marginTop: "14px",
      width: "90%"
    },
    input: {
      fontSize: ".75rem"
    },
    checkMark: {
      cursor: "pointer"
    }
  });

export default styles;
