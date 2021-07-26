import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    manageSectionsButton: {
      backgroundColor: "#209e91",
      marginLeft: 10,
      color: "#fff",
      "&:hover": {
        backgroundColor: "#448c82"
      }
    },
    dynamicSectionItem: {
      listStyleType: "none",
      color: "#757575"
    },
    deleteIcon: { color: "#000", padding: "5px;" },
    deleteTooltip: { color: "#757575" },
    arrowIcon: { color: "#000", padding: "5px;" },
    arrowTooltip: { color: "#757575" },
    sectionName: { paddingLeft: "2px", verticalAlign: "middle" },
    manageSectionContent: { marginTop: "17px;" }
  })
);

export default useStyles;
