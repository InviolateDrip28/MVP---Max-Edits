import {
  Accordion,
  AccordionContent,
  AccordionPanel,
  AccordionTitle,
} from "flowbite-react";

const DUMMY_QUESTIONS = [
  { question: "Question", answer: "This is an amazing answer" },
  { question: "Question", answer: "This is an even better answer" },
  {
    question: "Question",
    answer: "Omg this is the best answer ever",
  },
];
export default function AccordionMenu() {
  return (
    <Accordion collapseAll className="border-0 divide-y-2 divide-secondary/5">
      {DUMMY_QUESTIONS.map((question) => (
        <AccordionPanel key={question.question}>
          <AccordionTitle
            theme={{
              open: {
                on: "bg-inherit",
              },
            }}
            className="focus:ring-0 text-primary hover:bg-inherit hover:underline underline-offset-8 focus:text-accent"
          >
            {question.question}
          </AccordionTitle>
          <AccordionContent className="border-none">
            <p className="mt-4 mb-2 text-left text-secondary">
              {question.answer}
            </p>
          </AccordionContent>
        </AccordionPanel>
      ))}
    </Accordion>
  );
}
