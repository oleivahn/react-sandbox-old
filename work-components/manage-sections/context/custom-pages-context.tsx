import React, { Dispatch, SetStateAction } from "react";

import ICustomPage from "@globe/common/src/types/custom-page";

export interface ICustomPagesContext {
  customPages?: ICustomPage[];
  currentCustomPage?: ICustomPage;
  hasEditOccured: boolean;
  showSpinner: boolean;
  addOrUpdateCustomPage: (customPage?: ICustomPage) => void;
  setCurrentCustomPage: Dispatch<SetStateAction<ICustomPage | undefined>>;
  updateCurrentCustomPage: (key: string, value: any) => void;
}

export const customsPageContextDefault: ICustomPagesContext = {
  customPages: undefined,
  currentCustomPage: undefined,
  hasEditOccured: false,
  showSpinner: false,
  addOrUpdateCustomPage: () => null,
  setCurrentCustomPage: () => null,
  updateCurrentCustomPage: () => null
};

const CustomPagesContext = React.createContext<ICustomPagesContext>(
  customsPageContextDefault
);
export default CustomPagesContext;
