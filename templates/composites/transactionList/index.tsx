"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Transaction } from "@/app/api/_mock-data";
import { formatCurrency } from "@/utils/formatCurrency";

import { TransactionSearch } from "./components/transactionSearch";
import { TransactionSort } from "./components/transactionSort";

export type TransactionListProps = {
  transactions?: Transaction[];
  showSearch?: boolean;
};

export type SortOption = "amount-desc" | "amount-asc" | "date-asc" | "date-desc";

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

function searchTransactions(transactions: Transaction[], query: string) {
  const normalisedQuery = query.trim().toLowerCase();

  if (!normalisedQuery) {
    return transactions;
  }

  return transactions.filter((transaction) =>
    [
      transaction.id,
      transaction.description,
      transaction.type,
      transaction.status,
      transaction.date,
      String(transaction.amount),
    ].some((value) => value.toLowerCase().includes(normalisedQuery)),
  );
}

export function TransactionList({
  transactions = [],
  showSearch = false,
}: TransactionListProps) {
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const filteredTransactions = useMemo(
    () => searchTransactions(transactions, searchQuery),
    [transactions, searchQuery],
  );
  const sortedTransactions = useMemo(
    () => sortTransactions(filteredTransactions, sortOption),
    [filteredTransactions, sortOption],
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
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
        {showSearch ? (
          <TransactionSearch
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
              setVisibleCount(pageSize);
            }}
          />
        ) : null}
        <TransactionSort
          value={sortOption}
          onChange={(value) => {
            setSortOption(value);
            setVisibleCount(pageSize);
          }}
        />
      </div>

      {visibleTransactions.length > 0 ? (
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
                <span className="label">
                  {transaction.type}
                </span>
              </div>
              <span
                className={[
                  "text-right font-medium text-lg",
                  transaction.amount > 0 ? "text-utility-success" : "",
                ].join(" ")}
              >
                {formatTransactionAmount(transaction.amount)}
              </span>
            </article>
          ))}
        </div>
      ) : (
        <p className="rounded-md border border-neutral-light p-4 text-sm text-neutral-dark">
          No transactions match your search.
        </p>
      )}

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
