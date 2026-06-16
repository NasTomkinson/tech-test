"use client";

import { useEffect, useState } from "react"
import { Icon } from "@/components/icon"
import { QuickAction } from "@/components/quickAction";
import { Logo } from "@/templates/components/logo";
import { CardType } from "@/templates/components/cardType";
import { formatCurrency } from "@/utils/formatCurrency";

export default function DashboardPage() {

  const [dashboardData, setDashboardData] = useState(null);

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

  return (
    <>
      <div className="bg-primary/20 rounded-b-lg min-h-[200px]">
        <div className="container p-4">
          <Logo /> 
          <p className="text-lg font-medium pt-4"> Good Morning { dashboardData?.user?.fullName } </p>              
        </div> 
      </div>
{/* 
      <div> 
        <div className="container p-4"> 
          <div className="relative bg-primary text-white rounded p-4 flex flex-col gap-3">   
            <span className="font-medium text-sm"> Total account balance </span>
            <span className="text-2xl font-bold">  { formatCurrency(dashboardData?.totalAccountBalance?.toFixed(2)) } </span>
          </div>
        </div>    
      </div>

      <div>
        <div className="container p-4">
          <div className="flex flex-col gap-4">
            <CardType  />
            <CardType  />
            <CardType  />
          </div>
        </div>
      </div> */}
    </>
  )
}
