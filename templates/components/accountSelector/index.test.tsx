import { render, screen } from "@testing-library/react";

import { AccountSelector } from ".";

describe("AccountSelector", () => {
  it("renders a link with account details", () => {
    render(
      <AccountSelector
        accountId="acc-current-1"
        accountNumber="8976 1234"
        accountType="currentAccount"
        balance={4120.2}
        status="Active"
      />,
    );

    const link = screen.getByRole("link", { name: /current account/i });

    expect(link).toHaveAttribute("href", "/accounts/acc-current-1");
    expect(screen.getByText("8976 1234")).toBeInTheDocument();
    expect(screen.getByText("£4,120.20")).toBeInTheDocument();
    expect(link.querySelector("[data-account-id='acc-current-1']")).toBeInTheDocument();
  });

  it("renders the skeleton when loading", () => {
    const { container } = render(<AccountSelector loading />);

    expect(container.querySelector("[aria-hidden='true']")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});
