import React from "react";

import axe from "@globe/common/src/tests/axe";
import { ISection } from "@globe/common/src/types/custom-page";
import InputLabel from "@material-ui/core/InputLabel";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import { mount, ReactWrapper } from "enzyme";
import { act } from "react-dom/test-utils";

import DynamicSection from "./dynamic";

describe("Custom Pages DynamicSection tests", () => {
  const section: ISection = {
    name: "New Dynamic Section",
    type: "dynamic",
    displayType: "table",
    fixedColumns: true,
    sectionTitle: "Add a section title here...",
    columnHeaders: [null],
    sectionData: [[]]
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
          <DynamicSection sectionIndex={sectionIndex} section={section} />
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
      act(() => {
        wrapper
          .find(RadioGroup)
          .at(0)
          .prop("onChange")({
          target: { value: "accordion" }
        });
      });

      wrapper.instance().forceUpdate();

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

