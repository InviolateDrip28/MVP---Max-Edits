"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Compare({
  params,
}: {
  params: { from: string };
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [from, to, amount] = [
    searchParams.get("from"),
    searchParams.get("to"),
    searchParams.get("amount"),
  ];

  return (
    <section id="compare-rates">
      <p>{from} {to} {amount}</p>
    </section>
  );
}
