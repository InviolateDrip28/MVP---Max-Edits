import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";


/**
 * Reusable accordion component
 * source: https://flowbite-react.com/docs/components/accordion
 */

export default function AccordionMenu({itemList}: {itemList: {label: string, content: string}[]}) {
  return (
    <Accordion collapseAll className="border-0 divide-y-2 divide-secondary/5">
      {itemList.map((item) => (
        <AccordionPanel key={item.label}>
          <AccordionTitle
            theme={{
              open: {
                on: "bg-inherit",
              },
            }}
            className="focus:ring-0 text-inherit hover:bg-inherit link focus:text-accent"
          >
            {item.label}
          </AccordionTitle>
          <AccordionContent className="border-none">
            <p className="mt-4 mb-2 text-left text-secondary">
              {item.content}
            </p>
          </AccordionContent>
        </AccordionPanel>
      ))}
    </Accordion>
  );
}
