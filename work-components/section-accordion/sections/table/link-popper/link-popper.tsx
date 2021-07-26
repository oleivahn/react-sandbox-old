import React, { useContext, useState } from "react";

import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Fade from "@material-ui/core/Fade";

import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import Popper from "@material-ui/core/Popper";
import TextField from "@material-ui/core/TextField";

import { faLink } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import classnames from "classnames";

import { withStyles, WithStyles } from "@material-ui/core/styles";
import CustomPagesContext from "../../../../../../context/custom-pages-context";
import styles from "./link-popper-style";

interface IProps extends WithStyles<typeof styles> {
  sectionIndex: number;
  rowId: any;
  index: number;
  url: any;
}

const LinkPopper = (props: IProps) => {
  const { sectionIndex, index, url, rowId, classes } = props;
  const { currentCustomPage, updateCurrentCustomPage } = useContext(
    CustomPagesContext
  );

  // Set link popper State
  const [linkPopperState, setLinkPopperState] = useState({
    anchorEl: undefined,
    open: false
  });

  // Set link data State
  const [currentUrlData, setCurrentUrlData] = useState({
    url: "",
    id: 0,
    index: 0
  });

  const id = linkPopperState.open ? "info-popper" : undefined;

  const handleTextChange = (event: any) => {
    const nextText = event.target.value;
    setCurrentUrlData(prevState => ({ ...prevState, url: nextText }));
  };

  // handlers for url box popup
  const handleInfoClick = (url: string, id: number, index: number) => (
    event: any
  ) => {
    const { currentTarget } = event;
    setLinkPopperState(prevState => ({
      anchorEl: currentTarget,
      open: !prevState.open
    }));

    setCurrentUrlData({ url, id, index });
  };

  const handleClickAway = () => {
    // Hide Popper First
    setLinkPopperState({
      anchorEl: undefined,
      open: false
    });
    // If the url in the context is not equal to the updated url text,
    // update the context and then close the popper
    if (
      currentCustomPage &&
      currentCustomPage.sections &&
      currentCustomPage.sections[sectionIndex] &&
      currentCustomPage.sections[sectionIndex].sectionData[currentUrlData.id][
        currentUrlData.index
      ].url !== currentUrlData.url
    ) {
      updateCurrentCustomPage(
        `sections[${sectionIndex}].sectionData[${currentUrlData.id}][${currentUrlData.index}].url`,
        currentUrlData.url
      );
    }
  };

  return (
    <div className={classes.linkPopperRoot}>
      <div>
        <IconButton
          onClick={handleInfoClick(url, rowId, index)}
          classes={{
            root: classnames(classes.iconSize, {
              [classes.iconColor]: url
            })
          }}
        >
          <FontAwesomeIcon icon={faLink} />
        </IconButton>
        <Popper
          id={id}
          open={linkPopperState.open}
          anchorEl={linkPopperState.anchorEl}
          transition={true}
          placement="top-start"
          className={classes.linkPopper}
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper elevation={5} classes={{ root: "linkPopperPaper" }}>
                <ClickAwayListener onClickAway={handleClickAway}>
                  <TextField
                    label="Url"
                    className={classes.linkPopperInput}
                    onChange={handleTextChange}
                    name="text"
                    placeholder="Enter Url"
                    rowsMax={1}
                    defaultValue={url}
                  />
                </ClickAwayListener>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    </div>
  );
};

export default withStyles(styles)(LinkPopper);
