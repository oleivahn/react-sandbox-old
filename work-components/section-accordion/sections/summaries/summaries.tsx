import React, { useContext } from "react";

import Grid from "@material-ui/core/Grid";
import { withStyles, WithStyles } from "@material-ui/core/styles";

import { ISection } from "@globe/common/src/types/custom-page";
import CustomPagesContext from "../../../../../context/custom-pages-context";
import styles from "./summaries-styles";

interface IProps extends WithStyles<typeof styles> {
  sectionIndex: number;
  section: ISection;
}

const SummariesSection = (props: IProps) => {
  const { classes, sectionIndex, section } = props;
  const context = useContext(CustomPagesContext);

  return (
    <Grid container={true}>
      <Grid item={true} xs={12}>
        TODO: Add summaries section logic here
      </Grid>
    </Grid>
  );
};

export default withStyles(styles)(SummariesSection);
