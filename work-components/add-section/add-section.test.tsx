import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import RadioGroup from "@material-ui/core/RadioGroup";
import { mount } from "enzyme";
import { act } from "react-dom/test-utils";
import axe from "../../../../../tests/axe";

import ICustomPage from "@globe/common/src/types/custom-page";
import CustomPagesContext, {
  ICustomPagesContext
} from "../../../context/custom-pages-context";
import AddSection from "./add-section";
import {
  dynamicSectionDefault,
  pocsSectionDefault,
  searchResultsSectionDefault,
  summariesSectionDefault
} from "./section-defaults";

describe("Custome Pages Edit basic tests", () => {
  describe("basic tests", () => {
    let wrapper: any;

    beforeEach(() => {
      wrapper = mount(<AddSection />);
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

    it("should handle opening dialog on button click", async () => {
      const mockCustomPage: ICustomPage = {
        id: 1,
        urlSlug: "www.usa.gov",
        title: "test title 1",
        description: "this is test opening statement 1",
        bannerImageUrl: "www.usa.gov",
        sections: [],
        modified: "1/1/2020",
        created: "1/1/2020"
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

      wrapper = mount(
        <CustomPagesContext.Provider value={mockContext}>
          <AddSection />
        </CustomPagesContext.Provider>
      );

      //  Simulate openeing the dialog
      wrapper
        .find(Button)
        .first()
        .simulate("click");

      // Click manage sections button
      expect(wrapper.find(Dialog).props().open).toBe(true);
    });

    it("should handle closing dialog on cancel", async () => {
      const mockCustomPage: ICustomPage = {
        id: 1,
        urlSlug: "www.usa.gov",
        title: "test title 1",
        description: "this is test opening statement 1",
        bannerImageUrl: "www.usa.gov",
        sections: [],
        modified: "1/1/2020",
        created: "1/1/2020"
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

      wrapper = mount(
        <CustomPagesContext.Provider value={mockContext}>
          <AddSection />
        </CustomPagesContext.Provider>
      );

      // open the dialog first
      wrapper
        .find(Button)
        .first()
        .simulate("click");

      // with the dialog opened, find the close button
      wrapper
        .find("#cancel-button")
        .first()
        .simulate("click");

      // Click close button from modal
      expect(wrapper.find(Dialog).props().open).toBe(false);
    });

    it("should handle change and add a new pocs section when pocs is selected", () => {
      const mockCustomPage: ICustomPage = {
        id: 1,
        urlSlug: "www.usa.gov",
        title: "test title 1",
        description: "this is test opening statement 1",
        bannerImageUrl: "www.usa.gov",
        sections: [],
        modified: "1/1/2020",
        created: "1/1/2020"
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

      wrapper = mount(
        <CustomPagesContext.Provider value={mockContext}>
          <AddSection />
        </CustomPagesContext.Provider>
      );

      const mockEvent = {
        target: {
          value: "pocs"
        }
      };

      // open the dialog first
      wrapper
        .find(Button)
        .first()
        .simulate("click");

      act(() => {
        wrapper
          .find(RadioGroup)
          .at(0)
          .prop("onChange")(mockEvent);
      });
      wrapper.update();

      wrapper
        .find("#done-button")
        .at(0)
        .simulate("click");

      expect(mockContext.updateCurrentCustomPage).toHaveBeenCalledWith(
        `sections[0]`,
        pocsSectionDefault
      );
    });

    it("should handle change and add a new dynamic section when dynamic is selected", () => {
      const mockUpdateCurrentCustomPage = (key: string, value: any) => {
        if (mockCustomPage && mockCustomPage.sections) {
          mockCustomPage.sections[0] = value;
        }
      };

      const mockCustomPage: ICustomPage = {
        id: 1,
        urlSlug: "www.usa.gov",
        title: "test title 1",
        description: "this is test opening statement 1",
        bannerImageUrl: "www.usa.gov",
        sections: [],
        modified: "1/1/2020",
        created: "1/1/2020"
      };
      const mockContext: ICustomPagesContext = {
        customPages: [mockCustomPage],
        currentCustomPage: mockCustomPage,
        hasEditOccured: false,
        showSpinner: false,
        addOrUpdateCustomPage: jest.fn(),
        setCurrentCustomPage: jest.fn(),
        updateCurrentCustomPage: jest.fn(mockUpdateCurrentCustomPage)
      };

      wrapper = mount(
        <CustomPagesContext.Provider value={mockContext}>
          <AddSection />
        </CustomPagesContext.Provider>
      );

      const mockEvent = {
        target: {
          value: "dynamic"
        }
      };

      // open the dialog first
      wrapper
        .find(Button)
        .first()
        .simulate("click");

      act(() => {
        wrapper
          .find(RadioGroup)
          .at(0)
          .prop("onChange")(mockEvent);
      });
      wrapper.update();

      wrapper
        .find("#done-button")
        .at(0)
        .simulate("click");

      expect(mockContext.updateCurrentCustomPage).toHaveBeenCalledTimes(1);
      if (mockCustomPage && mockCustomPage.sections) {
        expect(mockCustomPage.sections[0].name).toEqual(
          dynamicSectionDefault.name
        );
      }
    });

    it("should handle change and add a new summaries section when summaries is selected", () => {
      const mockCustomPage: ICustomPage = {
        id: 1,
        urlSlug: "www.usa.gov",
        title: "test title 1",
        description: "this is test opening statement 1",
        bannerImageUrl: "www.usa.gov",
        sections: [],
        modified: "1/1/2020",
        created: "1/1/2020"
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

      wrapper = mount(
        <CustomPagesContext.Provider value={mockContext}>
          <AddSection />
        </CustomPagesContext.Provider>
      );

      const mockEvent = {
        target: {
          value: "summaries"
        }
      };

      // open the dialog first
      wrapper
        .find(Button)
        .first()
        .simulate("click");

      act(() => {
        wrapper
          .find(RadioGroup)
          .at(0)
          .prop("onChange")(mockEvent);
      });
      wrapper.update();

      wrapper
        .find("#done-button")
        .at(0)
        .simulate("click");
      //

      expect(mockContext.updateCurrentCustomPage).toHaveBeenCalledWith(
        `sections[0]`,
        summariesSectionDefault
      );
    });

    it("should handle change and add a new search-results section when search-results is selected", () => {
      const mockCustomPage: ICustomPage = {
        id: 1,
        urlSlug: "www.usa.gov",
        title: "test title 1",
        description: "this is test opening statement 1",
        bannerImageUrl: "www.usa.gov",
        sections: [],
        modified: "1/1/2020",
        created: "1/1/2020"
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

      wrapper = mount(
        <CustomPagesContext.Provider value={mockContext}>
          <AddSection />
        </CustomPagesContext.Provider>
      );

      const mockEvent = {
        target: {
          value: "search-results"
        }
      };

      // open the dialog first
      wrapper
        .find(Button)
        .first()
        .simulate("click");

      act(() => {
        wrapper
          .find(RadioGroup)
          .at(0)
          .prop("onChange")(mockEvent);
      });
      wrapper.update();

      wrapper
        .find("#done-button")
        .at(0)
        .simulate("click");

      expect(mockContext.updateCurrentCustomPage).toHaveBeenCalledWith(
        `sections[0]`,
        searchResultsSectionDefault
      );
    });
  });
});
