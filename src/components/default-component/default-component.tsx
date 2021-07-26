import { withStyles, WithStyles } from "@material-ui/core/styles";
import React from "react";
import styles from "./default-component-styles";

interface IProps extends WithStyles<typeof styles> {}

const DefaultComponent = (props: IProps) => {
  const { classes } = props;
  return (
    <div>
      <p className={classes.p}>Create your component here</p>
      <p>
        Look at the source code to see how the component (that uses typescript
        and JSS) should be structured
      </p>
      <p>Still to find out is how to target elements to add JSS(css) to them</p>
    </div>
  );
};

export default withStyles(styles)(DefaultComponent);
