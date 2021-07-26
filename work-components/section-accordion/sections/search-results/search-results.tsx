import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import InputField from "@globe/common/src/components/input-field/input-field";
import { ISection } from "@globe/common/src/types/custom-page";
import classnames from "classnames";
import CustomPagesContext from "../../../../../context/custom-pages-context";
import useStyles from "./search-results-styles";

interface IProps {
  sectionIndex: number;
  section: ISection;
}

const SearchResultsSection = (props: IProps) => {
  const classes = useStyles();
  const { sectionIndex, section } = props;
  const context = useContext(CustomPagesContext);

  const query: any = section.query;

  // check if query is valid JSON
  const IsValidJSONString = (query: string) => {
    try {
      JSON.parse(query);
    } catch (e) {
      return false;
    }
    return true;
  };

  // if query is valid JSON, format the query into pretty print JSON, otherwise return original string
  const prettyValue = IsValidJSONString(query)
    ? JSON.stringify(JSON.parse(query), undefined, 2)
    : query;

  return (
    <Grid container={true} className={classes.root}>
      <Grid item={true} xs={6}>
        <InputField
          value={section.sectionTitle}
          fieldOnContext={`sections[${sectionIndex}].sectionTitle`}
          updateField={context.updateCurrentCustomPage}
          textFieldProps={{
            id: `section-title-${section.id}`,
            label: "Section Title"
          }}
        />
      </Grid>

      <Grid item={true} xs={6}>
        <Link target={"_blank"} to={`/search?savequery=true`}>
          <Button className={classes.queryButton} color="primary">
            Create Query <span className={classes.rightArrow}>></span>
          </Button>
        </Link>
        {section.query && (
          <Link
            target={"_blank"}
            to={`/search?filter=${section.query}&savequery=true`}
          >
            <Button
              className={classnames(
                classes.queryButton,
                classes.editQueryButton
              )}
              color="primary"
            >
              Edit Query <span className={classes.rightArrow}>></span>
            </Button>
          </Link>
        )}
      </Grid>
      <Grid item={true} xs={12} className={classes.query}>
        <InputField
          value={prettyValue}
          fieldOnContext={`sections[${sectionIndex}].query`}
          updateField={context.updateCurrentCustomPage}
          textFieldProps={{
            id: `section-title-${section.query}`,
            label: "Query",
            variant: "outlined",
            multiline: true
          }}
        />
      </Grid>
    </Grid>
  );
};

export default SearchResultsSection;
