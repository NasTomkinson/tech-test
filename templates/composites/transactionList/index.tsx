"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type { Account, Transaction } from "@/app/api/_mock-data";
import { CardPreview } from "@/templates/components/cardPreview";
import { formatCurrency } from "@/utils/formatCurrency";

import {
  type AccountFilterValue,
  TransactionAccountFilter,
} from "./components/transactionAccountFilter";
import { TransactionSearch } from "./components/transactionSearch";
import { TransactionSort } from "./components/transactionSort";
import { TransactionListSkeleton } from "./transactionListSkeleton";

export type TransactionListProps = {
  accounts?: Account[];
  hasControls?: boolean;
  initialVisibleCount?: number;
  loadMoreMode?: "auto" | "button";
  loading?: boolean;
  transactions?: Transaction[];
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

function filterTransactionsByAccount(
  transactions: Transaction[],
  accountId: AccountFilterValue,
) {
  if (accountId === "all") {
    return transactions;
  }

  return transactions.filter((transaction) => transaction.accountID === accountId);
}

export function TransactionList({
  accounts = [],
  hasControls = true,
  initialVisibleCount = pageSize,
  loadMoreMode = "auto",
  loading = false,
  transactions = [],
}: TransactionListProps) {
  const [sortOption, setSortOption] = useState<SortOption>("date-desc");
  const [selectedAccountId, setSelectedAccountId] =
    useState<AccountFilterValue>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const [isScrollLoadingEnabled, setIsScrollLoadingEnabled] =
    useState(loadMoreMode === "auto");
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const canShowAccountFilter = hasControls && accounts.length > 0;
  const accountsById = useMemo(
    () => new Map(accounts.map((account) => [account.id, account])),
    [accounts],
  );
  const accountFilteredTransactions = useMemo(
    () =>
      canShowAccountFilter
        ? filterTransactionsByAccount(transactions, selectedAccountId)
        : transactions,
    [canShowAccountFilter, transactions, selectedAccountId],
  );
  const filteredTransactions = useMemo(
    () =>
      hasControls
        ? searchTransactions(accountFilteredTransactions, searchQuery)
        : accountFilteredTransactions,
    [accountFilteredTransactions, hasControls, searchQuery],
  );
  const sortedTransactions = useMemo(
    () =>
      hasControls
        ? sortTransactions(filteredTransactions, sortOption)
        : filteredTransactions,
    [filteredTransactions, hasControls, sortOption],
  );
  const visibleTransactions = sortedTransactions.slice(0, visibleCount);
  const hasMoreTransactions = visibleCount < sortedTransactions.length;

  useEffect(() => {
    const loadMoreElement = loadMoreRef.current;

    if (
      loading ||
      !isScrollLoadingEnabled ||
      !loadMoreElement ||
      !hasMoreTransactions
    ) {
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
  }, [
    hasMoreTransactions,
    isScrollLoadingEnabled,
    loading,
    sortedTransactions.length,
    visibleCount,
  ]);

  if (loading) {
    return (
      <TransactionListSkeleton
        hasControls={hasControls}
        rowCount={Math.min(initialVisibleCount, pageSize)}
      />
    );
  }

  if ( !loading && transactions.length === 0) {
    return (
      <p className="rounded-md border border-neutral-light p-4 text-sm text-neutral-dark">
        No transactions found.
      </p>
    );
  }

  return (
    <section className="relative flex flex-col gap-3 bg-white">
      {hasControls ? (
        <div className="sticky left-0 top-16 z-2 grid grid-cols-2 grid-rows-[auto_auto] gap-2 bg-white sm:flex-row sm:items-center sm:justify-end py-4">
          <TransactionSearch
            value={searchQuery}
            onChange={(value) => {
              setSearchQuery(value);
              setVisibleCount(initialVisibleCount);
              setIsScrollLoadingEnabled(loadMoreMode === "auto");
            }}
            className="col-span-full"
          />
          {canShowAccountFilter ? (
            <TransactionAccountFilter
              accounts={accounts}
              value={selectedAccountId}
              onChange={(value) => {
                setSelectedAccountId(value);
                setVisibleCount(initialVisibleCount);
                setIsScrollLoadingEnabled(loadMoreMode === "auto");
              }}
            />
          ) : null}
          <TransactionSort
            value={sortOption}
            onChange={(value) => {
              setSortOption(value);
              setVisibleCount(initialVisibleCount);
              setIsScrollLoadingEnabled(loadMoreMode === "auto");
            }}
          />
        </div>
      ) : null}

      {visibleTransactions.length > 0 ? (
        <div className="divide-y divide-neutral-light rounded-md bg-white">
          {visibleTransactions.map((transaction) => {
            const account = accountsById.get(transaction.accountID);

            return (
              <article
                key={transaction.id}
                className="flex items-center gap-3 p-2"
              >
                {account ? (
                  <CardPreview
                    accountId={account.id}
                    accountNumber={account.accountNumber}
                    accountType={account.accountType}
                    balance={account.availableBalance}
                    className="shrink-0 max-w-18"
                    status={account.status}
                  />
                ) : null}
                <div className="flex min-w-0 flex-1 flex-col">
                  <span className="truncate text-sm font-semibold">
                    {transaction.description}
                  </span>
                  <span className="label">
                    {account
                      ? `${account.accountNumber} - ${transaction.type}`
                      : transaction.type}
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
            );
          })}
        </div>
      ) : (
        <p className="rounded-md border border-neutral-light p-4 text-sm text-neutral-dark">
          No transactions match your search.
        </p>
      )}

      {hasMoreTransactions &&
      loadMoreMode === "button" &&
      !isScrollLoadingEnabled ? (
        <button
          type="button"
          onClick={() => setIsScrollLoadingEnabled(true)}
          className="btn btn-secondary self-start"
        >
          Load more
        </button>
      ) : null}

      {hasMoreTransactions && isScrollLoadingEnabled ? (
        <div
          ref={loadMoreRef}
          aria-hidden="true"
          className="h-4"
        />
      ) : null}
    </section>
  );
}
