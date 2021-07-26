import { ISection } from "@globe/common/src/types/custom-page";

export const summariesSectionDefault: ISection = {
  name: "New Summaries Section",
  type: "summaries",
  sectionTitle: "",
  count: undefined,
  remarksCount: undefined,
  summaryIDs: undefined,
  columnHeaders: [null],
  sectionData: [[]]
};

export const searchResultsSectionDefault: ISection = {
  name: "New Search Results Section",
  type: "search-results",
  sectionTitle: "",
  query: "",
  displayType: "table",
  fixedColumns: true,
  columnHeaders: [null],
  sectionData: [[]]
};

export const dynamicSectionDefault: ISection = {
  name: "New Dynamic Section",
  type: "dynamic",
  displayType: "table",
  fixedColumns: true,
  sectionTitle: "",
  columnHeaders: [null],
  sectionData: [[]]
};

export const pocsSectionDefault: ISection = {
  name: "New Points Of Contact Section",
  type: "pocs",
  sectionTitle: "",
  validation: "poc",
  displayType: "accordion",
  fixedColumns: true,
  columnHeaders: [
    null,
    null,
    null,
    null,
    "TS",
    "S",
    "U",
    "DSN",
    "ALT1",
    "ALT2",
    "TS EMAIL",
    "S EMAIL",
    "U EMAIL"
  ],
  sectionData: [[]]
};
