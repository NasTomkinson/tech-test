import type { Account } from "@/app/api/_mock-data";

export type AccountFilterValue = "all" | Account["id"];

export type TransactionAccountFilterProps = {
  accounts: Account[];
  value: AccountFilterValue;
  onChange: (value: AccountFilterValue) => void;
};

const accountTypeLabels: Record<Account["accountType"], string> = {
  credit: "Credit",
  savings: "Savings",
  currentAccount: "Current Account",
};

export function TransactionAccountFilter({
  accounts,
  value,
  onChange,
}: TransactionAccountFilterProps) {
  return (
    <select
      aria-label="Filter transactions by account"
      value={value}
      onChange={(event) => onChange(event.target.value as AccountFilterValue)}
      className="rounded border border-neutral-light bg-white px-3 py-2 text-sm text-primary-dark"
    >
      <option value="all">All accounts</option>
      {accounts.map((account) => (
        <option key={account.id} value={account.id}>
          {accountTypeLabels[account.accountType]} {account.accountNumber}
        </option>
      ))}
    </select>
  );
}
