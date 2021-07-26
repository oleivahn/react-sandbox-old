import React from "react";

import axe from "@globe/common/src/tests/axe";
import { ISection } from "@globe/common/src/types/custom-page";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";
import ICustomPage from "@globe/common/src/types/custom-page";
import CustomPagesContext, {
  ICustomPagesContext
} from "../../../../../context/custom-pages-context";

import DynamicSection from "./dynamic";

describe("Custom Pages DynamicSection tests", () => {
  const mockCustomPage: ICustomPage = {
    id: 1,
    urlSlug: "www.usa.gov",
    title: "test title 1",
    description: "this is test opening statement 1",
    bannerImageUrl: "www.usa.gov",
    sections: [
      {
        name: "New Dynamic Section",
        type: "dynamic",
        displayType: "table",
        fixedColumns: true,
        sectionTitle: "Add a section title here...",
        columnHeaders: [null],
        sectionData: [[]]
      }
    ],
    modified: "1/1/2020",
    created: "1/1/2020"
  };
  const section: ISection = {
    name: "New Dynamic Section",
    type: "dynamic",
    displayType: "table",
    fixedColumns: true,
    sectionTitle: "Add a section title here...",
    columnHeaders: [null],
    sectionData: [[]]
  };

  const mockContext: ICustomPagesContext = {
    customPages: [mockCustomPage],
    currentCustomPage: mockCustomPage,
    hasEditOccured: false,
    showSpinner: false,
    addOrUpdateCustomPage: jest.fn(),
    setCurrentCustomPage: jest.fn(),
    updateCurrentCustomPage: jest.fn()
  };

  const sectionIndex = 0;

  describe("basic tests", () => {
    let wrapper: ReactWrapper;

    beforeEach(async () => {
      await act(async () => {
        wrapper = mount(
          <DynamicSection sectionIndex={sectionIndex} section={section} />
        );
      });
      wrapper.update();
    });

    it("should render", () => {
      expect(wrapper).toBeDefined();
    });

    it("should pass aXe", async () => {
      expect(await axe(wrapper.html())).toHaveNoViolations();
    });
  });

  describe("radio click tests", () => {
    let wrapper: ReactWrapper | any;

    beforeEach(async () => {
      await act(async () => {
        wrapper = mount(
          <CustomPagesContext.Provider value={mockContext}>
            <DynamicSection sectionIndex={sectionIndex} section={section} />
          </CustomPagesContext.Provider>
        );
      });
      wrapper.update();
    });

    it("should render both radio button display types", () => {
      expect(
        wrapper
          .find(Radio)
          .at(0)
          .prop("value")
      ).toEqual("table");

      expect(
        wrapper
          .find(Radio)
          .at(1)
          .prop("value")
      ).toEqual("accordion");
    });

    it("should set the selected display type to the default value passed in", () => {
      if (section.displayType) {
        expect(
          wrapper
            .find(Radio)
            .at(0)
            .prop("value")
        ).toEqual(section.displayType);
      }
    });

    it("update the displayType when a user hits clicks on the respective display type and hits submit", () => {
      expect(mockContext.updateCurrentCustomPage).toHaveBeenCalledWith(
        "[sections[" + sectionIndex + "].displayType",
        "accordion"
      );

      wrapper.update();

      if (section.displayType) {
        expect(
          wrapper
            .find(RadioGroup)
            .at(0)
            .prop("value")
        ).toEqual("accordion");
      }
    });
  });
});
