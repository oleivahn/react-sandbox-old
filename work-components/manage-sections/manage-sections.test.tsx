import React from "react";

import ICustomPage from "@globe/common/src/types/custom-page";
import { mount, ReactWrapper } from "enzyme";
import CustomPagesContext, {
  ICustomPagesContext
} from "../../../context/custom-pages-context";

import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
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

    // TEST 1
    it("should open the dialog when `manage sections` button is clicked", async () => {
      // load the component asynchronously to allow the useEffect hook to run before testing it
      await act(async () => {
        wrapper = mount(
          <CustomPagesContext.Provider value={mockContext}>
            <ManageSections />
          </CustomPagesContext.Provider>
        );
      });
      wrapper.update();

      // confirm the  manage sections button exists in the DOM
      expect(wrapper.find("#manageSectionsButton").exists()).toBe(true);

      // open the dialog
      wrapper
        .find("#manageSectionsButton")
        .first()
        .simulate("click");

      // confirm the dialog is open
      expect(wrapper.find(Dialog).props().open).toBe(true);
    });

    // TEST 2
    it("should close the dialog", async () => {
      // load the component asynchronously to allow the useEffect hook to run first before testing it
      await act(async () => {
        wrapper = mount(
          <CustomPagesContext.Provider value={mockContext}>
            <ManageSections />
          </CustomPagesContext.Provider>
        );
      });
      wrapper.update();

      // open the dialog
      wrapper
        .find("#manageSectionsButton")
        .first()
        .simulate("click");

      // close the dialog
      wrapper
        .find("#cancelButton")
        .first()
        .simulate("click");

      // confirm the dialog is closed
      expect(wrapper.find(Dialog).props().open).toBe(false);
    });

    // TEST 3
    it("should move a row up", async () => {
      // arrange
      // load the component asynchronously to allow the useEffect hook to run first before testing it
      await act(async () => {
        wrapper = mount(
          <CustomPagesContext.Provider value={mockContext}>
            <ManageSections />
          </CustomPagesContext.Provider>
        );
      });
      wrapper.update();

      // act
      // open the dialog
      wrapper
        .find("#manageSectionsButton")
        .first()
        .simulate("click");

      // grab the entire second section
      const section2 = wrapper.find("li").at(1);

      // grab the move-up button from the second section
      const section2MoveUpButton = wrapper
        .find("li")
        .at(1)
        .find(IconButton)
        .at(0);

      // section 2 going up
      section2MoveUpButton.simulate("click");

      // click the done button to set the new sections arrays as the new value
      wrapper
        .find("#doneButton")
        .first()
        .simulate("click");

      // assert
      expect(section2.text()).toBe("Section 1 ");
    });

    // TEST 4
    it("should move a row down", async () => {
      // load the component asynchronously to allow the useEffect hook to run first before testing it
      await act(async () => {
        wrapper = mount(
          <CustomPagesContext.Provider value={mockContext}>
            <ManageSections />
          </CustomPagesContext.Provider>
        );
      });
      wrapper.update();

      // open the dialog
      wrapper
        .find("#manageSectionsButton")
        .first()
        .simulate("click");

      // grab the 2nd section
      const section2 = wrapper.find("li").at(1);

      // grab section 1's move down button
      const section1MoveDownButton = wrapper
        .find("li")
        .at(0)
        .find(IconButton)
        .at(1);

      // section 1 going down
      section1MoveDownButton.simulate("click");

      // click the done button to set the new sections arrays as the new value
      wrapper
        .find("#doneButton")
        .first()
        .simulate("click");

      // assert
      expect(section2.text()).toBe("Section 1 ");
    });

    // TEST 5
    it("should delete a row", async () => {
      // arrange
      // load the component asynchronously to allow the useEffect hook to run first before testing it
      await act(async () => {
        wrapper = mount(
          <CustomPagesContext.Provider value={mockContext}>
            <ManageSections />
          </CustomPagesContext.Provider>
        );
      });
      wrapper.update();

      // act
      // open the dialog
      wrapper
        .find("#manageSectionsButton")
        .first()
        .simulate("click");

      // grab section 2's delete button
      const section2DeleteButton = wrapper
        .find("li")
        .at(1)
        .find(IconButton)
        .at(2);

      // click it to delete second row
      section2DeleteButton.simulate("click");

      // click the done button to set the new sections arrays as the new value
      wrapper
        .find("#doneButton")
        .first()
        .simulate("click");

      // assert
      expect(wrapper.find("li").length).toBe(1);
    });
  });
});
