export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  avatarUrl: string;
};

export type Account = {
  id: string;
  accountNumber: string;
  availableBalance: number;
  accountType: "currentAccount" | "savings" | "credit";
  status: "Active" | "Inactive";
};

export type MockDashboard = {
  totalAccountBalance: number;
  summaryCards: {
    currentBalance: number;
    monthlyDeposits: number;
    monthlyWithdrawals: number;
  };
  quickActions: QuickAction[];
  user: User;
  accounts: Account[];
};

export type AccountSummary = Pick<
  Account,
  "id" | "accountNumber" | "availableBalance" | "accountType" | "status"
>;

export type Transaction = {
  id: string;
  accountID: Account["id"];
  type: "Deposit" | "Withdrawal" | "Transfer" | "Payment";
  description: string;
  amount: number;
  date: string;
  status: "Completed" | "Pending" | "Failed";
};

export type QuickAction = {
  id: string;
  title: string;
  description: string;
  icon: string;
  href: string;
};

export type QuickActionSummary = Pick<QuickAction, "id" | "title" | "icon" | "href">;

export type DashboardResponse = {
  firstName: User["firstName"];
  totalAccountBalance: MockDashboard["totalAccountBalance"];
  summaryCards: MockDashboard["summaryCards"];
  quickActions: QuickActionSummary[];
  accounts: AccountSummary[];
};

export type AuthUserSummary = Pick<
  User,
  "id" | "firstName" | "lastName" | "email" | "avatarUrl"
>;

export type UserProfile = Pick<
  User,
  "firstName" | "lastName" | "email" | "phone" | "address" | "avatarUrl"
>;

export const mockUser: User = {
  id: "user-1",
  firstName: "Jordan",
  lastName: "Lee",
  email: "jordan@eaglebank.test",
  phone: "+44 20 7946 0958",
  address: "42 King Street, London, SW1A 1AA",
  avatarUrl: "/window.svg",
};

export const mockSecondUser: User = {
  id: "user-2",
  firstName: "Nas",
  lastName: "Tomkinson",
  email: "nastomkinson@gmail.com",
  phone: "+44 20 7946 1010",
  address: "18 Market Street, London, E1 6AN",
  avatarUrl: "/globe.svg",
};

export const mockUsers: User[] = [mockUser, mockSecondUser];

export const mockAuthCredentials = [
  {
    email: mockUser.email,
    password: "password123",
    user: mockUser,
  },
  {
    email: mockSecondUser.email,
    password: "password123",
    user: mockSecondUser,
  },
] as const;

export function getMockUserByCredentials(email: string, password: string) {
  return (
    mockAuthCredentials.find(
      (credentials) =>
        credentials.email.toLowerCase() === email.toLowerCase() &&
        credentials.password === password,
    )?.user ?? null
  );
}

export function getMockUserByEmail(email: string | null | undefined) {
  if (!email) {
    return null;
  }

  return (
    mockUsers.find((user) => user.email.toLowerCase() === email.toLowerCase()) ??
    null
  );
}

export const mockAccounts: Account[] = [
  {
    id: "acc-current-1",
    accountNumber: "8976 1234",
    availableBalance: 4120.2,
    accountType: "currentAccount",
    status: "Active",
  },
  {
    id: "acc-savings-1",
    accountNumber: "7654 4567",
    availableBalance: 12875.5,
    accountType: "savings",
    status: "Active",
  },
  {
    id: "acc-credit-1",
    accountNumber: "4321 9876",
    availableBalance: 2200,
    accountType: "credit",
    status: "Active",
  },
];

export const mockSecondUserAccounts: Account[] = [
  {
    id: "nasto-current-1",
    accountNumber: "2244 8091",
    availableBalance: 6842.35,
    accountType: "currentAccount",
    status: "Active",
  },
  {
    id: "nasto-savings-1",
    accountNumber: "1190 4502",
    availableBalance: 24610.9,
    accountType: "savings",
    status: "Active",
  },
  {
    id: "nasto-credit-1",
    accountNumber: "5518 7730",
    availableBalance: 3750,
    accountType: "credit",
    status: "Active",
  },
];

