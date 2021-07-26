import TextField from "@material-ui/core/TextField";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

import { mount, ReactWrapper } from "enzyme";
import axe from "../../../../../../../tests/axe";

import { ISection } from "@globe/common/src/types/custom-page";
import SearchResults from "./search-results";

describe("Custome Pages Edit basic tests", () => {
  let wrapper: ReactWrapper;

  describe("basic tests", () => {
    beforeEach(() => {
      const section: ISection = {
        name: "New Search Results",
        type: "search-results",
        sectionTitle: "New Dynamic Section Title",
        query: "",
        sectionData: [],
        columnHeaders: []
      };

      wrapper = mount(
        <Router>
          <SearchResults section={section} sectionIndex={0} />
        </Router>
      );
    });

    it("loads without crashing", () => {
      expect(wrapper.exists()).toBe(true);
    });

    it("passes aXe tests", async () => {
      expect(await axe(wrapper.html())).toHaveNoViolations();
    });
  });

  describe("functional tests", () => {
    it("is able to take in a string value", () => {
      const section: ISection = {
        name: "New Search Results",
        type: "search-results",
        sectionTitle: "New Dynamic Section Title",
        query: "test",
        sectionData: [],
        columnHeaders: []
      };

      wrapper = mount(
        <Router>
          <SearchResults section={section} sectionIndex={0} />
        </Router>
      );

      expect(
        wrapper
          .find("#section-title-test")
          .first()
          .prop("value")
      ).toBe("test");
    });

    it("turns query into Json", () => {
      const section: ISection = {
        name: "New Search Results",
        type: "search-results",
        sectionTitle: "New Dynamic Section Title",
        query: `{"includeRecallAndRevisions":false,"page":1,"resultsPerPage":10}`,
        sectionData: [],
        columnHeaders: []
      };

      wrapper = mount(
        <Router>
          <SearchResults section={section} sectionIndex={0} />
        </Router>
      );

      // assert
      expect(
        wrapper
          .find(TextField)
          .at(1)
          .prop("value")
      ).toBe(
        `{
  "includeRecallAndRevisions": false,
  "page": 1,
  "resultsPerPage": 10
}`
      );
    });
  });
});
