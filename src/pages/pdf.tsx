import clsx from "clsx";
import { ReactNode } from "react";
import { PDFHighlight } from "./pdf-highlight";
import { PDFPlacing } from "./pdf-placing";
import { PDFResult } from "./pdf-result";
import { PDFResume } from "./pdf-resume";

export const Page = ({ children }: { children: ReactNode }) => (
  <>
    <div className="w-[210mm] h-[297mm] pb-[20mm] my-4 mx-auto relative border-2 border-black">
      <>
        {children}
        <Footer />
      </>
    </div>
  </>
);

export const Ball = ({
  number,
  checked = false,
  style,
}: {
  number: number;
  style?: string;
  checked?: boolean;
}) => (
  <>
    <span
      className={clsx(
        "flex items-center justify-center w-6 h-6 font-black p-5 rounded-full bg-gray-300",
        style,
        checked && "!bg-[#286cff] text-white"
      )}
    >
      {number}
    </span>
  </>
);

export const Footer = () => {
  return (
    <>
      <footer className="absolute bottom-0 text-center w-full h-[20mm] flex flex-col gap-3 justify-center items-center font-bold">
        <p className="uppercase text-sm">
          Mais informações em: bolaodaquina.com.br
        </p>
        <span className="text-xs">
          <>
            {new Intl.DateTimeFormat("pt").format()}
            {" - "}
            {new Date()
              .getHours()
              .toLocaleString("pt-br", { minimumIntegerDigits: 2 }) +
              "h" +
              new Date()
                .getMinutes()
                .toLocaleString("pt-br", { minimumIntegerDigits: 2 })}
          </>
        </span>
      </footer>
    </>
  );
};

export const dozensDrawn = (results: { date: string; dozens: number[] }[]) => {
  const r = results
    .map((value) => value.dozens)
    .reduce((acc, value) => acc.concat(value), [])
    .filter((value, i, arr) => arr.indexOf(value) === i)
    .sort((a, b) => a - b);

  return r;
};

export const ranking = (
  participants: {
    name: string;
    dozens: number[];
  }[],
  results: number[]
) => {
  const participantsWithRanking = participants
    .map((participant) => ({
      name: participant.name,
      draw: participant.dozens.reduce(
        (acc, value) =>
          results.includes(value)
            ? {
                dozens: acc.dozens.concat({ number: value, checked: true }),
                score: acc.score + 1,
              }
            : {
                dozens: acc.dozens.concat({ number: value }),
                score: acc.score,
              },
        { dozens: [], score: 0 } as {
          dozens: { number: number; checked?: boolean }[];
          score: number;
        }
      ),
    }))
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => b.draw.score - a.draw.score);

  return participantsWithRanking;
};

export const ExamplePDF = () => {
  return (
    <>
      <PDFResume />
      <PDFResult />
      <PDFHighlight />
      <PDFPlacing />
    </>
  );
};
