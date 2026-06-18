import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import type { Account, Transaction } from "@/app/api/_mock-data";

import { TransactionList } from ".";

const accounts: Account[] = [
  {
    id: "acc-current-1",
    accountNumber: "8976 1234",
    accountType: "currentAccount",
    availableBalance: 4120.2,
    status: "Active",
  },
  {
    id: "acc-savings-1",
    accountNumber: "7654 4567",
    accountType: "savings",
    availableBalance: 12875.5,
    status: "Active",
  },
];

const transactions: Transaction[] = [
  {
    id: "txn-1",
    accountID: "acc-current-1",
    type: "Deposit",
    description: "Salary payment",
    amount: 3200,
    date: "2026-06-01",
    status: "Completed",
  },
  {
    id: "txn-2",
    accountID: "acc-current-1",
    type: "Withdrawal",
    description: "Utility bill",
    amount: -86.42,
    date: "2026-06-03",
    status: "Completed",
  },
  {
    id: "txn-3",
    accountID: "acc-savings-1",
    type: "Transfer",
    description: "Savings transfer",
    amount: 500,
    date: "2026-06-05",
    status: "Pending",
  },
];

describe("TransactionList", () => {
  it("renders transactions sorted by latest date by default", () => {
    render(<TransactionList accounts={accounts} transactions={transactions} />);

    const rows = screen.getAllByRole("article");

    expect(within(rows[0]).getByText("Savings transfer")).toBeInTheDocument();
    expect(within(rows[1]).getByText("Utility bill")).toBeInTheDocument();
    expect(within(rows[2]).getByText("Salary payment")).toBeInTheDocument();
  });

  it("filters transactions by search query", async () => {
    const user = userEvent.setup();

    render(<TransactionList accounts={accounts} transactions={transactions} />);

    await user.type(
      screen.getByRole("searchbox", { name: /search transactions/i }),
      "utility",
    );

    expect(screen.getByText("Utility bill")).toBeInTheDocument();
    expect(screen.queryByText("Salary payment")).not.toBeInTheDocument();
    expect(screen.queryByText("Savings transfer")).not.toBeInTheDocument();
  });

  it("filters transactions by account", async () => {
    const user = userEvent.setup();

    render(<TransactionList accounts={accounts} transactions={transactions} />);

    await user.selectOptions(
      screen.getByRole("combobox", { name: /filter transactions by account/i }),
      "acc-savings-1",
    );

    expect(screen.getByText("Savings transfer")).toBeInTheDocument();
    expect(screen.queryByText("Salary payment")).not.toBeInTheDocument();
    expect(screen.queryByText("Utility bill")).not.toBeInTheDocument();
  });

  it("sorts transactions by amount low to high", async () => {
    const user = userEvent.setup();

    render(<TransactionList accounts={accounts} transactions={transactions} />);

    await user.selectOptions(
      screen.getByRole("combobox", { name: /sort transactions/i }),
      "amount-asc",
    );

    const rows = screen.getAllByRole("article");

    expect(within(rows[0]).getByText("Utility bill")).toBeInTheDocument();
    expect(within(rows[1]).getByText("Savings transfer")).toBeInTheDocument();
    expect(within(rows[2]).getByText("Salary payment")).toBeInTheDocument();
  });

  it("renders the empty state when no transactions are provided", () => {
    render(<TransactionList transactions={[]} />);

    expect(screen.getByText("No transactions found.")).toBeInTheDocument();
  });
});
