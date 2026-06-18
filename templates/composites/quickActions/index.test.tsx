import { render, screen } from "@testing-library/react";

import { QuickActions } from ".";

describe("QuickActions", () => {
  it("renders action cards with links", () => {
    render(
      <QuickActions
        actions={[
          {
            id: "transfer",
            title: "Transfer money",
            icon: "material-symbols:swap-horiz-rounded",
            href: "/accounts",
          },
          {
            id: "history",
            title: "Recent transactions",
            icon: "material-symbols:history-rounded",
            href: "/transactions",
          },
        ]}
      />,
    );

    expect(screen.getByRole("heading", { name: /quick actions/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /transfer money/i })).toHaveAttribute(
      "href",
      "/accounts",
    );
    expect(
      screen.getByRole("link", { name: /recent transactions/i }),
    ).toHaveAttribute("href", "/transactions");
  });
});
