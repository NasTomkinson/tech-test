import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";

import { Appbar } from ".";

jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}));

const mockedUsePathname = jest.mocked(usePathname);

describe("Appbar", () => {
  it("renders navigation links and marks the active route", () => {
    mockedUsePathname.mockReturnValue("/accounts/acc-current-1");

    render(<Appbar />);

    expect(screen.getByRole("link", { name: /home/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: /accounts/i })).toHaveAttribute(
      "aria-current",
      "page",
    );
    expect(screen.getByRole("link", { name: /transactions/i })).not.toHaveAttribute(
      "aria-current",
    );
  });
});
