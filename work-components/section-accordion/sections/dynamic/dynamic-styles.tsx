import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconText: {
      paddingLeft: 5,
      fontSize: 17
    }
  })
);

export default useStyles;
