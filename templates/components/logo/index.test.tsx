import { render, screen } from "@testing-library/react";

import { Logo } from ".";

describe("Logo", () => {
  it("renders the EagleBank brand", () => {
    render(<Logo />);

    expect(screen.getByText("EagleBank")).toBeInTheDocument();
  });
});
