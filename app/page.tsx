"use client";

import { useEffect, useState } from "react"
import type { mockDashboard } from "@/app/api/_mock-data";
import { Icon } from "@/templates/components/icon"
import { formatCurrency } from "@/utils/formatCurrency";
import { QuickActions } from "@/templates/composites/quickActions";
import type { SummaryItem } from "@/templates/composites/summaries";
import { Summaries } from "@/templates/composites/summaries";
import { AccountSelector } from "@/templates/components/accountSelector";

type DashboardData = typeof mockDashboard;

export default function DashboardPage() {

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);

  useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await fetch("/api/dashboard");
        const data = await response.json();
        setDashboardData(data);
        console.log("Dashboard data:", data);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      }
    }

    fetchData();
  }, []);

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
      <section className="relative grid grid-cols-1 lg:grid-cols-[2fr_1fr] grid-rows-[auto_auto_auto] lg:p-8 lg:bg-primary-dark items-start h-auto">

        <div className="relative min-h-40 overflow-hidden bg-primary-dark text-white flex col-start-1 col-span-1 row-start-1 row-span-1 py-2">
          <div className="container flex flex-col justify-center gap-2 grow"> 
            <div className="flex flex-col justify-center gap-2 grow">
              <span className="text-3xl font-medium leading-none text-white sm:text-3xl">
                Hi, {dashboardData?.user?.firstName}
              </span>              
            </div>

            <span className="font-semibold text-white">
              Your summary
            </span>
          </div>
          
          <Icon
            name="streamline-cyber:origami-paper-bird"
            className="absolute -right-10 -top-10 w-60 aspect-square text-primary-light opacity-5 z-50"
          />
        </div>

        <div className="z-10 mx-auto w-full px-3 sm:px-5 md:px-6 lg:relative lg:h-full flex flex-col gap-3 col-start-1 col-span-1 row-start-2 row-span-1 grid-rows-[auto_auto]">
          <div className="container relative flex items-center overflow-hidden rounded-md w-full h-auto bg-white text-primary-dark shadow-lg ring-1 ring-neutral-light p-6">
            <div className="flex min-w-0 flex-col gap-2">
              <span className="text-[10px] uppercase tracking-wide text-neutral-dark sm:text-xs">
                Total Balance
              </span>
              <span className="text-3xl font-bold leading-none sm:text-4xl">
                {formatCurrency(dashboardData?.totalAccountBalance ?? 0)}
              </span>
            </div>
          </div>
          <Summaries summaries={summaries} />
        </div>
        
        <svg viewBox="0 0 10 3" className="fill-primary-dark row-start-2 col-start-1 col-span-1 w-full" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 2C2.89696 2 0 1 0 1V0H10V1C10 1 7.10304 2 5 2Z"/>
        </svg> 
      </section>

      <div className="container grid grid-cols-2 md:grid-cols-4 gap-8 pt-8 pb-24">
        <hr className="col-span-2 text-neutral-light" />
        <QuickActions actions={dashboardData?.quickActions} />
        <hr className="col-span-2 text-neutral-light" />
        <div className="flex flex-col gap-4 col-span-2">
          {dashboardData?.accounts.map(account => (
            <AccountSelector 
              key={account?.id}
              accountType={account?.accountType} 
              balance={account?.availableBalance} 
              accountNumber={account?.accountNumber} 
              status={account.status}
              accountId={account?.id}
            />
          ))}
                 
        </div>

      </div>
    </>
  )
}
