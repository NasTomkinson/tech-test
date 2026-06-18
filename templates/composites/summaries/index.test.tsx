import { render, screen } from "@testing-library/react";

import { Summaries } from ".";

describe("Summaries", () => {
  it("renders summary titles and formatted amounts", () => {
    render(
      <Summaries
        summaries={[
          {
            id: "deposits",
            title: "Deposits",
            amount: 3700,
            icon: "ic:round-trending-up",
            tone: "success",
          },
          {
            id: "withdrawals",
            title: "Withdrawals",
            amount: 86.42,
            icon: "ic:sharp-trending-down",
            tone: "error",
          },
        ]}
      />,
    );

    expect(screen.getByText("Deposits")).toBeInTheDocument();
    expect(screen.getByText("£3,700.00")).toBeInTheDocument();
    expect(screen.getByText("Withdrawals")).toBeInTheDocument();
    expect(screen.getByText("£86.42")).toBeInTheDocument();
  });
});
