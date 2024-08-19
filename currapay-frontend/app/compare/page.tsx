"use client";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useStores } from "@/stores/provider";

export default function Compare({
  params,
}: {
  params: { from: string };
}) {
  const { SearchStore } = useStores();
  const searchParams = useSearchParams();

  const [from, to, amount] = [
    searchParams.get("from"),
    searchParams.get("to"),
    searchParams.get("amount"),
  ];

  return (
    <section id="compare-rates">
      <p>
        {from} {to} {amount}
      </p>
    </section>
  );
}
