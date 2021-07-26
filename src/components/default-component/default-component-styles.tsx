import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      padding: theme.spacing(3)
    },
    p: {
      color: "red"
    }
    // sectionManagementButton: {
    //   backgroundColor: "#209e91",
    //   color: "#fff",
    //   "&:hover": {
    //     backgroundColor: "#1d8e82"
    //   },
    //   marginRight: "0.7em"
    // }
  });

export default styles;
