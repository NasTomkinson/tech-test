import "@testing-library/jest-dom";
import React from "react";

jest.mock("@iconify-icon/react", () => ({
  Icon: ({ icon, ...props }) =>
    React.createElement("span", {
      ...props,
      "data-icon": icon,
    }),
}));

class MockIntersectionObserver {
  observe = jest.fn();
  unobserve = jest.fn();
  disconnect = jest.fn();
}

global.IntersectionObserver = MockIntersectionObserver;
