import { useState } from "react";
import { COUNTRY_CODE_TO_CURRENCY } from "@/app/constants";

interface TableProps {
  data: any[];
}

const RatesTable = (props: TableProps) => {
  const [currRow, setCurrRow] = useState(0);
  const [currCol, setCurrCol] = useState(0);

  return (
    <div className="relative">
      <table className="table-fixed w-full h-full overflow-x-scroll">
        <thead>
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
        <tbody>
          {props.data.map((country, rowIndex) => (
            <tr key={country}>
              <th>
                <div
                  className={`text-right pl-2 pr-2 mr-2 whitespace-nowrap inline-flex items-center justify-center ${
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
      </table>
    </div>
  );
};

export default RatesTable;
