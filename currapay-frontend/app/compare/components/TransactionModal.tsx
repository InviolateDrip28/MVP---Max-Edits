"use client";
import { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { PARTNER_NAMES_TO_DETAILS } from "@/app/constants";
import { XMarkIcon } from "@heroicons/react/20/solid";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";
import Link from "next/link";
import { trpc } from "@/utils/trpc";

/**
 * Modal component to track transactions
 * source: https://headlessui.com/v1/react/dialog
 */

export interface TransactionModalProps {
  className?: string;
  provider: string;
}

const TransactionModal = (props: TransactionModalProps) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  function handleYes() {
    setIsOpen(false);
  }

  function handleNo() {
    setIsOpen(false);
  }

  return (
    <>
      <div className={props.className}>
        <Link
          className="inline-flex bg-accent hover:bg-accent/75 text-white rounded-lg py-1.5 px-2.5 md:py-2 md:px-3"
          href={PARTNER_NAMES_TO_DETAILS[props.provider].link}
          target="_blank"
          onClick={openModal}
        >
          <p className="font-bold">Go to provider</p>
          <div className="flex items-center ml-1">
            <OpenInNewIcon className="h-6 w-6" />
          </div>
        </Link>
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
                    Did you complete your transaction?
                  </DialogTitle>
                  <div className="mt-4 md:mt-8 mb-8 md:mb-16">
                    <p>
                      Let us know, and we&apos;ll help track your
                      transactions.
                    </p>
                  </div>

                  <div className="flex justify-center items-center space-x-8 font-bold">
                    <button
                      className="bg-accent hover:bg-accent/75 text-white rounded-lg py-2 px-3 md:py-4 md:px-6"
                      onClick={handleYes}
                    >
                      <h4>Yes</h4>
                    </button>
                    <button
                      className="bg-secondary hover:bg-secondary/75 text-white rounded-lg py-2 px-3 md:py-4 md:px-6"
                      onClick={handleNo}
                    >
                      <h4>No</h4>
                    </button>
                  </div>
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default trpc.withTRPC(TransactionModal);
