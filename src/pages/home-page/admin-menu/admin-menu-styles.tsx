import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    navMain: {
      listStyle: "none",
      padding: 0,
      margin: 0,
      color: "#fff",
      fontFamily: "Helvetica Neue, Helvetica, Arial, sans-serif",
      height: "100%",
      width: "208px",
      position: "fixed",
      zIndex: 1,
      left: 0,
      backgroundColor: "lightblue",
      overflowX: "hidden"
    },

    first: {
      paddingLeft: "18px",
      lineHeight: "42px",
      fontSize: "13px",
      fontWeight: "bold"
    },

    // .navMain a:hover:not(.selected) {
    //   color: #209e91
    // }

    selected: {
      background: "#209e91",
      color: "#fff",
      textDecoration: "none"
    }
  });

export default styles;
