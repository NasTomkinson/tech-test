"use client";

import type { AccountSummary } from "@/app/api/_mock-data";
import { AccountSelector } from "@/templates/components/accountSelector";
import { useFetch } from "@/utils";

type AccountsResponse = {
  accounts: AccountSummary[];
};

export default function AccountsPage() {
  const { data, error, loading } = useFetch<AccountsResponse>("/api/accounts");
  const accounts = data?.accounts ?? [];

  return (
    <div className="container flex flex-col gap-4 pb-24 pt-4">
      <div>
        <h1 className="text-2xl font-semibold text-primary-dark">Accounts</h1>
        <p className="text-sm text-neutral-dark">
          Select an account to view details and transactions.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        {loading
          ? Array.from({ length: 3 }, (_, index) => (
              <AccountSelector key={index} loading />
            ))
          : null}
        {error ? (
          <p className="rounded-md border border-utility-error p-4 text-sm text-utility-error">
            Unable to load accounts.
          </p>
        ) : null}
        {!loading && !error
          ? accounts.map((account) => (
              <AccountSelector
                key={account.id}
                accountId={account.id}
                accountType={account.accountType}
                accountNumber={account.accountNumber}
                balance={account.availableBalance}
                status={account.status}
              />
            ))
          : null}
      </section>
    </div>
  );
}
