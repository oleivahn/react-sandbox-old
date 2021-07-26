import React, { useContext, useEffect, useState } from "react";

import Grid from "@material-ui/core/Grid";
import { withStyles, WithStyles } from "@material-ui/core/styles";
import _each from "lodash/each";
import _get from "lodash/get";
import _isEmpty from "lodash/isEmpty";
import _mapKeys from "lodash/mapKeys";
import MaterialTable, { MTableEditField, MTableHeader } from "material-table";

import icons from "@globe/common/src/components/common/icons/icons";
import { ISection } from "@globe/common/src/types/custom-page";
import CustomPagesContext from "../../../../../context/custom-pages-context";
import ColumnHeaders from "./column-headers/column-headers";
import LinkPopper from "./link-popper/link-popper";
import PocEditRow from "./poc-edit-row/poc-edit-row";
import styles from "./table-styles";
import "./table.scss";

interface IProps extends WithStyles<typeof styles> {
  sectionIndex: number;
  section: ISection;
}

const AdminTable = (props: IProps) => {
  const { sectionIndex, section } = props;
  const { currentCustomPage, updateCurrentCustomPage } = useContext(
    CustomPagesContext
  );

  /**
   * Move the given table row in the direction indicated.
   * -1 move up (towards the beginning/top) or
   * +1 moves down (towards the bottom/end)
   *
   * @param rowIndex row to move
   * @param direction -1 move up or +1 moves down
   */
  const moveTableDataRow = (rowIndex: number, direction: number) => {
    if (direction !== 1 && direction !== -1) {
      return; // only 1 and -1 are valid inputs
    }

    if (direction < 0 && rowIndex <= 0) {
      return; // do nothing its already the first row
    }

    // make sure the table has data
    if (tableState && tableState.data) {
      if (direction > 0 && rowIndex >= tableState.data.length - 1) {
        return; // do nothing its already the last row
      }

      // figure out which row to swap with
      const targetIndex = rowIndex + direction;

      // get a reference to the target row we are about to overwrite
      const swap = tableState.data[targetIndex];

      // put the row in the target position
      tableState.data[targetIndex] = tableState.data[rowIndex];
      // make the row .id reflect its new position
      tableState.data[targetIndex].tableData = { id: targetIndex };
      // put the target row in the incoming rows position
      tableState.data[rowIndex] = swap;
      // make the row .id reflect its new position
      tableState.data[targetIndex].tableData = { id: rowIndex };

      const dataInNstFormat = reformatMaterialTableDataToNstFormat(
        tableState.data
      );

      // update the NST data
      if (
        currentCustomPage &&
        currentCustomPage.sections &&
        currentCustomPage.sections[sectionIndex]
      ) {
        updateCurrentCustomPage(
          `sections[${sectionIndex}].sectionData`,
          dataInNstFormat
        );
      }
    }
  };

  useEffect(() => {
    setTableState({
      columns: formatNstColumnHeadersIntoMaterialTableFormat(
        section.columnHeaders
      ),
      data: formatNstSectionDataToMaterialTableFormat(section.sectionData)
    });
  }, [
    currentCustomPage &&
      currentCustomPage.sections &&
      currentCustomPage.sections[sectionIndex]
  ]);

  const formatNstColumnHeadersIntoMaterialTableFormat = (
    nstColumnArray: any
  ) => {
    const columnContainer: object[] = [];

    if (nstColumnArray && nstColumnArray.length > 0) {
      nstColumnArray.forEach((value: any, index: number) => {
        const columnObj: object = {
          title: value,
          field: `text${index}`,
          render: (rowData: any) => {
            return (
              <div className="tableCell">
                <Grid container={true}>
                  <Grid className="innerTableText" item={true} xs={9}>
                    <span> {rowData[`text${index}`]}</span>
                  </Grid>
                  <Grid item={true} xs={3}>
                    <LinkPopper
                      rowId={rowData.tableData.id}
                      index={index}
                      sectionIndex={sectionIndex}
                      url={rowData[`url${index}`]}
                    />
                  </Grid>
                </Grid>
              </div>
            );
          }
        };

        columnContainer.push(columnObj);
      });
    }

    return columnContainer;
  };

  const formatNstDataKeys = (data: any[]) =>
    data.map(value =>
      value.map((element: any, index: number) =>
        _mapKeys(element, (value, key) => key + index)
      )
    );

  const materialTableFormat = (rows: any[]) => {
    const dataObjectArray: any[] = [];

    rows.forEach((rowData: any) => {
      const returnObject: any = {};
      rowData.forEach((rowItem: any) => {
        _each(rowItem, (value, key) => {
          return (returnObject[key] = value);
        });
      });
      dataObjectArray.push(returnObject);
    });

    return dataObjectArray;
  };

  // Function that will parse through section data arrays and concatenate
  // in order to put the data into Material Table format
  const formatNstSectionDataToMaterialTableFormat = (nstData: any[]) => {
    // Container for section data
    if (nstData && nstData.length > 0) {
      const formatedNstData = formatNstDataKeys(nstData);
      const materialTableFormatedData = materialTableFormat(formatedNstData);
      return materialTableFormatedData;
    } else {
      return [];
    }
  };

  // format material table formatted data into the expected normal NST format
  const reformatMaterialTableDataToNstFormat = (
    materialTableNstTableData: any[]
  ) => {
    const returnFinalArray: any[] = [];

    materialTableNstTableData.forEach((rowData: any) => {
      const returnArray: any[] = [];

      if (section.columnHeaders) {
        for (let i = 0; i < section.columnHeaders.length; i++) {
          const pushObject: any = {};
          _each(rowData, (value, key) => {
            if (key === `text${i}`) {
              pushObject.text = value;
            }
            if (key === `url${i}`) {
              pushObject.url = value;
            }
          });

          if (_isEmpty(pushObject)) {
            pushObject.text = null;
          }
          returnArray.push(pushObject);
        }
      }

      returnFinalArray.push(returnArray);
    });

    return returnFinalArray;
  };

  // Sets showColHeadersEditor flag state
  const [showColHeadersEditor, setShowColHeadersEditor] = useState(false);

  // Sets Material Table Section Data State
  const [tableState, setTableState] = useState({
    columns: formatNstColumnHeadersIntoMaterialTableFormat(
      section.columnHeaders
    ), // createColumns(colHeaders),
    data: formatNstSectionDataToMaterialTableFormat(section.sectionData) // dataArray
  });

  // Toggles column header edit div
  const handleShowColHeadersEditorToggleClick = () => {
    setShowColHeadersEditor(!showColHeadersEditor);
  };

  return (
    <>
      <div className="mTable">
        <MaterialTable
          icons={icons}
          columns={tableState.columns}
          actions={[
            {
              icon: icons.EditHeader,
              tooltip: "Edit Column Headers",
              isFreeAction: true,
              onClick: handleShowColHeadersEditorToggleClick
            },
            rowData => ({
              icon: icons.SortArrowUp,
              tooltip: "Move Up",
              onClick: (event, rowData) => {
                moveTableDataRow(_get(rowData, "tableData.id"), -1);
              },
              disabled: _get(rowData, "tableData.id") === 0
            }),
            rowData => ({
              icon: icons.SortArrowDown,
              tooltip: "Move Down",
              onClick: (event, rowData) => {
                moveTableDataRow(_get(rowData, "tableData.id"), 1);
              },
              disabled:
                _get(rowData, "tableData.id") >= tableState.data.length - 1
            })
          ]}
          data={tableState.data}
          title={""}
          options={{
            search: false,
            paging: false,
            sorting: false,
            actionsCellStyle: {
              padding: "0px"
            }
          }}
          editable={{
            onRowAdd: newData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();

                  const data = [...tableState.data];
                  data.push(newData);
                  const dataInNstFormat = reformatMaterialTableDataToNstFormat(
                    data
                  );

                  if (
                    currentCustomPage &&
                    currentCustomPage.sections &&
                    currentCustomPage.sections[sectionIndex]
                  ) {
                    updateCurrentCustomPage(
                      `sections[${sectionIndex}].sectionData`,
                      dataInNstFormat
                    );
                  }
                  setTableState({ ...tableState, data });
                }, 600);
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();

                  const data = [...tableState.data];
                  const oldDataId: number = _get(oldData, "tableData.id", -1);
                  data[oldDataId] = newData;

                  const dataInNstFormat = reformatMaterialTableDataToNstFormat(
                    data
                  );
                  if (
                    currentCustomPage &&
                    currentCustomPage.sections &&
                    currentCustomPage.sections[sectionIndex]
                  ) {
                    updateCurrentCustomPage(
                      `sections[${sectionIndex}].sectionData`,
                      dataInNstFormat
                    );
                  }

                  setTableState({ ...tableState, data });
                }, 600);
              }),
            onRowDelete: oldData =>
              new Promise(resolve => {
                setTimeout(() => {
                  resolve();
                  const data = [...tableState.data];
                  data.splice(data.indexOf(oldData), 1);
                  const dataInNstFormat = reformatMaterialTableDataToNstFormat(
                    data
                  );
                  if (
                    currentCustomPage &&
                    currentCustomPage.sections &&
                    currentCustomPage.sections[sectionIndex]
                  ) {
                    updateCurrentCustomPage(
                      `sections[${sectionIndex}].sectionData`,
                      dataInNstFormat
                    );
                  }
                  setTableState({ ...tableState, data });
                }, 600);
              })
          }}
          components={{
            EditField: editprops => {
              return currentCustomPage &&
                currentCustomPage.sections &&
                currentCustomPage.sections[sectionIndex].validation ===
                  "poc" ? (
                <PocEditRow editprops={editprops} />
              ) : (
                <MTableEditField className="tableEditField" {...editprops} />
              );
            },

            Header: props =>
              showColHeadersEditor ? (
                <ColumnHeaders
                  sectionIndex={sectionIndex}
                  sectionHeader={section.columnHeaders}
                  editToggle={handleShowColHeadersEditorToggleClick}
                />
              ) : (
                <MTableHeader {...props} className="tableHeader" />
              )
          }}
        />
      </div>
    </>
  );
};

export default withStyles(styles)(AdminTable);

