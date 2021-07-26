import React, { useContext, useEffect, useState } from "react";

import Button from "@material-ui/core/Button";
import Collapse from "@material-ui/core/Collapse";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import _cloneDeep from "lodash/cloneDeep";

import { TSectionType } from "@globe/common/src/types/custom-page";
import CustomPagesContext from "../../../context/custom-pages-context";
import config from "./add-section-config";
import useStyles from "./add-section-styles";
import {
  dynamicSectionDefault,
  pocsSectionDefault,
  searchResultsSectionDefault,
  summariesSectionDefault
} from "./section-defaults";

const AddSection = () => {
  const classes = useStyles();
  const context = useContext(CustomPagesContext);

  const [columnValue, setColumnValue] = useState(config.minColumns);
  const [isNumber, setIsNumber] = useState(true);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [sectionType, setSectionType] = React.useState<
    TSectionType | undefined
  >(undefined);

  // Handle number validation
  const determineIfValueisValid = (inputValue: any) => {
    const compareValue = /[^0-9]/g; // Look for anything that is not a number including non whole numbers
    if (inputValue.match(compareValue)) {
      // If anything is found that is not a whole number set state to false
      setIsNumber(false);
    } else if (!isNaN(inputValue) && inputValue >= config.minColumns) {
      // Make sure input is a number and greater than or equal to min setting
      setIsNumber(true);
    } else {
      setIsNumber(false);
    }
  };

  // Handle change in input
  const handleColumnSelectionInputChange = (event: any) => {
    // Handle if entered value is more than config max
    if (event.target.value > config.maxColumns) {
      event.target.value = config.maxColumns;
    }
    // Set value state
    setColumnValue(event.target.value);
    // Perform validation
    determineIfValueisValid(event.target.value);
  };

  const openDialog = (event: any) => {
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSectionType(event.target.value as TSectionType);
  };

  // State for section handling by index
  const [sectionsLength, setSectionsLength] = useState(
    context && context.currentCustomPage && context.currentCustomPage.sections
      ? context.currentCustomPage.sections.length
      : 0
  );

  const addSectionToAccordion = () => {
    let section;
    switch (sectionType) {
      case "pocs":
        section = pocsSectionDefault;
        break;
      case "dynamic":
        // Make copy of section object
        const templateCopy = _cloneDeep(dynamicSectionDefault);
        // Calculate amount of columns to add to section data column array based on user input
        for (let i = 0; i < columnValue; i++) {
          templateCopy.columnHeaders[i] = null;
        }
        section = templateCopy;
        break;
      case "summaries":
        section = summariesSectionDefault;
        break;
      case "search-results":
        section = searchResultsSectionDefault;
        break;
    }

    if (section) {
      section.id = new Date().getTime().toString();
      context.updateCurrentCustomPage(`sections[${sectionsLength}]`, section);
    }
    setDialogOpen(false);
  };

  // reset sectionsLength if the context sections changes
  useEffect(() => {
    setSectionsLength(
      context && context.currentCustomPage && context.currentCustomPage.sections
        ? context.currentCustomPage.sections.length
        : 0
    );
  }, [
    context && context.currentCustomPage && context.currentCustomPage.sections
  ]);

  return (
    <div>
      <Button
        variant="contained"
        className={classes.addSectionButton}
        onClick={openDialog}
      >
        Add Section +
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" disableTypography={true}>
          <Typography variant="h6">
            What type of section would you like to add?
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" className={classes.buttonGroup}>
            <RadioGroup
              id="radio-group"
              aria-label="add-sections"
              name="add-sections"
              onChange={handleChange}
            >
              <FormControlLabel
                value={"pocs"}
                control={<Radio color="primary" />}
                label="Points of Contact"
              />
              <FormControlLabel
                value={"dynamic"}
                control={<Radio color="primary" />}
                label="Dynamic"
              />
              <FormControlLabel
                value={"summaries"}
                control={<Radio color="primary" />}
                label="Summaries"
              />
              <FormControlLabel
                value={"search-results"}
                control={<Radio color="primary" />}
                label="Search Results"
              />
            </RadioGroup>
          </FormControl>
          <Collapse in={sectionType === "dynamic"}>
            <Divider className={classes.divider} />
            <Typography>
              minimum: {config.minColumns} maximum: {config.maxColumns}
            </Typography>
            <div>
              <TextField
                id="outlined-name"
                label="Number of Columns"
                className={classes.setNumberOfColumnsInput}
                value={columnValue}
                onChange={handleColumnSelectionInputChange}
                margin="normal"
                variant="outlined"
                type="number"
              />
            </div>
            <Typography gutterBottom={true}>
              Warning: The number of columns for this new section can not be
              changed later.
            </Typography>
          </Collapse>
        </DialogContent>
        <DialogActions className={classes.actionButtons}>
          <Button id="cancel-button" onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button
            id="done-button"
            onClick={addSectionToAccordion}
            variant="contained"
            color="primary"
            autoFocus={true}
            disabled={!isNumber}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddSection;