const baseMockTransactions: Transaction[] = [
  { id: "txn-1", accountID: "acc-current-1", type: "Deposit", description: "Salary payment", amount: 3200, date: "2026-06-01", status: "Completed" },
  { id: "txn-2", accountID: "acc-current-1", type: "Withdrawal", description: "Utility bill", amount: -86.42, date: "2026-06-03", status: "Completed" },
  { id: "txn-3", accountID: "acc-savings-1", type: "Transfer", description: "Savings transfer", amount: 500, date: "2026-06-05", status: "Pending" },
  { id: "txn-4", accountID: "acc-current-1", type: "Payment", description: "Council tax", amount: -142.85, date: "2026-05-31", status: "Completed" },
  { id: "txn-5", accountID: "acc-credit-1", type: "Payment", description: "Card repayment", amount: -250, date: "2026-05-30", status: "Completed" },
  { id: "txn-6", accountID: "acc-current-1", type: "Withdrawal", description: "Grocery store", amount: -64.2, date: "2026-05-29", status: "Completed" },
  { id: "txn-7", accountID: "acc-current-1", type: "Withdrawal", description: "Rail ticket", amount: -22.7, date: "2026-05-28", status: "Completed" },
  { id: "txn-8", accountID: "acc-savings-1", type: "Deposit", description: "Interest payment", amount: 18.42, date: "2026-05-27", status: "Completed" },
  { id: "txn-9", accountID: "acc-current-1", type: "Payment", description: "Mobile phone bill", amount: -36.99, date: "2026-05-26", status: "Completed" },
  { id: "txn-10", accountID: "acc-credit-1", type: "Withdrawal", description: "Online marketplace", amount: -89.99, date: "2026-05-25", status: "Completed" },
  { id: "txn-11", accountID: "acc-current-1", type: "Deposit", description: "Freelance invoice", amount: 650, date: "2026-05-24", status: "Completed" },
  { id: "txn-12", accountID: "acc-current-1", type: "Withdrawal", description: "Restaurant", amount: -58.3, date: "2026-05-23", status: "Completed" },
  { id: "txn-13", accountID: "acc-savings-1", type: "Transfer", description: "Holiday fund", amount: 300, date: "2026-05-22", status: "Completed" },
  { id: "txn-14", accountID: "acc-current-1", type: "Payment", description: "Broadband bill", amount: -42, date: "2026-05-21", status: "Completed" },
  { id: "txn-15", accountID: "acc-credit-1", type: "Withdrawal", description: "Hotel booking", amount: -210.5, date: "2026-05-20", status: "Pending" },
  { id: "txn-16", accountID: "acc-current-1", type: "Withdrawal", description: "Coffee shop", amount: -4.8, date: "2026-05-19", status: "Completed" },
  { id: "txn-17", accountID: "acc-current-1", type: "Withdrawal", description: "Pharmacy", amount: -17.65, date: "2026-05-18", status: "Completed" },
  { id: "txn-18", accountID: "acc-savings-1", type: "Deposit", description: "Monthly savings", amount: 400, date: "2026-05-17", status: "Completed" },
  { id: "txn-19", accountID: "acc-current-1", type: "Payment", description: "Energy bill", amount: -118.72, date: "2026-05-16", status: "Completed" },
  { id: "txn-20", accountID: "acc-credit-1", type: "Withdrawal", description: "Electronics store", amount: -349.99, date: "2026-05-15", status: "Completed" },
  { id: "txn-21", accountID: "acc-current-1", type: "Deposit", description: "Expense reimbursement", amount: 92.4, date: "2026-05-14", status: "Completed" },
  { id: "txn-22", accountID: "acc-current-1", type: "Withdrawal", description: "Gym membership", amount: -45, date: "2026-05-13", status: "Completed" },
  { id: "txn-23", accountID: "acc-savings-1", type: "Transfer", description: "Emergency fund", amount: 250, date: "2026-05-12", status: "Completed" },
  { id: "txn-24", accountID: "acc-current-1", type: "Payment", description: "Insurance premium", amount: -73.25, date: "2026-05-11", status: "Completed" },
  { id: "txn-25", accountID: "acc-credit-1", type: "Withdrawal", description: "Flight booking", amount: -186.4, date: "2026-05-10", status: "Completed" },
  { id: "txn-26", accountID: "acc-current-1", type: "Withdrawal", description: "Book shop", amount: -24.99, date: "2026-05-09", status: "Completed" },
  { id: "txn-27", accountID: "acc-current-1", type: "Withdrawal", description: "Fuel station", amount: -71.13, date: "2026-05-08", status: "Completed" },
  { id: "txn-28", accountID: "acc-savings-1", type: "Deposit", description: "Bonus savings", amount: 750, date: "2026-05-07", status: "Completed" },
  { id: "txn-29", accountID: "acc-current-1", type: "Payment", description: "Streaming subscription", amount: -12.99, date: "2026-05-06", status: "Completed" },
  { id: "txn-30", accountID: "acc-credit-1", type: "Withdrawal", description: "Department store", amount: -132.75, date: "2026-05-05", status: "Completed" },
  { id: "txn-31", accountID: "acc-current-1", type: "Deposit", description: "Refund", amount: 29.99, date: "2026-05-04", status: "Completed" },
  { id: "txn-32", accountID: "acc-current-1", type: "Withdrawal", description: "Cinema", amount: -18.5, date: "2026-05-03", status: "Completed" },
  { id: "txn-33", accountID: "acc-savings-1", type: "Transfer", description: "ISA contribution", amount: 600, date: "2026-05-02", status: "Completed" },
  { id: "txn-34", accountID: "acc-current-1", type: "Payment", description: "Water bill", amount: -31.48, date: "2026-05-01", status: "Completed" },
  { id: "txn-35", accountID: "acc-credit-1", type: "Withdrawal", description: "Furniture store", amount: -420, date: "2026-04-30", status: "Completed" },
  { id: "txn-36", accountID: "acc-current-1", type: "Withdrawal", description: "Lunch", amount: -11.25, date: "2026-04-29", status: "Completed" },
  { id: "txn-37", accountID: "acc-current-1", type: "Withdrawal", description: "Parking", amount: -7.5, date: "2026-04-28", status: "Completed" },
  { id: "txn-38", accountID: "acc-savings-1", type: "Deposit", description: "Interest payment", amount: 17.95, date: "2026-04-27", status: "Completed" },
  { id: "txn-39", accountID: "acc-current-1", type: "Payment", description: "TV licence", amount: -14.13, date: "2026-04-26", status: "Completed" },
  { id: "txn-40", accountID: "acc-credit-1", type: "Withdrawal", description: "Clothing store", amount: -96.2, date: "2026-04-25", status: "Completed" },
  { id: "txn-41", accountID: "acc-current-1", type: "Deposit", description: "Dividend payment", amount: 44.1, date: "2026-04-24", status: "Completed" },
  { id: "txn-42", accountID: "acc-current-1", type: "Withdrawal", description: "Pet supplies", amount: -33.6, date: "2026-04-23", status: "Completed" },
  { id: "txn-43", accountID: "acc-savings-1", type: "Transfer", description: "Home deposit fund", amount: 900, date: "2026-04-22", status: "Completed" },
  { id: "txn-44", accountID: "acc-current-1", type: "Payment", description: "Charity donation", amount: -25, date: "2026-04-21", status: "Completed" },
  { id: "txn-45", accountID: "acc-credit-1", type: "Withdrawal", description: "Software subscription", amount: -19.99, date: "2026-04-20", status: "Completed" },
  { id: "txn-46", accountID: "acc-current-1", type: "Withdrawal", description: "Dry cleaning", amount: -16, date: "2026-04-19", status: "Completed" },
  { id: "txn-47", accountID: "acc-current-1", type: "Withdrawal", description: "Taxi", amount: -27.4, date: "2026-04-18", status: "Completed" },
  { id: "txn-48", accountID: "acc-savings-1", type: "Deposit", description: "Round-up savings", amount: 38.67, date: "2026-04-17", status: "Completed" },
  { id: "txn-49", accountID: "acc-current-1", type: "Payment", description: "Car insurance", amount: -82.94, date: "2026-04-16", status: "Failed" },
  { id: "txn-50", accountID: "acc-credit-1", type: "Withdrawal", description: "Airport lounge", amount: -35, date: "2026-04-15", status: "Completed" },
];

