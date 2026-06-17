import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { CardPreview } from "@/templates/components/cardPreview";
import { TransactionList } from "@/templates/composites/transactionList";

import type { Account, Transaction } from "@/app/api/_mock-data";

type AccountDetailResponse = {
  account: Account;
  recentTransactions: Transaction[];
};

async function getAccountDetails(id: string) {
  const headersList = await headers();
  const host = headersList.get("host");

  if (!host) {
    notFound();
  }

  const protocol = headersList.get("x-forwarded-proto") ?? "http";
  const response = await fetch(`${protocol}://${host}/api/accounts/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to load account details");
  }

  return (await response.json()) as AccountDetailResponse;
}

export default async function AccountDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { account, recentTransactions } = await getAccountDetails(id);

  return (
    <div className="container flex flex-col gap-6 pb-24 pt-4">

      <CardPreview accountId={account.id} accountType={account.accountType} balance={account.availableBalance} status={account.status} accountNumber={account.accountNumber}/>
      <section className="flex flex-col gap-3">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-primary-dark">
            Recent transactions
          </h2>
          <Link
            href={`/accounts/${account.id}/transactions`}
            className="text-sm font-semibold text-primary"
          >
            View all
          </Link>
        </div>
        <TransactionList transactions={recentTransactions} />
      </section>
    </div>
  );
}
