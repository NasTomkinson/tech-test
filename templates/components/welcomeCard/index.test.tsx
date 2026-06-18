import { render, screen } from "@testing-library/react";

import { WelcomeCard } from ".";

describe("WelcomeCard", () => {
  it("greets the supplied user", () => {
    render(<WelcomeCard fullName="Jordan Lee" />);

    expect(screen.getByText("Hello, Jordan Lee!")).toBeInTheDocument();
  });
});
