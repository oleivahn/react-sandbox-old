import React from "react";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { mount, ReactWrapper } from "enzyme";
import axe from "../../../../../tests/axe";

import { ISection } from "@globe/common/src/types/custom-page";
import { IconButton } from "@material-ui/core";
import SectionAccordion from "./section-accordion";

describe("Custome Pages Edit basic tests", () => {
  describe("basic tests", () => {
    let wrapper: ReactWrapper;

    beforeEach(() => {
      // assert props
      const section: ISection = {
        name: "New Search Results",
        type: "search-results",
        sectionTitle: "New Dynamic Section Title",
        query: "",
        sectionData: [],
        columnHeaders: []
      };
      section.id = new Date().getTime().toString();

      wrapper = mount(
        <SectionAccordion key={section.id} sectionIndex={0} section={section} />
      );
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
    let wrapper: ReactWrapper;

    beforeEach(() => {
      // assert props
      const section: ISection = {
        name: "New Search Results",
        type: "search-results",
        sectionTitle: "New Dynamic Section Title",
        query: "",
        sectionData: [],
        columnHeaders: []
      };
      section.id = new Date().getTime().toString();

      wrapper = mount(
        <SectionAccordion key={section.id} sectionIndex={0} section={section} />
      );
    });

    afterEach(() => {
      wrapper.unmount();
    });

    it("sets the new header", () => {
      // find the edit button and click it
      wrapper
        .find(IconButton)
        .first()
        .simulate("click");

      // find input field and insert change
      expect(
        wrapper
          .find(TextField)
          .first()
          .prop("value")
      ).toBe("New Search Results");

      wrapper
        .find("input")
        .simulate("change", { target: { value: "NEW COUNTRY" } });

      // find done button and click it
      wrapper
        .find(IconButton)
        .at(2)
        .simulate("click");

      // check header new value is set
      expect(
        wrapper
          .find(TextField)
          .first()
          .prop("value")
      ).toBe("NEW COUNTRY");
    });

    describe("renders different sections based on section type", () => {
      it("renders summaries", () => {
        // assert props
        const section: ISection = {
          name: "New Search Results",
          type: "summaries",
          sectionTitle: "New Dynamic Section Title",
          query: "",
          sectionData: [],
          columnHeaders: []
        };
        section.id = new Date().getTime().toString();

        wrapper = mount(
          <SectionAccordion
            key={section.id}
            sectionIndex={0}
            section={section}
          />
        );

        // find input field and insert change
        expect(wrapper.find(Typography).text()).toBe("New Search Results");
      });

      it("renders dynamic", () => {
        // assert props
        const section: ISection = {
          name: "New Dynamic Section",
          type: "dynamic",
          sectionTitle: "New Dynamic Section Title",
          query: "",
          sectionData: [],
          columnHeaders: []
        };
        section.id = new Date().getTime().toString();

        wrapper = mount(
          <SectionAccordion
            key={section.id}
            sectionIndex={0}
            section={section}
          />
        );

        // find input field and insert change
        expect(wrapper.find(Typography).text()).toBe("New Dynamic Section");
      });
    });
  });
});
