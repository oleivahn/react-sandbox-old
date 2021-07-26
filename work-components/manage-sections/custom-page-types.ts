export default interface ICustomPage {
  id?: number;
  urlSlug?: string;
  title?: string;
  description?: string;
  bannerImageUrl?: string;
  sections?: ISection[];
  modified?: string;
  created?: string;
}

export interface ISection {
  id?: string;
  name: string;
  type: TSectionType;
  query?: string;
  displayType?: string;
  sectionData: ISectionData[][];
  sectionTitle: string;
  columnHeaders: Array<null | string>;
  validation?: string;
  fixedColumns?: boolean;
  dynamic?: boolean;
  count?: number;
  remarksCount?: number;
  summaryIDs?: string[];
}

export interface ISectionData {
  url?: string;
  text: null | string;
  label?: null | string;
}

export type TSectionType = "dynamic" | "pocs" | "search-results" | "summaries";
