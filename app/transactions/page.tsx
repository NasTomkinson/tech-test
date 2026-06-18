import { headers } from "next/headers";

import type { Account, Transaction } from "@/app/api/_mock-data";
import { TransactionList } from "@/templates/composites/transactionList";

type TransactionsResponse = {
  transactions: Transaction[];
};

type AccountsResponse = {
  accounts: Account[];
};

async function getTransactionsPageData() {
  const headersList = await headers();
  const host = headersList.get("host");

  if (!host) {
    throw new Error("Unable to resolve host for transactions request");
  }

  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const baseUrl = `${protocol}://${host}`;
  const [transactionsResponse, accountsResponse] = await Promise.all([
    fetch(`${baseUrl}/api/transactions`, { cache: "no-store" }),
    fetch(`${baseUrl}/api/accounts`, { cache: "no-store" }),
  ]);

  if (!transactionsResponse.ok) {
    throw new Error("Failed to load transactions");
  }

  if (!accountsResponse.ok) {
    throw new Error("Failed to load accounts");
  }

  const [{ transactions }, { accounts }] = (await Promise.all([
    transactionsResponse.json(),
    accountsResponse.json(),
  ])) as [TransactionsResponse, AccountsResponse];

  return { accounts, transactions };
}

export default async function TransactionsPage() {
  const { accounts, transactions } = await getTransactionsPageData();

  return (
    <div className="container flex flex-col gap-6 pb-24 pt-4">
      <div>
        <h1 className="text-2xl font-semibold text-primary-dark">
          Transactions
        </h1>
        <p className="text-sm text-neutral-dark">
          Review payments, deposits, and transfers across every account.
        </p>
      </div>

      <TransactionList
        accounts={accounts}
        transactions={transactions}
        showSearch
      />
    </div>
  );
}
