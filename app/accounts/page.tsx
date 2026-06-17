import { headers } from "next/headers";

import type { Account } from "@/app/api/_mock-data";
import { AccountSelector } from "@/templates/components/accountSelector";

type AccountsResponse = {
  accounts: Account[];
};

async function getAccounts() {
  const headersList = await headers();
  const host = headersList.get("host");

  if (!host) {
    throw new Error("Unable to resolve host for accounts request");
  }

  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const response = await fetch(`${protocol}://${host}/api/accounts`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to load accounts");
  }

  return (await response.json()) as AccountsResponse;
}

export default async function AccountsPage() {
  const { accounts } = await getAccounts();

  return (
    <div className="container flex flex-col gap-4 pb-24 pt-4">
      <div>
        <h1 className="text-2xl font-semibold text-primary-dark">Accounts</h1>
        <p className="text-sm text-neutral-dark">
          Select an account to view details and transactions.
        </p>
      </div>

      <section className="flex flex-col gap-4">
        {accounts.map((account) => (
          <AccountSelector
            key={account.id}
            accountId={account.id}
            accountType={account.accountType}
            accountNumber={account.accountNumber}
            balance={account.availableBalance}
            status={account.status}
          />
        ))}
      </section>
    </div>
  );
}
