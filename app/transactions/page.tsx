"use client";

import type { AccountSummary, Transaction } from "@/app/api/_mock-data";
import { TransactionList } from "@/templates/composites/transactionList";
import { useFetch } from "@/utils";

type TransactionsResponse = {
  accounts: AccountSummary[];
  transactions: Transaction[];
};

export default function TransactionsPage() {
  const {
    data,
    error,
    loading,
  } = useFetch<TransactionsResponse>("/api/transactions");

  return (
    <div className="container flex flex-col pb-24 pt-4">
      <div>
        <h1 className="text-2xl font-semibold text-primary-dark">
          Transactions
        </h1>
        <p className="text-sm text-neutral-dark">
          Review payments, deposits, and transfers across every account.
        </p>
      </div>

      {error ? (
        <p className="mt-4 rounded-md border border-utility-error p-4 text-sm text-utility-error">
          Unable to load transactions.
        </p>
      ) : (
        <TransactionList
          accounts={data?.accounts ?? []}
          hasControls
          loading={loading}
          transactions={data?.transactions ?? []}
        />
      )}
    </div>
  );
}
