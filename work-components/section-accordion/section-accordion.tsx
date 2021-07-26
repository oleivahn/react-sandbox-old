import React, { useContext, useState } from "react";

import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Zoom from "@material-ui/core/Zoom";
import Edit from "@material-ui/icons/Edit";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import InputField from "@globe/common/src/components/input-field/input-field";
import { ISection } from "@globe/common/src/types/custom-page";
import classNames from "classnames";
import CustomPagesContext from "../../../context/custom-pages-context";
import useStyles from "./section-accordion-styles";
import DynamicSection from "./sections/dynamic/dynamic";
import SearchResultsSection from "./sections/search-results/search-results";
import SummariesSection from "./sections/summaries/summaries";

interface IProps {
  sectionIndex: number;
  section: ISection;
}

const SectionAccordion = (props: IProps) => {
  const classes = useStyles();
  const { sectionIndex, section } = props;
  const context = useContext(CustomPagesContext);

  // state

  const [editHeader, setNewHeader] = useState(false);

  /**
   * Function to set the state of sectionName after
   * done with editing
   */
  const handleEditHeaderChange = (event: any) => {
    event.stopPropagation(); // Disable opening/closing the accordion
    setNewHeader(!editHeader);
  };

  /**
   * Determines which section to render in accordion details
   */
  const renderSection = () => {
    switch (section.type) {
      case "search-results":
        return (
          <SearchResultsSection sectionIndex={sectionIndex} section={section} />
        );
      case "summaries":
        return (
          <SummariesSection sectionIndex={sectionIndex} section={section} />
        );
      default:
        return <DynamicSection sectionIndex={sectionIndex} section={section} />;
    }
  };

  return (
    <Grid container={true} className={classes.root}>
      <Grid item={true} xs={12}>
        <ExpansionPanel TransitionProps={{ unmountOnExit: true }}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`name-${section.id}`}
            id={`name-${section.id}`}
            classes={{
              root: classes.accordionHeader
            }}
          >
            <Typography
              className={classNames("", {
                [classes.inactive]: editHeader
              })}
            >
              {section.name}
            </Typography>
            {editHeader && (
              <Zoom in={true} timeout={300}>
                <Grid item={true} xs={12}>
                  <InputField
                    value={section.name}
                    maxLength={64}
                    stopPropagation={true}
                    fieldOnContext={`sections[${sectionIndex}].name`}
                    updateField={context.updateCurrentCustomPage}
                    textFieldProps={{
                      id: `title-${section.id}`,
                      required: true
                    }}
                  />
                </Grid>
              </Zoom>
            )}
            <IconButton
              aria-haspopup="true"
              color="inherit"
              aria-label="Edit"
              className={classNames(classes.editButton, {
                [classes.inactive]: editHeader
              })}
              onClick={handleEditHeaderChange}
            >
              <Edit fontSize="small" />
            </IconButton>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>{renderSection()}</ExpansionPanelDetails>
        </ExpansionPanel>
      </Grid>
    </Grid>
  );
};

export default SectionAccordion;
