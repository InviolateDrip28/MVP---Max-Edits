import { Transaction } from "@/app/data";
import { trpc } from "@/utils/trpc";
import { useEffect, useState, useRef } from "react";
import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { MaterialSymbol } from "react-material-symbols";
import { useUserStore } from "@/stores/provider";

enum TransactionStatus {
  COMPLETED = "completed",
  PENDING = "pending",
}

/* TODO:  add loading, add error handling, fix date time */
export const TransactionsTable = () => {
  const userStore = useUserStore();
  const showTransactions = useRef(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const { data, error, isLoading } =
    trpc.transaction.getTransactionsByUserId.useQuery(
      userStore.id !== undefined ? userStore.id : -1
    );

  if (isLoading) {
    return (
      <div className="text-center mt-16 font-semibold text-secondary space-y-8 overflow-hidden rounded-xl bg-white border border-secondary/30 shadow p-4 lg:p-6">
        <h4>Loading your transactions...</h4>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-16 font-semibold text-secondary space-y-8 overflow-hidden rounded-xl bg-white border border-secondary/30 shadow p-4 lg:p-6">
        <h4>Error fetching transactions. Please try again later.</h4>
      </div>
    );
  }

  useEffect(() => {
    if (error) {
      console.error("Error fetching transactions:", error);
    }
    if (data) {
      if (data.length > 0) {
        showTransactions.current = true;
      }

      setTransactions(data);
      console.log("Fetched transactions:", data);
    }
  }, [data, error]);

  function formatAmount(value: number) {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  function formatDate(value: string) {
    const date = new Date(value);
    return date.toISOString().replace("T", ", ").substring(0, 17);
  }

  return (
    <div>
      {showTransactions.current ? (
        <div className="mt-6 overflow-hidden rounded-xl bg-white border border-secondary/30 shadow px-4 lg:px-6">
          <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
            <thead className="hidden border-b border-secondary/30 lg:table-header-group">
              <tr className="w-full font-semibold uppercase">
                <td className="whitespace-normal py-4 w-3/12">Date</td>
                <td className="whitespace-normal py-4 w-3/12">Provider</td>
                <td className="whitespace-normal py-4 w-2/12">Corridor</td>
                <td className="whitespace-normal py-4 w-3/12">Amount</td>
                <td className="whitespace-normal py-4 w-1/12">Status</td>
              </tr>
            </thead>

            <tbody className="bg-white lg:border-secondary/30">
              {transactions.map((transaction, i) => (
                <tr key={i} className="border-b border-secondary/10">
                  <td className="whitespace-nowrap py-6 text-left lg:hidden">
                    <div className="flex flex-col">
                      <div className="flex items-center">
                        <MaterialSymbol
                          icon="schedule"
                          fill={false}
                          size={20}
                          weight={300}
                          color="inherit"
                          className="mr-1"
                        />
                        {formatDate(transaction.updatedAt)}
                      </div>
                      <div className="flex items-center">
                        <MaterialSymbol
                          icon="domain"
                          fill={false}
                          size={20}
                          weight={300}
                          color="inherit"
                          className="mr-1"
                        />
                        {transaction.provider}
                      </div>
                      <div className="flex items-center">
                        <MaterialSymbol
                          icon="send_money"
                          fill={false}
                          size={20}
                          weight={300}
                          color="inherit"
                          className="mr-1"
                        />
                        <span className="flex items-center space-x-1">
                          <p>{transaction.currencyFrom}</p>
                          <ArrowRightIcon className="h-4 w-4" />
                          <p>{transaction.currencyFrom}</p>
                          <p>{transaction.currencyTo}</p>
                        </span>
                      </div>
                    </div>
                  </td>

                  <td className="whitespace-no-wrap hidden py-6 lg:table-cell">
                    {formatDate(transaction.updatedAt)}
                  </td>
                  <td className="whitespace-no-wrap hidden py-6 lg:table-cell">
                    {transaction.provider}
                  </td>

                  <td className="whitespace-no-wrap hidden py-6 lg:inline-flex items-center space-x-1">
                    <p>{transaction.currencyFrom}</p>
                    <ArrowRightIcon className="h-4 w-4" />
                    <p>{transaction.currencyFrom}</p>
                    <p>{transaction.currencyTo}</p>
                  </td>
                  <td className="whitespace-nowrap py-6 text-right lg:text-left">
                    <span className="font-semibold lg:font-normal">
                      {formatAmount(transaction.amount)}{" "}
                      {transaction.currencyFrom}
                    </span>

                    {transaction.status === TransactionStatus.COMPLETED ? (
                      <span className="mt-1 ml-auto block w-fit lg:hidden whitespace-nowrap rounded-md bg-green-200 px-2 py-1 text-green-800 font-medium">
                        Completed
                      </span>
                    ) : (
                      <span className="mt-1 ml-auto block w-fit lg:hidden whitespace-nowrap rounded-md bg-yellow-100 px-2 py-1 text-yellow-800 font-medium">
                        In progress
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap hidden py-6 lg:table-cell">
                    {transaction.status === TransactionStatus.COMPLETED ? (
                      <span className="whitespace-nowrap rounded-md bg-green-200 px-2 py-1 text-green-800 font-medium">
                        Completed
                      </span>
                    ) : (
                      <span className="whitespace-nowrap rounded-md bg-yellow-100 px-2 py-1 text-yellow-800 font-medium">
                        In progress
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center mt-16 font-semibold text-secondary space-y-8 overflow-hidden rounded-xl bg-white border border-secondary/30 shadow p-4 lg:p-6">
          <h4> No transactions yet.</h4>
          <h4 className="">
            Start sending money to track your transactions with CurraPay!
          </h4>
        </div>
      )}
    </div>
  );
};
