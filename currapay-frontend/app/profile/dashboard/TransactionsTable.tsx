import { ArrowRightIcon } from "@heroicons/react/20/solid";
import { MaterialSymbol } from "react-material-symbols";

const DUMMY_TRANSACTIONS = [
  {
    date: "01-01-2025 12:00 AM",
    provider: "Currency Solutions",
    amount: "200",
    from: "USD",
    to: "GBP",
    status: "Completed",
  },
  {
    date: "01-01-2025 12:00 AM",
    provider: "Western Union",
    amount: "100000",
    from: "USD",
    to: "GBP",
    status: "In progress",
  },
  {
    date: "01-01-2025 12:00 AM",
    provider: "XE",
    amount: "5000",
    from: "USD",
    to: "GBP",
    status: "In progress",
  },
  {
    date: "01-01-2025 12:00 AM",
    provider: "Currency Solutions",
    amount: "200",
    from: "USD",
    to: "GBP",
    status: "Completed",
  },
  {
    date: "01-01-2025 12:00 AM",
    provider: "OFX",
    amount: "100",
    from: "USD",
    to: "GBP",
    status: "Completed",
  },
  {
    date: "01-01-2025 12:00 AM",
    provider: "Remitly",
    amount: "500",
    from: "USD",
    to: "GBP",
    status: "Completed",
  },
];

enum TransactionStatus {
  COMPLETED = "Completed",
  PENDING = "In progress",
}

export const TransactionsTable = () => {
  function formatNumber(value: string) {
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <div>
      {/* <div className="mt-4 w-full">
      <div className="flex w-full flex-col items-center justify-between space-y-2 sm:flex-row sm:space-y-0">
        <form className="relative flex w-full max-w-2xl items-center">
          <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8" className=""></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
          </svg>
          <input type="name" name="search" className="h-12 w-full border-b-gray-400 bg-transparent py-4 pl-12 text-sm outline-none focus:border-b-2" placeholder="Search by Order ID, Date, Customer" />
        </form>

        <button type="button" className="relative mr-auto inline-flex cursor-pointer items-center rounded-full border border-gray-200 bg-white px-5 py-2 text-center text-sm font-medium text-gray-800 hover:bg-gray-100 focus:shadow sm:mr-0">
          <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
          <svg className="mr-2 h-3 w-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </button>
      </div>
    </div> */}

      <div className="mt-6 overflow-hidden rounded-xl bg-white border border-secondary/30 shadow px-4 lg:px-6">
        <table className="min-w-full border-collapse border-spacing-y-2 border-spacing-x-2">
          <thead className="hidden border-b border-secondary/30 lg:table-header-group">
            <tr className="w-full font-semibold uppercase">
              <td className="whitespace-normal py-4 w-3/12">Date</td>
              <td className="whitespace-normal py-4 w-3/12">
                Provider
              </td>
              <td className="whitespace-normal py-4 w-2/12">
                Corridor
              </td>
              <td className="whitespace-normal py-4 w-3/12">
                Amount
              </td>
              <td className="whitespace-normal py-4 w-1/12">
                Status
              </td>
            </tr>
          </thead>

          <tbody className="bg-white lg:border-secondary/30">
            {DUMMY_TRANSACTIONS.map((transaction, i) => (
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
                      {transaction.date}
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
                        <p>{transaction.from}</p>
                        <ArrowRightIcon className="h-4 w-4" />
                        <p>{transaction.to}</p>
                      </span>
                    </div>
                  </div>
                </td>

                <td className="whitespace-no-wrap hidden py-6 lg:table-cell">
                  {transaction.date}
                </td>
                <td className="whitespace-no-wrap hidden py-6 lg:table-cell">
                  {transaction.provider}
                </td>

                <td className="whitespace-no-wrap hidden py-6 lg:inline-flex items-center space-x-1">
                  <p>{transaction.from}</p>
                  <ArrowRightIcon className="h-4 w-4" />
                  <p>{transaction.to}</p>
                </td>
                <td className="whitespace-nowrap py-6 text-right lg:text-left">
                  <span className="font-semibold lg:font-normal">
                    {formatNumber(transaction.amount)}{" "}
                    {transaction.from}
                  </span>

                  {transaction.status ===
                  TransactionStatus.COMPLETED ? (
                    <span className="mt-1 ml-auto block w-fit lg:hidden whitespace-nowrap rounded-md bg-green-200 px-2 py-1 text-green-800 font-medium">
                      {TransactionStatus.COMPLETED}
                    </span>
                  ) : (
                    <span className="mt-1 ml-auto block w-fit lg:hidden whitespace-nowrap rounded-md bg-yellow-100 px-2 py-1 text-yellow-800 font-medium">
                      {TransactionStatus.PENDING}
                    </span>
                  )}
                </td>
                <td className="whitespace-nowrap hidden py-6 lg:table-cell">
                  {transaction.status ===
                  TransactionStatus.COMPLETED ? (
                    <span className="whitespace-nowrap rounded-md bg-green-200 px-2 py-1 text-green-800 font-medium">
                      {TransactionStatus.COMPLETED}
                    </span>
                  ) : (
                    <span className="whitespace-nowrap rounded-md bg-yellow-100 px-2 py-1 text-yellow-800 font-medium">
                      {TransactionStatus.PENDING}
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
