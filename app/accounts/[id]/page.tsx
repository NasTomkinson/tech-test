"use client";

import { useParams } from "next/navigation";

import type { AccountSummary, Transaction } from "@/app/api/_mock-data";
import { CardPreview } from "@/templates/components/cardPreview";
import { TransactionList } from "@/templates/composites/transactionList";
import { formatCurrency, useFetch } from "@/utils";

type AccountDetailResponse = {
  account: AccountSummary;
  transactions: Transaction[];
};

function AccountDetailsSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-row items-start justify-start gap-8 border-b border-neutral-light bg-white py-4 md:sticky md:left-0 md:top-16 md:z-10 md:flex-col"
    >
      <div className="aspect-[1.586/1] w-28 animate-pulse rounded bg-neutral-light" />
      <div className="flex flex-col gap-3 border-l border-neutral-light pl-8 md:mt-6 md:border-0 md:pl-0">
        {Array.from({ length: 3 }, (_, index) => (
          <div key={index} className="flex flex-col gap-2">
            <div className="h-3 w-24 animate-pulse rounded bg-neutral-light" />
            <div className="h-5 w-32 animate-pulse rounded bg-neutral-light" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AccountDetailsPage() {
  const params = useParams<{ id?: string | string[] }>();
  const accountId = Array.isArray(params.id) ? params.id[0] : params.id;
  const { data, error, loading } = useFetch<AccountDetailResponse>(
    accountId ? `/api/accounts/${accountId}` : null,
  );
  const account = data?.account;

  return (
    <div className="container grid min-h-screen grid-cols-1 gap-2 pt-4 md:grid-cols-[1fr_3fr] md:items-start">
      {loading ? <AccountDetailsSkeleton /> : null}

      {error ? (
        <p className="rounded-md border border-utility-error p-4 text-sm text-utility-error">
          Unable to load account details.
        </p>
      ) : null}

      {!loading && !error && account ? (
        <div className="sticky left-0 top-16 z-10 flex flex-row items-start justify-start gap-8 border-b border-neutral-light bg-white md:border-0 py-4 md:flex-col w-full md:col-start-1">
          <CardPreview
            accountId={account.id}
            accountType={account.accountType}
            balance={account.availableBalance}
            status={account.status}
            accountNumber={account.accountNumber}
          />
          <ul className="flex flex-col gap-1 border-l border-neutral-light pl-8 md:mt-6 md:gap-2 md:border-0 md:pl-0">
            <li className="flex flex-col">
              <span className="label"> Account status </span>
              <span className="text-lg font-medium text-utility-success">
                {account.status}
              </span>
            </li>
            <li className="flex flex-col">
              <span className="label"> Account Number </span>
              <span className="text-lg font-medium">
                {account.accountNumber}
              </span>
            </li>
            <li className="flex flex-col">
              <span className="label"> Available Balance </span>
              <span className="text-lg font-medium">
                {formatCurrency(account.availableBalance)}
              </span>
            </li>
          </ul>
        </div>
      ) : null}

      <section className="mx-auto flex w-full flex-col gap-3 py-4 md:col-start-2 md:max-w-4xl md:border-l md:border-neutral-light md:px-4">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-primary-dark">
            Recent transactions
          </h2>
        </div>
        {!error ? (
          <TransactionList
            initialVisibleCount={8}
            loadMoreMode="button"
            hasControls={false}
            loading={loading}
            transactions={data?.transactions ?? []}
          />
        ) : null}
      </section>
    </div>
  );
}