const extraTransactionDescriptions = [
  "Coffee shop",
  "Supermarket",
  "Online transfer",
  "Train fare",
  "Fuel station",
  "Book store",
  "Savings interest",
  "Restaurant",
  "Mobile payment",
  "Energy bill",
  "Cash withdrawal",
  "Refund",
  "Insurance payment",
  "Streaming service",
  "Gym membership",
  "Home supplies",
  "Pharmacy",
  "Freelance payment",
  "Council payment",
  "Travel booking",
];

const extraTransactionAmounts = [
  -5.4,
  -74.82,
  250,
  -18.9,
  -63.15,
  -21.99,
  12.48,
  -46.7,
  -9.99,
  -126.34,
  -40,
  32.5,
  -88.25,
  -13.99,
  -45,
  -57.2,
  -16.85,
  420,
  -138.55,
  -204.1,
];

function createExtraMockTransactions({
  accountIDs,
  count,
  idOffset,
  dateOffset,
}: {
  accountIDs: Account["id"][];
  count: number;
  idOffset: number;
  dateOffset: number;
}) {
  return Array.from({ length: count }, (_, index): Transaction => {
    const amount = extraTransactionAmounts[index % extraTransactionAmounts.length];
    const isDeposit = amount > 0;
    const transactionDate = new Date(Date.UTC(2026, 3, dateOffset - index));

    return {
      id: `txn-${index + idOffset}`,
      accountID: accountIDs[index % accountIDs.length],
      type: isDeposit
        ? "Deposit"
        : index % 5 === 0
          ? "Payment"
          : index % 7 === 0
            ? "Transfer"
            : "Withdrawal",
      description: extraTransactionDescriptions[
        index % extraTransactionDescriptions.length
      ],
      amount,
      date: transactionDate.toISOString().slice(0, 10),
      status:
        index % 29 === 0
          ? "Failed"
          : index % 13 === 0
            ? "Pending"
            : "Completed",
    };
  });
}

