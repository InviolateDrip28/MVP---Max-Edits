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
    <Accordion collapseAll className="border-backgroundSecondary">
      {DUMMY_QUESTIONS.map((question) => (
        <AccordionPanel key={question.question}>
          <AccordionTitle
            theme={{
              open: {
                on: "bg-muted",
              },
            }}
            className="focus:ring-0 text-primary hover:bg-muted"
          >
            {question.question}
          </AccordionTitle>
          <AccordionContent>
            <p className="mb-2 text-left text-secondary">
              {question.answer}
            </p>
          </AccordionContent>
        </AccordionPanel>
      ))}
    </Accordion>
  );
}
