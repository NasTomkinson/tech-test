"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Transaction } from "@/app/api/_mock-data";
import { formatCurrency } from "@/utils/formatCurrency";

export type TransactionListProps = {
  transactions?: Transaction[];
};

type SortOption = "amount-desc" | "amount-asc" | "date-asc" | "date-desc";

const pageSize = 10;

function formatTransactionAmount(amount: number) {
  const absoluteAmount = formatCurrency(Math.abs(amount));

  if (amount > 0) {
    return `+${absoluteAmount}`;
  }

  return absoluteAmount;
}

function sortTransactions(
  transactions: Transaction[],
  sortOption: SortOption,
) {
  return [...transactions].sort((a, b) => {
    const [sortField, sortDirection] = sortOption.split("-") as [
      "amount" | "date",
      "asc" | "desc",
    ];
    const firstValue =
      sortField === "amount"
        ? Math.abs(a.amount)
        : new Date(a.date).getTime();
    const secondValue =
      sortField === "amount"
        ? Math.abs(b.amount)
        : new Date(b.date).getTime();
    const comparison = firstValue - secondValue;

    return sortDirection === "asc" ? comparison : -comparison;
  });
}

export function TransactionList({ transactions = [] }: TransactionListProps) {
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const sortedTransactions = useMemo(
    () => sortTransactions(transactions, sortOption),
    [transactions, sortOption],
  );
  const visibleTransactions = sortedTransactions.slice(0, visibleCount);
  const hasMoreTransactions = visibleCount < sortedTransactions.length;

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;

    if (!loadMoreElement || !hasMoreTransactions) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((currentCount) =>
            Math.min(currentCount + pageSize, sortedTransactions.length),
          );
        }
      },
      { rootMargin: "160px" },
    );

    observer.observe(loadMoreElement);

    return () => observer.disconnect();
  }, [hasMoreTransactions, sortedTransactions.length, visibleCount]);

  if (transactions.length === 0) {
    return (
      <p className="rounded-md border border-neutral-light p-4 text-sm text-neutral-dark">
        No transactions found.
      </p>
    );
  }

  return (
    <section className="flex flex-col gap-3">
      <div className="flex justify-end">
        <select
          aria-label="Sort transactions"
          value={sortOption}
          onChange={(event) => {
            setSortOption(event.target.value as SortOption);
            setVisibleCount(pageSize);
          }}
          className="rounded border border-neutral-light bg-white px-3 py-2 text-sm text-primary-dark"
        >
          <option value="amount-desc">Amount High to Low</option>
          <option value="amount-asc">Amount Low to High</option>
          <option value="date-asc">Date Earliest</option>
          <option value="date-desc">Date Oldest</option>
        </select>
      </div>

      <div className="divide-y divide-neutral-light rounded-md bg-white">
        {visibleTransactions.map((transaction) => (
          <article
            key={transaction.id}
            className="flex justify-between items-center gap-3 p-2"
          >
            <div className="flex flex-col min-w-0">
              <span className="truncate text-sm font-semibold">
                {transaction.description}
              </span>
              <span className="mt-1 text-xs text-neutral-dark">
                {transaction.type}
              </span>
            </div>
            <span
              className={[
                "text-right font-semibold",
                transaction.amount > 0 ? "text-utility-success" : "",
              ].join(" ")}
            >
              {formatTransactionAmount(transaction.amount)}
            </span>
          </article>
        ))}
      </div>

      {hasMoreTransactions ? (
        <div
          ref={loadMoreRef}
          aria-hidden="true"
          className="h-4"
        />
      ) : null}
    </section>
  );
}
