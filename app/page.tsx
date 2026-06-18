"use client";

import type { DashboardResponse } from "@/app/api/_mock-data";
import { Icon } from "@/templates/components/icon";
import { formatCurrency, useFetch } from "@/utils";
import { QuickActions } from "@/templates/composites/quickActions";
import type { SummaryItem } from "@/templates/composites/summaries";
import { Summaries } from "@/templates/composites/summaries";
import { AccountSelector } from "@/templates/components/accountSelector";

type DashboardData = DashboardResponse;

export default function DashboardPage() {
  const {
    data: dashboardData,
    error,
    loading,
  } = useFetch<DashboardData>("/api/dashboard");

  const summaries: SummaryItem[] = [
    {
      id: "monthly-deposits",
      title: "Deposits",
      amount: dashboardData?.summaryCards?.monthlyDeposits ?? 0,
      icon: "ic:round-trending-up",
      tone: "success",
    },
    {
      id: "monthly-withdrawals",
      title: "Withdrawals",
      amount: dashboardData?.summaryCards?.monthlyWithdrawals ?? 0,
      icon: "ic:sharp-trending-down",
      tone: "error",
    },
  ];

  return (
    <>
      <section className="relative grid h-auto grid-cols-1 grid-rows-[auto_auto_auto_auto] items-start md:grid-cols-[3fr_4fr] md:grid-rows-1 lg:grid-cols-[3fr_2fr] lg:bg-primary-dark lg:p-8">
        <div className="relative z-2 col-span-1 col-start-1 row-span-1 row-start-1 flex h-full min-h-32 overflow-hidden bg-primary-dark py-2 text-white md:col-span-2 md:col-start-1">
          <div className="container flex grow flex-col justify-center gap-2">
            <div className="flex grow flex-col justify-center gap-2">
              <span className="text-3xl font-medium leading-none text-white sm:text-3xl">
                Hi, {dashboardData?.firstName ?? ""}
              </span>
            </div>
          </div>

          <Icon
            name="streamline-cyber:origami-paper-bird"
            className="absolute -right-10 -top-14 z-50 aspect-square w-80 text-primary opacity-5 md:right-1/4 md:scale-130"
          />
        </div>

        <div className="container z-10 col-span-1 col-start-1 row-span-1 row-start-2 my-4 flex w-full flex-col gap-3 md:relative md:col-start-2 md:row-start-1 md:h-full">
          <div className="relative flex h-auto w-full items-center overflow-hidden rounded-md bg-white p-6 text-primary-dark shadow-lg ring-1 ring-neutral-light">
            <div className="flex min-w-0 flex-col gap-2">
              <span className="label">Total Balance</span>
              <span className="text-3xl font-bold leading-none sm:text-4xl">
                {formatCurrency(dashboardData?.totalAccountBalance ?? 0)}
              </span>
            </div>
          </div>
          <Summaries summaries={summaries} />
        </div>

        <svg
          viewBox="0 0 10 3"
          className="col-span-1 col-start-1 row-start-2 w-full fill-primary-dark md:hidden"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M5 2C2.89696 2 0 1 0 1V0H10V1C10 1 7.10304 2 5 2Z" />
        </svg>
      </section>

      <div className="container grid grid-cols-2 gap-6 pb-24 pt-4 md:grid-cols-4">
        <hr className="col-span-2 text-neutral-light md:hidden" />
        <QuickActions actions={dashboardData?.quickActions} />
        <hr className="col-span-2 text-neutral-light md:hidden" />
        <div className="col-span-2 flex flex-col gap-4">
          {loading
            ? Array.from({ length: 3 }, (_, index) => (
                <AccountSelector key={index} loading />
              ))
            : null}
          {error ? (
            <p className="rounded-md border border-utility-error p-4 text-sm text-utility-error">
              Unable to load dashboard data.
            </p>
          ) : null}
          {!loading && !error
            ? dashboardData?.accounts.map((account) => (
                <AccountSelector
                  key={account?.id}
                  accountType={account?.accountType}
                  balance={account?.availableBalance}
                  accountNumber={account?.accountNumber}
                  status={account.status}
                  accountId={account?.id}
                />
              ))
            : null}
        </div>
      </div>
    </>
  );
}
