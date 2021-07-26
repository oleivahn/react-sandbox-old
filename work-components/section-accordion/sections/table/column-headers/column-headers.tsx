import React, { useContext, useState } from "react";

import { TextField, WithStyles, withStyles } from "@material-ui/core";
import Check from "@material-ui/icons/Check";
import _isEqual from "lodash/isEqual";
import CustomPagesContext from "../../../../../../context/custom-pages-context";
import styles from "./column-headers-style";

interface IProps extends WithStyles<typeof styles> {
  sectionIndex: number;
  sectionHeader: Array<string | null> | undefined;
  editToggle: () => void;
}

const ColumnHeaders = (props: IProps) => {
  const { sectionIndex, sectionHeader, classes } = props;
  const { updateCurrentCustomPage } = useContext(CustomPagesContext);

  const clonedHeader = () => {
    const clonedArr: any = [];

    if (sectionHeader) {
      sectionHeader.map(header => {
        return clonedArr.push(header);
      });
    }

    return clonedArr;
  };

  // Sets columnHeaders state
  const [columnHeaders, setColumnHeaders] = useState(clonedHeader);

  // Updates columnHeaders state on text input
  const handleEditChange = (index: number) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    columnHeaders[index] = event.target.value.trim();
    setColumnHeaders(columnHeaders);
  };

  // Updates NST Admin context on Check icon click
  const handleUpdate = () => {
    if (sectionHeader && !_isEqual(columnHeaders, sectionHeader)) {
      if (updateCurrentCustomPage) {
        const targetColumn = `sections[${sectionIndex}].columnHeaders`;
        updateCurrentCustomPage(targetColumn, columnHeaders);
      }
    }

    props.editToggle();
  };

  // Prevents default behavior when enter key is presed
  const keyPress = (event: any) => {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  };

  return (
    <>
      <thead className="MuiTableHead-root">
        <tr className="MuiTableRow-root MuiTableRow-head tableBottom">
          <th className="MuiTableCell-root MuiTableCell-head MuiTableCell-paddingCheckbox MTableHeader-header alignRight">
            <Check onClick={handleUpdate} className={classes.checkMark} />
          </th>
          {columnHeaders &&
            columnHeaders.map((item: any, index: number) => (
              <th
                className="MuiTableCell-root MTableHeader-header MuiTableCell-head"
                scope="col"
                key={`sectionHeader${sectionIndex}Column${index}`}
              >
                <TextField
                  id={`sectionHeader${sectionIndex}Column${index}`}
                  defaultValue={item}
                  margin="normal"
                  inputProps={{
                    className: classes.input,
                    "aria-label": item
                  }}
                  onChange={handleEditChange(index)}
                  onKeyDown={keyPress}
                  className={classes.textField}
                />
              </th>
            ))}
        </tr>
      </thead>
    </>
  );
};

export default withStyles(styles)(ColumnHeaders);
