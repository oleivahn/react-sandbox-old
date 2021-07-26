import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    // Add styles here
    root: {
      "& > *": {
        margin: theme.spacing(1),
        width: 300
      }
    },
    test: {
      color: "blue",
      padding: "0.5em"
    },
    test2: {
      color: "red"
    }
  })
);

export default useStyles;
