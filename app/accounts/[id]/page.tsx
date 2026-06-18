import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { CardPreview } from "@/templates/components/cardPreview";
import { TransactionList } from "@/templates/composites/transactionList";
import { formatCurrency } from "@/utils";

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
    <div className="container flex flex-col gap-6 pt-4 md:grid md:grid-cols-[auto_1fr] md:items-start">

      <div className="flex flex-row items-start md:flex-col  justify-start gap-8 ">
        <CardPreview accountId={account.id} accountType={account.accountType} balance={account.availableBalance} status={account.status} accountNumber={account.accountNumber}/>
        <ul className="flex flex-col gap-1 md:gap-2 md:mt-6 border-l border-neutral-light pl-8 md:border-0 md:pl-0">
          <li className="flex flex-col"> 
            <span className="label"> Account status </span>
            <span className="text-lg font-medium text-succes"> {account?.status}</span> 
          </li> 
          <li className="flex flex-col"> 
            <span className="label"> Account Number </span>
            <span className="text-lg font-medium"> {account?.accountNumber} </span>
          </li>
          <li className="flex flex-col"> 
            <span className="label"> Available Balance </span>
            <span className="text-lg font-medium"> {formatCurrency(account?.availableBalance)} </span>
          </li>
        </ul>
      </div>
  
      <section className="flex flex-col gap-3 md:col-start-2 border-t md:border-l md:border-t-0 border-neutral-light md:max-w-4xl pt-4 md:px-4 md:pt-0 mx-auto w-full">
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
