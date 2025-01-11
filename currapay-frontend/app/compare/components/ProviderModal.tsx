"use client";
import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import {
  PARTNER_NAMES_TO_DETAILS,
  PARTNER_NAMES_TO_PROMOTION,
} from "@/app/constants";
import { XMarkIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

/**
 * Modal component for the provider cards
 * source: https://headlessui.com/v1/react/dialog
 */

export interface ProviderModalProps {
  className?: string;
  buttonText: string;
  buttonStyle?: string;
  provider: string;
}

export default function ProviderModal(props: ProviderModalProps) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className={props.className}>
        <button
          type="button"
          onClick={openModal}
          className={props.buttonStyle ? props.buttonStyle : ""}
        >
          {props.buttonText}
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={closeModal}
        >
          <TransitionChild
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </TransitionChild>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center backdrop-blur-sm">
              <TransitionChild
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-lg bg-white px-4 py-6 md:px-8 md:py-12 text-left align-middle shadow-xl transition-all">
                  <XMarkIcon
                    className="absolute top-4 right-6 h-6 w-6 md:h-8 md:w-8 cursor-pointer"
                    onClick={closeModal}
                  />

                  <DialogTitle as="h3" className="font-semibold">
                    Promotion details
                  </DialogTitle>
                  <div className="mt-4 md:mt-8 mb-16 md:mb-28">
                    <ol className="list-disc ml-6 space-y-2 md:space-y-4">
                      {PARTNER_NAMES_TO_PROMOTION[
                        props.provider
                      ].description.map((text) => (
                        <li key={text}> {text}</li>
                      ))}
                    </ol>
                    {PARTNER_NAMES_TO_PROMOTION[props.provider]
                      .details && (
                      <p className="text-secondary/80 ml-2 mt-12 md:mt-20 space-x-2.5 md:space-x-1.5">
                        <span>*</span> 
                        <span>{PARTNER_NAMES_TO_PROMOTION[props.provider].details}</span>
                      </p>
                    )}
                  </div>

                  <div className="flex justify-center items-center">
                    <Link
                      className="absolute bottom-6 md:bottom-12 bg-accent hover:bg-accent/75 text-white rounded-lg py-2 px-3 md:py-4 md:px-6"
                      href={
                        PARTNER_NAMES_TO_DETAILS[props.provider].link
                      }
                    >
                      <p className="font-bold">
                        Go to{" "}
                        {
                          PARTNER_NAMES_TO_DETAILS[props.provider]
                            .displayName
                        }
                      </p>
                    </Link>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
