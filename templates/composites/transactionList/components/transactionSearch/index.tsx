export type TransactionSearchProps = {
  value: string;
  onChange: (value: string) => void;
};

export function TransactionSearch({
  value,
  onChange,
}: TransactionSearchProps) {
  return (
    <input
      type="search"
      aria-label="Search transactions"
      placeholder="Search transactions"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      className="min-w-0 flex-1 rounded border border-neutral-light bg-white px-3 py-2 text-sm text-primary-dark placeholder:text-neutral-dark md:max-w-72"
    />
  );
}
