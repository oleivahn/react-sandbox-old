import React from "react";

// import { ISection } from "@globe/common/src/types/custom-page";
import ICustomPage from "@globe/common/src/types/custom-page";
import { mount, ReactWrapper, shallow } from "enzyme";
import CustomPagesContext, {
  ICustomPagesContext
} from "../../../context/custom-pages-context";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import { act } from "react-dom/test-utils";
import axe from "../../../../../tests/axe";
import ManageSections from "./manage-sections";

describe("manage-sections tests", () => {
  let wrapper: ReactWrapper;

  describe("basic tests", () => {
    beforeEach(() => {
      wrapper = mount(<ManageSections />);
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("loads without crashing", () => {
      expect(wrapper.exists()).toBe(true);
    });

    it("passes aXe tests", async () => {
      expect(await axe(wrapper.html())).toHaveNoViolations();
    });
  });

  describe("functional tests", () => {
    let wrapper: any;

    it("it should close the dialog on click", async () => {
      const mockCustomPage: ICustomPage = {
        id: 1,
        urlSlug: "demo",
        title: "test title 1",
        description: "this is test opening statement 1",
        bannerImageUrl: "www.usa.gov",
        sections: [
          {
            id: "1",
            name: "Section 1",
            type: "dynamic",
            sectionData: [
              [{ text: "Something for demo 1" }],
              [{ text: "Demo 1 extra text" }]
            ],
            sectionTitle: "Section Title",
            columnHeaders: ["Website"]
          },
          {
            id: "2",
            name: "Section 2",
            type: "search-results",
            sectionData: [
              [{ text: "Something for demo 2" }],
              [{ text: "Demo 2 part" }]
            ],
            sectionTitle: "Search Results",
            columnHeaders: ["Header2"]
          }
        ],
        modified: "1/1/2020",
        created: "1/1/2020"
      };

      const mockContext: ICustomPagesContext = {
        customPages: [mockCustomPage],
        currentCustomPage: mockCustomPage,
        hasEditOccured: true,
        showSpinner: false,
        addOrUpdateCustomPage: jest.fn(),
        setCurrentCustomPage: jest.fn(),
        updateCurrentCustomPage: jest.fn()
      };

      wrapper = mount(
        <CustomPagesContext.Provider value={mockContext}>
          <ManageSections />
        </CustomPagesContext.Provider>
      );

      console.log(wrapper.debug());
      // expect(wrapper.find("#manageSectionsButton").exists()).toBe(true);

      // wrapper
      //   .find("#manageSectionsButton")
      //   .first()
      //   .simulate("click");

      expect(wrapper.find(Dialog).props().open).toBe(false);
    });

    it("should move sections when clicking down on first section", () => {
      // test Open the dialog
      // console.log(wrapper.html());

      // console.log(wrapper.debug());

      // act : click on the down arrow
      wrapper
        .find("#manageSectionsButton")
        .first()
        .simulate("click");

      // assert : expect the index to change
    });

    // end test
  });
});
