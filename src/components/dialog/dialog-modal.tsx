import { withStyles, WithStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import styles from "./dialog-modal-styles";

interface IProps extends WithStyles<typeof styles> {}

const AddSection = (props: IProps) => {
  const { classes } = props;

  // Set intial dialog state
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  const openDialog = (event: any) => {
    // Always default to min column value when opening dialog
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        className={classes.sectionManagementButton}
        onClick={openDialog}
      >
        Click to pop a modal
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={closeDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          This is the Dialog Title
        </DialogTitle>
        <DialogContent>
          Warning: This is the contents of the modal/dialog. Needs to add done
          button function handler.
        </DialogContent>
        <DialogActions>
          <Button id="cancelButton" onClick={closeDialog} color="primary">
            Cancel
          </Button>
          <Button
            // onClick={addSectionToAccordion}
            onClick={closeDialog}
            color="primary"
            autoFocus={true}
            // disabled={!isNumber}
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default withStyles(styles)(AddSection);
