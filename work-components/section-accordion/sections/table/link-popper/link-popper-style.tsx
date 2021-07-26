import { createStyles, Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) =>
  createStyles({
    iconColor: {
      color: "#3f52b5 !important"
    },
    iconSize: {
      fontSize: "0.85rem !important"
    },
    linkPopperRoot: {
      position: "relative"
    },
    linkPopper: {
      zIndex: 10
    },
    linkPopperInput: {
      width: 300,
      overflow: "visible",
      "& input": {
        fontSize: 14
      }
    }
  });

export default styles;
