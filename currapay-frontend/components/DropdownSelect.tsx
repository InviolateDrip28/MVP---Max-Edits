"use client";

import { useState, useEffect } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
  Label,
} from "@headlessui/react";
import {
  CheckIcon,
  ChevronDownIcon,
} from "@heroicons/react/20/solid";
import Image from "next/image";

/**
 * Reusable dropdown select component
 * source: https://headlessui.com/react/listbox
 */

// TODO: switch to combo box?

export interface DropdownSelectProps {
  dropdownList?: string[];
  reference: Record<string, string>;
  defaultValue: string;
  label?: string;
  textStyles?: string;
  hasImage?: boolean;
  setSelected: any;
  className?: string;
}

export default function DropdownSelect(props: DropdownSelectProps) {
  const [selected, setSelected] = useState(props.defaultValue);

  useEffect(() => {
    setSelected(props.defaultValue);
  }, [props.defaultValue]);

  return (
    <Listbox value={selected} onChange={props.setSelected}>
      <div className="relative w-full">
        {props.label && (
          <Label className="bg-accent block font-semibold leading-6 py-1.5 pl-3 text-white rounded-t-md border border-secondary/30">
            {props.label}
          </Label>
        )}
        <ListboxButton
          className={`relative w-full rounded-md bg-white py-1.5 pl-3 text-left shadow-sm border border-secondary/30 focus:outline-none sm:leading-6 ${props.dropdownList ? 'cursor-pointer pr-9' : 'cursor-default pr-3'} ${
            props.label && "rounded-t-none border-t-0"
          }`}
        >
          <span className="flex items-center">
            {props.hasImage && (
              <img
                alt={selected}
                src={`https://flagsapi.com/${selected}/flat/64.png`}
                className="h-5 w-5 flex-shrink-0"
              />
            )}
            <span
              className={`${
                props.hasImage && "ml-1.5"
              } ${props.textStyles && props.textStyles} block truncate xl:min-w-[4ch] xl:max-w-[12ch] 2xl:min-w-[12ch] 2xl:max-w-[50ch]`}
            >
              {props.reference[selected]}
            </span>
          </span>
          {props.dropdownList && (
            <span className="pointer-events-none absolute inset-y-0 right-0 ml-3 flex items-center pr-2">
              <ChevronDownIcon
                aria-hidden="true"
                className="h-5 w-5 text-secondary/40"
              />
            </span>
          )}
        </ListboxButton>

        {props.dropdownList && (
          <ListboxOptions
            transition
            className="absolute z-20 mt-1 max-h-56 w-full overflow-auto no-scrollbar rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none data-[closed]:data-[leave]:opacity-0 data-[leave]:transition data-[leave]:duration-100 data-[leave]:ease-in sm:text-sm backdrop-blur-xl"
          >
            {props.dropdownList.map((code) => (
              <ListboxOption
                key={code}
                value={code}
                className={`${
                  props.hasImage && "pl-3"
                } group relative cursor-pointer select-none py-2 pr-9 data-[focus]:bg-accent/80 data-[focus]:text-white"`}
              >
                <div className="flex items-center">
                  {props.hasImage && (
                    <img
                      alt={code}
                      src={`https://flagsapi.com/${code}/flat/64.png`}
                      className="h-5 w-5 flex-shrink-0"
                    />
                  )}
                  <span className="ml-3 block truncate font-normal group-data-[selected]:font-semibold">
                    {props.reference[code]}
                  </span>
                </div>
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-accent group-data-[focus]:text-white [.group:not([data-selected])_&]:hidden">
                  <CheckIcon aria-hidden="true" className="h-5 w-5" />
                </span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        )}
      </div>
    </Listbox>
  );
}
