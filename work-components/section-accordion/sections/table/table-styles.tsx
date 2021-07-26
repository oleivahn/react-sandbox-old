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
      margin: "1rem 0px",
      padding: "0px 1rem",
      width: "100%",
      overflow: "auto"
    },
    gridItem: {
      position: "relative",
      display: "inline-block"
    },
    textField: {
      margin: "0px 8px 8px 8px"
      // backgroundColor: "#e0e0e0"
    },
    input: {
      fontSize: ".75rem"
    }
  });

export default styles;
