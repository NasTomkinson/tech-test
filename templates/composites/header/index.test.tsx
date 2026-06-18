import { render, screen } from "@testing-library/react";

import { Header } from ".";

describe("Header", () => {
  it("renders the user and notification count", () => {
    render(
      <Header
        user={{ name: "Nas Tomkinson", avatarUrl: "/globe.svg" }}
        notificationCount={3}
      />,
    );

    expect(screen.getByText("Nas Tomkinson")).toBeInTheDocument();
    expect(screen.getByAltText("Nas Tomkinson avatar")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "3 unread notifications" }),
    ).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("caps visible notification count at 9+", () => {
    render(
      <Header
        user={{ name: "Jordan Lee", avatarUrl: "/window.svg" }}
        notificationCount={12}
      />,
    );

    expect(screen.getByText("9+")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "12 unread notifications" }),
    ).toBeInTheDocument();
  });
});
