"use client";

import Chart from "react-apexcharts";
import type { ApexOptions } from "apexcharts";

export default function Rates() {
  
  const chartConfig = {
    type: "line",
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],

    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["black"],
      xaxis: {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
        },
        labels: {
          style: {
            colors: "black",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "black",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      fill: {
        opacity: 0.8,
      },
    },
  } as ApexOptions;

  return (
    <section className="justify-evenly">
      <h1>Rates</h1>
      <div className=" w-1/2">
        <Chart {...chartConfig} />
      </div>
    </section>
  );
}
