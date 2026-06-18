import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";

import type { Account, Transaction } from "@/app/api/_mock-data";
import { TransactionList } from "@/templates/composites/transactionList";

type AccountTransactionsResponse = {
  account: Account;
  transactions: Transaction[];
};

const accountTypeLabels: Record<Account["accountType"], string> = {
  credit: "Credit",
  savings: "Savings",
  currentAccount: "Current Account",
};

async function getAccountTransactions(id: string) {
  const headersList = await headers();
  const host = headersList.get("host");

  if (!host) {
    notFound();
  }

  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const response = await fetch(
    `${protocol}://${host}/api/accounts/${id}/transactions`,
    { cache: "no-store" },
  );

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to load account transactions");
  }

  return (await response.json()) as AccountTransactionsResponse;
}

export default async function AccountTransactionsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { account, transactions } = await getAccountTransactions(id);

  return (
    <div className="container flex flex-col gap-6 pb-24 pt-4">
      <div className="flex flex-col gap-2">
        <Link
          href={`/accounts/${account.id}`}
          className="text-sm font-semibold text-primary"
        >
          Back to account
        </Link>
        <div>
          <p className="text-xs uppercase tracking-wide text-neutral-dark">
            {accountTypeLabels[account.accountType]} {account.accountNumber}
          </p>
          <h1 className="text-2xl font-semibold text-primary-dark">
            Transactions
          </h1>
        </div>
      </div>

      <TransactionList transactions={transactions} showSearch />
    </div>
  );
}
