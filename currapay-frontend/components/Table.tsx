import { useState } from "react";
import { COUNTRY_CODE_TO_CURRENCY } from "@/app/constants";
import { trpc } from "@/utils/trpc";

interface TableProps {
  data: any[];
}

const RatesTable = (props: TableProps) => {
  // get the values for the table
  // const currencies = ["USD", "GBP", "EUR", "CAD", "CHF", "AUD", "RUB", "INR"];
  // RUB is not tradeable
  // INR is tradeable only between 07:00 to 17:30 NZST
  // sell currency cannot equal the currency of buy
  const currencies = ["GBP", "EUR", "CAD", "CHF", "AUD"];

  // these are the rates of selling USD to buy the currencies from the above list
  const { data, error, isLoading } = trpc.xe.getMultipleXeRates.useQuery({
    amount: 500,
    sell: "USD",
    buyArray: currencies,
    fixed_currency: "buy",
  });

  const handleSubmit = () => {
    if (error) {
      console.error("Error fetching data:", error);
    } else {
      console.log("Fetched data:", data);
    }
  };

  // Call handleSubmit when you want to send the data
  handleSubmit();
  
  const [currRow, setCurrRow] = useState(0);
  const [currCol, setCurrCol] = useState(0);

  return (
    <div className="w-full overflow-x-auto">
      <table className="lg:w-full whitespace-nowrap m-0 table-fixed">
        <thead>
          <tr>
            <th className="sticky z-20 left-0 top-0 bg-white px-4 mx-6"></th>
            {props.data.map((country, colIndex) => (
              <th key={colIndex} className="sticky z-10 top-0">
                <div
                  className={`whitespace-nowrap inline-flex
                     items-center justify-center text-center mb-2 px-2 mx-4 ${
                    currCol == colIndex &&
                    "border-b-4 border-b-accent"
                  }`}
                >
                  <img
                    alt={country}
                    src={`https://flagsapi.com/${country}/flat/64.png`}
                    className="h-5 pr-2"
                  />
                  {COUNTRY_CODE_TO_CURRENCY[country]}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {props.data.map((country, rowIndex) => (
            <tr key={country}>
              <th className="sticky left-0 z-20 bg-white pr-6">
                <div
                  className={`text-right items-center justify-center whitespace-nowrap px-2 inline-flex ${
                    currRow == rowIndex &&
                    " border-b-4 border-b-accent"
                  }`}
                >
                  <img
                    alt={country}
                    src={`https://flagsapi.com/${country}/flat/64.png`}
                    className="h-5 pr-2"
                  />
                  1 {COUNTRY_CODE_TO_CURRENCY[country]}
                </div>
              </th>
              {props.data.map((_, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className={`border border-secondary/40 text-center bg-secondary/10 items-center py-2 mx-12 ${
                    rowIndex !== colIndex &&
                    "hover:font-bold hover:cursor-pointer hover:bg-accent/30 bg-white"
                  }`}
                  onMouseEnter={() => {
                    setCurrRow(rowIndex);
                    setCurrCol(colIndex);
                  }}
                >
                  {rowIndex === colIndex ? "" : "1.00"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* <table className="table-fixed">
        <thead className="sticky">
          <tr className="">
            <th></th>
            {props.data.map((country, colIndex) => (
              <th key={colIndex} className={``}>
                <div
                  className={`whitespace-nowrap inline-flex items-center justify-center text-center pl-2 pr-2 mb-2 ${
                    currCol == colIndex &&
                    "border-b-4 border-b-accent"
                  }`}
                >
                  <img
                    alt={country}
                    src={`https://flagsapi.com/${country}/flat/64.png`}
                    className="h-5 pr-2"
                  />
                  {COUNTRY_CODE_TO_CURRENCY[country]}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {props.data.map((country, rowIndex) => (
            <tr key={country}>
              <th>
                <div
                  className={`sticky text-right pl-2 pr-2 mr-4 whitespace-nowrap inline-flex items-center justify-center ${
                    currRow == rowIndex &&
                    " border-b-4 border-b-accent"
                  }`}
                >
                  <img
                    alt={country}
                    src={`https://flagsapi.com/${country}/flat/64.png`}
                    className="h-5 pr-2"
                  />
                  1 {COUNTRY_CODE_TO_CURRENCY[country]}
                </div>
              </th>
              {props.data.map((_, colIndex) => (
                <td
                  key={`${rowIndex}-${colIndex}`}
                  className={`border border-secondary/40 text-center bg-secondary/10 items-center p-2  ${
                    rowIndex !== colIndex &&
                    "hover:font-bold hover:cursor-pointer hover:bg-accent/30 bg-white"
                  }`}
                  onMouseEnter={() => {
                    setCurrRow(rowIndex);
                    setCurrCol(colIndex);
                  }}
                >
                  {rowIndex === colIndex ? "" : rowIndex}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table> */}
    </div>
  );
};

export default RatesTable;
