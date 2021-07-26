import React from "react";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import useStyles from "./input-styles";
import classnames from "classnames";

const Input = () => {
  const classes = useStyles();

  const unUsedVar = "hello";
  return (
    <div>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="standard-basic" label="Standard" />
      </form>
      <p className={classes.test}>
        This is the skelleton of how to use modular comp with it's css file
        externally applied
      </p>
      <p className={classes.test}>
        Ensure you export it with withStyles(styles)(CompName){" "}
      </p>
      <p className={classnames(classes.test, classes.test2)}>
        Using 2 classes at the same time here.
      </p>
      <p className={classnames(classes.test, classes.test2)}>
        TODO: Practice conditional rendering of classes
      </p>
      <p className={classnames(classes.test, classes.test2)}>
        TODO: Add linting to my project so that unused variable get grayed out
        and things like that
      </p>
      <p className={classnames(classes.test, classes.test2)}>
        This component has a const called unUsedVar to is not grayed out. Also,
        there are unused import "withStyles" that are not being used and need to
        be removed
      </p>

      <h3>This component uses the better way to add styles to my components</h3>
    </div>
  );
};
export default Input;
