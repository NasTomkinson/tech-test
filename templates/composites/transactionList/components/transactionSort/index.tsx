import type { SortOption } from "../../";

export type TransactionSortProps = {
  value: SortOption;
  onChange: (value: SortOption) => void;
};

export function TransactionSort({ value, onChange }: TransactionSortProps) {
  return (
    <select
      aria-label="Sort transactions"
      value={value}
      onChange={(event) => onChange(event.target.value as SortOption)}
      className="rounded border border-neutral-light bg-white px-3 py-2 text-sm text-primary-dark"
    >
      <option value="amount-desc">Amount High to Low</option>
      <option value="amount-asc">Amount Low to High</option>
      <option value="date-asc">Date Earliest</option>
      <option value="date-desc">Date Latest</option>
    </select>
  );
}