const extraMockTransactions: Transaction[] = createExtraMockTransactions({
  accountIDs: ["acc-current-1", "acc-savings-1", "acc-credit-1"],
  count: 150,
  idOffset: 51,
  dateOffset: 14,
});

export const mockTransactions: Transaction[] = [
  ...baseMockTransactions,
  ...extraMockTransactions,
];

const secondUserBaseMockTransactions: Transaction[] = [
  { id: "nasto-txn-1", accountID: "nasto-current-1", type: "Deposit", description: "Salary payment", amount: 4100, date: "2026-06-02", status: "Completed" },
  { id: "nasto-txn-2", accountID: "nasto-current-1", type: "Payment", description: "Mortgage payment", amount: -1265.4, date: "2026-06-03", status: "Completed" },
  { id: "nasto-txn-3", accountID: "nasto-savings-1", type: "Transfer", description: "Savings transfer", amount: 900, date: "2026-06-04", status: "Completed" },
  { id: "nasto-txn-4", accountID: "nasto-current-1", type: "Withdrawal", description: "Supermarket", amount: -84.73, date: "2026-06-05", status: "Completed" },
  { id: "nasto-txn-5", accountID: "nasto-credit-1", type: "Withdrawal", description: "Travel booking", amount: -312.1, date: "2026-06-06", status: "Pending" },
  { id: "nasto-txn-6", accountID: "nasto-current-1", type: "Payment", description: "Energy bill", amount: -128.94, date: "2026-06-07", status: "Completed" },
  { id: "nasto-txn-7", accountID: "nasto-savings-1", type: "Deposit", description: "Interest payment", amount: 31.12, date: "2026-06-08", status: "Completed" },
  { id: "nasto-txn-8", accountID: "nasto-current-1", type: "Withdrawal", description: "Restaurant", amount: -72.55, date: "2026-06-09", status: "Completed" },
  { id: "nasto-txn-9", accountID: "nasto-credit-1", type: "Payment", description: "Card repayment", amount: -400, date: "2026-06-10", status: "Completed" },
  { id: "nasto-txn-10", accountID: "nasto-current-1", type: "Deposit", description: "Freelance invoice", amount: 720, date: "2026-06-11", status: "Completed" },
];

