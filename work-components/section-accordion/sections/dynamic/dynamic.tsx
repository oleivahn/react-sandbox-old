import React, { useContext } from "react";

import { faAlignJustify, faTable } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

import InputField from "@globe/common/src/components/input-field/input-field";
import { ISection } from "@globe/common/src/types/custom-page";
import CustomPagesContext from "../../../../../context/custom-pages-context";
import AdminTable from "../table/table";
import useStyles from "./dynamic-styles";

interface IProps {
  sectionIndex: number;
  section: ISection;
}

const DynamicSection = (props: IProps) => {
  const { sectionIndex, section } = props;
  const context = useContext(CustomPagesContext);
  const classes = useStyles();

  /**
   * Change Event of Radio Button for Select View
   */
  const ViewTypeSelected = (event: any) => {
    const selectedView = event.target.value;

    if (context) {
      const sections = "[sections[" + sectionIndex + "].displayType";
      context.updateCurrentCustomPage(sections, selectedView);
    }
  };

  return (
    <Grid container={true}>
      {section.type === "dynamic" && (
        <Grid item={true} xs={12} lg={3}>
          <FormControl>
            <FormLabel>Select View Type</FormLabel>
            <RadioGroup
              aria-label="Select View Type"
              name="selectViewType"
              value={section.displayType}
              onChange={ViewTypeSelected}
              row={true}
            >
              <FormControlLabel
                value="table"
                aria-label="add-sections"
                control={<Radio id="tableRadioButton" color="primary" />}
                label={
                  <Icon>
                    <FontAwesomeIcon icon={faTable} size="xs" />
                    <span className={classes.iconText}>Table</span>
                  </Icon>
                }
                labelPlacement="end"
              />
              <FormControlLabel
                value="accordion"
                control={<Radio id="accordionRadioButton" color="primary" />}
                label={
                  <Icon>
                    <FontAwesomeIcon icon={faAlignJustify} size="xs" />
                    <span className={classes.iconText}>Accordion</span>
                  </Icon>
                }
                labelPlacement="end"
              />
            </RadioGroup>
          </FormControl>
        </Grid>
      )}
      <Grid item={true} xs={12} lg={8}>
        <div>
          <InputLabel htmlFor="section-title">Section Title</InputLabel>
        </div>
        <InputField
          value={section.sectionTitle}
          maxLength={64}
          fieldOnContext={`sections[${sectionIndex}].sectionTitle`}
          updateField={context.updateCurrentCustomPage}
          textFieldProps={{
            id: `section-title-${section.id}`
          }}
        />
      </Grid>
      <Grid item={true} xs={12}>
        <AdminTable sectionIndex={sectionIndex} section={section} />
      </Grid>
    </Grid>
  );
};

export default DynamicSection;
