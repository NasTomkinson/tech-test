"use client";

import { useEffect, useState } from "react"

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

  return <p>/dashboard</p>;
}