const secondUserExtraMockTransactions: Transaction[] = createExtraMockTransactions({
  accountIDs: ["nasto-current-1", "nasto-savings-1", "nasto-credit-1"],
  count: 90,
  idOffset: 11,
  dateOffset: 10,
}).map((transaction) => ({
  ...transaction,
  id: `nasto-${transaction.id}`,
}));

export const mockSecondUserTransactions: Transaction[] = [
  ...secondUserBaseMockTransactions,
  ...secondUserExtraMockTransactions,
];

export const mockQuickActions: QuickAction[] = [
  {
    id: "quick-action-transfer-money",
    title: "Transfer money",
    description: "Move money between accounts",
    icon: "material-symbols:swap-horiz-rounded",
    href: "/accounts",
  },
  {
    id: "quick-action-pay-bill",
    title: "Pay bill",
    description: "Settle a bill from your current account",
    icon: "material-symbols:receipt-long-outline",
    href: "/transactions",
  },
  {
    id: "quick-action-view-statements",
    title: "View statements",
    description: "View your account statements",
    icon: "material-symbols:account-balance-wallet-outline",
    href: "/accounts",
  },
  {
    id: "quick-action-recent-transactions",
    title: "Recent transactions",
    description: "Review your latest payments and deposits",
    icon: "material-symbols:history-rounded",
    href: "/transactions",
  },
];

export const mockDashboard: MockDashboard = {
  totalAccountBalance: 19195.7,
  summaryCards: {
    currentBalance: 4120.2,
    monthlyDeposits: 3700,
    monthlyWithdrawals: 86.42,
  }, 
  quickActions: mockQuickActions,
  user: mockUser,
  accounts: mockAccounts
};

export const mockSecondUserDashboard: MockDashboard = {
  totalAccountBalance: 35103.25,
  summaryCards: {
    currentBalance: 6842.35,
    monthlyDeposits: 5751.12,
    monthlyWithdrawals: 1467.07,
  },
  quickActions: mockQuickActions,
  user: mockSecondUser,
  accounts: mockSecondUserAccounts,
};

export function getMockAccountsByEmail(email: string | null | undefined) {
  const user = getMockUserByEmail(email);

  if (!user) {
    return [];
  }

  return user.id === mockSecondUser.id ? mockSecondUserAccounts : mockAccounts;
}

export function getMockTransactionsByEmail(email: string | null | undefined) {
  const user = getMockUserByEmail(email);

  if (!user) {
    return [];
  }

  return user.id === mockSecondUser.id
    ? mockSecondUserTransactions
    : mockTransactions;
}

export function getMockDashboardByEmail(email: string | null | undefined) {
  const user = getMockUserByEmail(email);

  if (!user) {
    return null;
  }

  return user.id === mockSecondUser.id ? mockSecondUserDashboard : mockDashboard;
}

export function toAccountSummary(account: Account): AccountSummary {
  return {
    id: account.id,
    accountNumber: account.accountNumber,
    availableBalance: account.availableBalance,
    accountType: account.accountType,
    status: account.status,
  };
}

export function toQuickActionSummary(
  quickAction: QuickAction,
): QuickActionSummary {
  return {
    id: quickAction.id,
    title: quickAction.title,
    icon: quickAction.icon,
    href: quickAction.href,
  };
}

export function toDashboardResponse(
  dashboard: MockDashboard,
): DashboardResponse {
  return {
    firstName: dashboard.user.firstName,
    totalAccountBalance: dashboard.totalAccountBalance,
    summaryCards: dashboard.summaryCards,
    quickActions: dashboard.quickActions.map(toQuickActionSummary),
    accounts: dashboard.accounts.map(toAccountSummary),
  };
}

export function toAuthUserSummary(user: User): AuthUserSummary {
  return {
    id: user.id,
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    avatarUrl: user.avatarUrl,
  };
}

export function toUserProfile(user: User): UserProfile {
  return {
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone,
    address: user.address,
    avatarUrl: user.avatarUrl,
  };
}
