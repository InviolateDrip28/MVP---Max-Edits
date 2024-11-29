"use client";

import type { ApexOptions } from "apexcharts";
import { observer } from "mobx-react";
import { SearchStore } from "@/stores/search.store";

const Rates = observer(() => {
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
        tooltip: {
          enabled: false,
        },
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
    <section id="ratesPage" className="items-center">
      <h1>Rates</h1>
      <div className="mt-8 bg-white flex flex-col items-center justify-center w-full py-8 px-16 rounded-xl shadow-xl">
        <div className="flex flex-col justify-center items-center">
          <p>Current mid-market exchange rate</p>
          <p>
            1 {SearchStore.fromCurrency} = 1.23 {SearchStore.toCurrency}
          </p>
        </div>
        {/* 
        <div className="h-1/2 w-3/4">
          <Chart {...chartConfig} />
        </div> */}
      </div>
    </section>
  );
});

export default Rates;
