import React from "react";

import { mount, ReactWrapper } from "enzyme";
import { axe } from "jest-axe";

import TableColumnHeaders from "./column-headers";

const mockSectionIndex = 1;

const mockSectionHeaders: Array<string | null> | undefined = [
  "Lorem Ipsum 1",
  "Lorem Ipsum 2",
  "Lorem Ipsum 3",
  "Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum Lo… Lorem Ipsum Lorem Ipsum Lorem Ipsum Lorem Ipsum ",
  "TS",
  "S",
  "U",
  "DSN",
  "ALT1",
  "ALT2",
  "TS EMAIL",
  "S EMAIL",
  "U EMAIL"
];

const mockEditToggle = () => {
  return null;
};

describe("TableColumnHeaders Component", () => {
  let wrapper: ReactWrapper<any, Readonly<{}>, React.Component<{}, {}, any>>;

  beforeAll(async () => {
    wrapper = mount(
      <TableColumnHeaders
        sectionIndex={mockSectionIndex}
        sectionHeader={mockSectionHeaders}
        editToggle={mockEditToggle}
      />
    );
  });

  it("should render", () => {
    expect(wrapper).toBeDefined();
  });

  it("should display proper data prop", () => {
    const textInputs = wrapper.find("input");

    expect(textInputs.length).toEqual(13);
    expect(textInputs.at(0).props().defaultValue).toEqual("Lorem Ipsum 1");
  });

  it("should handle onChange", () => {
    const myInput = wrapper.find("input[type='text']").at(0);
    const checkMark = wrapper.find("svg");

    myInput.simulate("focus");
    myInput.simulate("change", { target: { value: "Changed" } });
    myInput.simulate("keyDown", { keyCode: 8 });
    myInput.simulate("keyDown", { keyCode: 13 });
    checkMark.simulate("click");

    expect(checkMark.length).toEqual(1);
    expect(myInput.props().defaultValue).toEqual("Lorem Ipsum 1");
  });

  it("passes aXe tests", async () => {
    expect(await axe(wrapper.html())).toHaveNoViolations();
  });
});
