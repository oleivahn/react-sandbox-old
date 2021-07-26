import FormHelperText from "@material-ui/core/FormHelperText";


<FormControlLabel
    value={"pocs"}
    control={<Radio color="primary" />}
    label="Points of Contact"
  />
  <FormHelperText className={classes.helperText}>
    Predefined fields and validation related to points of contact
  </FormHelperText>
  <FormControlLabel
    value={"dynamic"}
    control={<Radio color="primary" />}
    label="Custom"
  />
  <FormHelperText className={classes.helperText}>
    Unstructured data without validation that can be displayed as a
    table or accordion
  </FormHelperText>
  <FormControlLabel
    value={"summaries"}
    control={<Radio color="primary" />}
    label="GEOINT Summaries"
  />
  <FormHelperText className={classes.helperText}>
    Displays latest or curated GEOINT Summaries
  </FormHelperText>
  <FormControlLabel
    value={"search-results"}
    control={<Radio color="primary" />}
    label="Intel"
  />
  <FormHelperText className={classes.helperText}>
    Displays Intel results based on a custom built query
  </FormHelperText>