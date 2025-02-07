import { useState } from "react";
import { COUNTRY_CODE_TO_CURRENCY } from "@/app/constants";
import { trpc } from "@/utils/trpc";
import ratesData from "../../currapay-backend/src/data/rates.json"

const RatesTable = () => {
  const [currRow, setCurrRow] = useState(0);
  const [currCol, setCurrCol] = useState(0);

  const countries = ["US", "GB", "EU", "CA", "CH", "AU", "BR", "JP"];

  const { data, error, isLoading } = trpc.ratesData.useQuery();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error loading data: {error.message}</div>;
  }


  return (
    <div className="w-full overflow-x-auto">
      <table className="lg:w-full whitespace-nowrap m-0 table-fixed">
        <thead>
          <tr>
            <th className="sticky z-20 left-0 top-0 bg-white px-4 mx-6"></th>
            {countries.map((country, colIndex) => (
              <th key={colIndex} className="sticky z-10 top-0">
                <div
                  className={`whitespace-nowrap inline-flex
                     items-center justify-center text-center mb-2 px-2 mx-4 ${
                       currCol == colIndex &&
                       "border-b-4 border-b-accent"
                     }`}
                >
                  {country == "EU" ? (
                    <img
                      alt={country}
                      src={`/eu-flag.png`}
                      className="h-3.5 pr-2"
                    />
                  ) : (
                    <img
                      alt={country}
                      src={`https://flagsapi.com/${country}/flat/64.png`}
                      className="h-5 pr-2"
                    />
                  )}

                  {COUNTRY_CODE_TO_CURRENCY[country]}
                </div>
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {countries.map((country, rowIndex) => (
            <tr key={country}>
              <th className="sticky left-0 z-20 bg-white pr-6">
                <div
                  className={`text-right items-center justify-center whitespace-nowrap px-2 inline-flex ${
                    currRow == rowIndex &&
                    " border-b-4 border-b-accent"
                  }`}
                >
                  {country == "EU" ? (
                    <img
                      alt={country}
                      src={`/eu-flag.png`}
                      className="h-3.5 pr-2"
                    />
                  ) : (
                    <img
                      alt={country}
                      src={`https://flagsapi.com/${country}/flat/64.png`}
                      className="h-5 pr-2"
                    />
                  )}
                  1 {COUNTRY_CODE_TO_CURRENCY[country]}
                </div>
              </th>
              {countries.map((_, colIndex) => (
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
                  {/* {rowIndex === colIndex ? "" : "1.00"} */}
                  {isLoading || 
                  !data ||
                  data[rowIndex] === undefined ||
                  data[rowIndex][colIndex] === undefined
                    ? "N/A"
                    : data[rowIndex][colIndex] !== "N/A"
                    ? data[rowIndex][colIndex]
                    : "-"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default trpc.withTRPC(RatesTable);
