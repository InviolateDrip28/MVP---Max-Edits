/* eslint-disable @next/next/no-img-element */
import {
  Combobox,
  ComboboxButton,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
} from "@headlessui/react";
import {
  CheckIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";

/* https://headlessui.com/react/combobox */

export interface SearchboxProps {
  optionsList: string[];
  reference: Record<string, string>;
  reference2?: Record<string, string>;
  defaultValue: string;
  setSelected: any;
}

export default function Searchbox(props: SearchboxProps) {
  const [selected, setSelected] = useState(props.defaultValue);
  const [query, setQuery] = useState("");

  useEffect(() => {
    setSelected(props.defaultValue);
  }, [props.defaultValue]);

  const OPTIONS =
    query === ""
      ? props.optionsList
      : props.optionsList.filter((option) =>
          option
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  return (
    <div className="relative w-full">
      <Combobox
        immediate={true}
        value={selected}
        onClose={() => setQuery("")}
        onChange={(value) => {
          if (value !== null) {
            setSelected(value);
            props.setSelected(props.reference[value]);
          }
        }}
      >
        <div className="relative ">
          <div className="group relative flex items-center w-full rounded-md bg-white py-0 lg:py-1 px-3.5 text-left shadow-sm border border-secondary/30 sm:leading-6 focus-within:border-accent focus-within:ring-1 focus-within:ring-accent">
            <img
              alt={selected}
              src={`https://flagsapi.com/${props.reference[selected]}/flat/64.png`}
              className="cursor-default h-5 w-5 flex-shrink-0"
            />
            <ComboboxInput
              className="w-full border-none focus:ring-0 focus:outline-none mr-3 text-base sm:text-lg 2xl:text-2xl tracking-wide"
              displayValue={() =>
                props.reference2 !== undefined
                  ? `${selected} (${
                      props.reference2[props.reference[selected]]
                    })`
                  : selected
              }
              defaultValue={
                props.reference2 !== undefined
                  ? `${selected} (${
                      props.reference2[props.reference[selected]]
                    })`
                  : selected
              }
              onChange={(event) => setQuery(event.target.value)}
              autoComplete="off"
            />
            <span>
              
            </span>
            <ComboboxButton className="absolute inset-y-0 right-4 ml-3 flex items-center">
              <MagnifyingGlassIcon
                className="h-5 w-5"
                aria-hidden="true"
              />
            </ComboboxButton>
          </div>
          <ComboboxOptions
            modal={false}
            transition
            className="absolute z-20 mt-1.5 max-h-60 w-full overflow-auto rounded-md bg-white glass py-2 shadow-lg ring-1 ring-secondary/30 focus:outline-none no-scrollbar"
          >
            {OPTIONS.length === 0 && query !== "" ? (
              <div className="relative cursor-default select-none py-2 px-2.5">
                Nothing found.
              </div>
            ) : (
              OPTIONS.map((option) => (
                <ComboboxOption
                  key={option}
                  className="group flex cursor-pointer items-center gap-3 py-3 px-3.5 select-none hover:bg-accent/80 data-[focus]:bg-accent/80"
                  value={option}
                >
                  {({ selected }) => (
                    <>
                      <img
                        alt={option}
                        src={`https://flagsapi.com/${props.reference[option]}/flat/64.png`}
                        className="cursor-default h-5 w-5 flex-shrink-0"
                      />
                      <p
                        className={`block truncate ${
                          selected ? "mr-6" : "mr-2"
                        }`}
                      >
                        {option}
                        {props.reference2 !== undefined && (
                          <span className="font-semibold">
                            {" "}
                            (
                            {
                              props.reference2[
                                props.reference[option]
                              ]
                            }
                            )
                          </span>
                        )}
                      </p>
                      {selected ? (
                        <div className="absolute items-center right-3 data-[selected]:text-white not([data-selected])_&]:hidden">
                          <CheckIcon
                            className="h-5 w-5"
                            aria-hidden="true"
                          />
                        </div>
                      ) : null}
                    </>
                  )}
                </ComboboxOption>
              ))
            )}
          </ComboboxOptions>
        </div>
      </Combobox>
    </div>
  );
}
