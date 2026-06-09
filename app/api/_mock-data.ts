export const mockUser = {
  id: "user-1",
  fullName: "Jordan Lee",
  email: "jordan.lee@eaglebank.test",
  phone: "+44 20 7946 0958",
  address: "42 King Street, London, SW1A 1AA",
  avatarUrl: "/window.svg",
};

export const mockAccounts = [
  {
    id: "acc-current-1",
    accountNumber: "**** 1234",
    availableBalance: 4120.2,
    accountType: "Current",
    status: "Active",
  },
  {
    id: "acc-savings-1",
    accountNumber: "**** 4567",
    availableBalance: 12875.5,
    accountType: "Savings",
    status: "Active",
  },
  {
    id: "acc-credit-1",
    accountNumber: "**** 9876",
    availableBalance: 2200,
    accountType: "Credit",
    status: "Active",
  },
];

export const mockTransactions = [
  {
    id: "txn-1",
    accountId: "acc-current-1",
    type: "Deposit",
    description: "Salary payment",
    amount: 3200,
    date: "2026-06-01",
    status: "Completed",
  },
  {
    id: "txn-2",
    accountId: "acc-current-1",
    type: "Withdrawal",
    description: "Utility bill",
    amount: -86.42,
    date: "2026-06-03",
    status: "Completed",
  },
  {
    id: "txn-3",
    accountId: "acc-savings-1",
    type: "Transfer",
    description: "Savings transfer",
    amount: 500,
    date: "2026-06-05",
    status: "Pending",
  },
];

export const mockDashboard = {
  totalAccountBalance: 19195.7,
  summaryCards: {
    currentBalance: 4120.2,
    monthlyDeposits: 3700,
    monthlyWithdrawals: 86.42,
  },
  recentTransactions: mockTransactions.slice(0, 3),
  quickActions: ["Transfer money", "Pay bill", "View statements"],
  user: mockUser
};
