import React, { useEffect, useState } from "react";

import _cloneDeep from "lodash/cloneDeep";
import _find from "lodash/find";
import _set from "lodash/set";
import { useParams } from "react-router-dom";

import CustomPagesService from "@globe/common/src/services/custom-pages/custom-pages.service";
import ICustomPage from "@globe/common/src/types/custom-page";
import CustomPagesContext, {
  customsPageContextDefault
} from "./custom-pages-context";
import createCustomPage from "./new-custom-page";

interface IProps {
  children?: React.ReactNode;
}

interface IRouteParams {
  id?: string;
}

const CustomPagesContextProvider = (props: IProps) => {
  const params = useParams<IRouteParams>();

  // state
  const [customPages, setCustomPages] = useState<ICustomPage[] | undefined>(
    undefined
  );
  const [currentCustomPage, setCurrentCustomPage] = useState<
    ICustomPage | undefined
  >(undefined);

  const [hasEditOccured, setHasEditOccured] = useState(false);
  const [showSpinner, setShowSpinner] = useState(false);

  /**
   * Fetches all Custom Pages
   */
  const load = async () => {
    setShowSpinner(true);
    CustomPagesService.getCustomPages().then(response => {
      setCustomPages(response);
      // Sets currentCustomPage if the user navigates directly to edit page
      // An ID in the params means the edit page will render instead of the dashboard
      if (params.id) {
        if (params.id !== "0") {
          // Editing existing CustomPage
          setCurrentCustomPage(getCurrentCustomPage(response, params.id));
        } else {
          // Add new CustomPage
          const newCustomPage = createCustomPage();
          setCurrentCustomPage(newCustomPage);
        }
      }
      setShowSpinner(false);
    });
  };

  /**
   * Attempts to find a CustomPage object in customPages array from the provided ID
   * @returns ICustomPage object or undefined if one is not found
   */
  const getCurrentCustomPage = (
    customPages: ICustomPage[],
    id: string
  ): ICustomPage | undefined => {
    const currentCustomPage = _find(customPages, ["id", Number(id)]);
    return currentCustomPage;
  };

  /**
   * Calls the service to add/update the custom page being submitted
   */
  const addOrUpdateCustomPage = () => {
    setShowSpinner(true);
    if (currentCustomPage) {
      // Send currentCustomPage to API
      CustomPagesService.AddOrUpdateCustomPage(currentCustomPage).then(
        (response: ICustomPage) => {
          if (customPages && response && response.id) {
            // Get the index of the CustomPage modified in customPages array
            const foundIndex: number =
              customPages && customPages.findIndex(x => x.id === response.id);

            if (foundIndex >= 0) {
              // Update customPages state with updated CustomPage
              const customPagesClone: ICustomPage[] = _cloneDeep(customPages);
              customPagesClone[foundIndex] = response;

              setCustomPages(customPagesClone);
            } else {
              // This is a new CustomPage
              setCustomPages([response].concat(...customPages));
            }
          }
          setShowSpinner(false);
          setHasEditOccured(false);
        }
      );
    }
  };

  /**
   * Formats the title into a clean path to be used for the CustomPage URL
   * @returns A URL formatted from the title
   */
  const formatUrl = (title: string): string => {
    // Ex: Transforms "my-new-@@titl$e   \\S" into "my-new-title"
    let formattedUrl = title.replace(/[^a-zA-Z0-9-_\s]/g, ""); // remove special characters
    formattedUrl = formattedUrl.trim().toLowerCase();
    // Ex: Transforms "My New      Title" into "my-new-title"
    formattedUrl = formattedUrl.replace(/\s+/g, "-"); // remove extra whitespace
    return formattedUrl;
  };

  /**
   * Formats a title by removing extra whitespace
   * @returns A formatted title
   */
  const formatTitle = (title: string): string => {
    let formattedTitle = title.trim();
    formattedTitle = formattedTitle.replace(/\s+/g, " ");
    return formattedTitle;
  };

  /**
   * Updates the currentCustomPage state from edit page changes
   */
  const updateCurrentCustomPage = (key: string, value: any) => {
    if (currentCustomPage) {
      const updatedCustomPage: ICustomPage = _cloneDeep(currentCustomPage);

      // Formats the URL/title if it is a new custom page and the title has been modified
      if (!currentCustomPage.id && key === "title") {
        updatedCustomPage.title = formatTitle(value);
        updatedCustomPage.urlSlug = formatUrl(value);
      }

      _set(updatedCustomPage, key, value);

      setCurrentCustomPage(updatedCustomPage);
      setHasEditOccured(true);
    }
  };

  /**
   * When params change, update currentCustomPage
   */
  useEffect(() => {
    if (customPages && params.id) {
      if (params.id !== "0") {
        // Editing an existing custom page, find the CustomPage being edited based on the param ID
        setCurrentCustomPage(getCurrentCustomPage(customPages, params.id));
      } else {
        // Adding a new CustomPage, set title so that currentCustomPage is
        // not falsy and will render the EditPage
        const newCustomPage = createCustomPage();
        setCurrentCustomPage(newCustomPage);
      }
    } else {
      // On Dashboard page, set to undefined
      setCurrentCustomPage(undefined);
    }
  }, [params]);

  /**
   * Runs the load function once
   */
  useEffect(() => {
    load();
  }, []);

  return (
    <CustomPagesContext.Provider
      value={{
        ...customsPageContextDefault,
        customPages,
        currentCustomPage,
        hasEditOccured,
        addOrUpdateCustomPage,
        setCurrentCustomPage,
        updateCurrentCustomPage,
        showSpinner
      }}
    >
      {props.children}
    </CustomPagesContext.Provider>
  );
};

export default CustomPagesContextProvider;
