import {
  Document,
  Font,
  Page as PagePrimitive,
  Text,
  View,
} from "@react-pdf/renderer";
import clsx from "clsx";
import { ReactNode } from "react";
import createTw from "react-pdf-tailwind";
import InterBlack from "../fonts/Inter-Black.ttf";
import InterBold from "../fonts/Inter-Bold.ttf";
import InterLight from "../fonts/Inter-Light.ttf";
import InterMedium from "../fonts/Inter-Medium.ttf";
import InterRegular from "../fonts/Inter-Regular.ttf";
import InterSemiBold from "../fonts/Inter-SemiBold.ttf";
import InterThin from "../fonts/Inter-Thin.ttf";

interface PagePDFProps {
  children: ReactNode;
}

Font.register({
  family: "Inter",
  fontStyle: "normal",
  fontWeight: "normal",
  fonts: [
    {
      src: InterThin,
      fontWeight: "thin",
    },
    {
      src: InterLight,
      fontWeight: "light",
    },
    {
      src: InterRegular,
      fontWeight: "regular",
    },
    {
      src: InterMedium,
      fontWeight: "medium",
    },
    {
      src: InterSemiBold,
      fontWeight: "semibold",
    },
    {
      src: InterBold,
      fontWeight: "bold",
    },
    {
      src: InterBlack,
      fontWeight: "black",
    },
  ],
});

export const tw = createTw({
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
});

const PagePDF = ({ children }: PagePDFProps) => {
  return (
    <>
      <Document>{children}</Document>
    </>
  );
};

interface PageProps {
  children: ReactNode;
}

const Page = ({ children }: PageProps) => {
  return (
    <>
      <PagePrimitive size="A4" style={tw("font-sans")}>
        {children}
        <PDF.Footer />
      </PagePrimitive>
    </>
  );
};

const Ball = ({
  number,
  style,
  checked = false,
}: {
  number: number;
  style?: string;
  checked?: boolean;
}) => (
  <>
    <View
      style={tw(
        clsx(
          "w-[12mm] h-[12mm] text-sm font-black rounded-full bg-gray-300 text-center",
          style,
          checked && "bg-[#286CFF] text-white"
        )
      )}
    >
      <Text style={tw("my-auto")}>{number}</Text>
    </View>
  </>
);

const Footer = () => {
  return (
    <>
      <View style={tw("absolute bottom-0 h-[20mm] w-full text-center")}>
        <View style={tw("my-auto")}>
          <Text style={tw("uppercase text-sm font-bold")}>
            Mais informações em: bolaodaquina.com.br
          </Text>
          <Text style={tw("text-xs font-bold mt-2")}>
            <>
              {new Intl.DateTimeFormat("pt").format()}
              {" - "}
              {new Date()
                .getHours()
                .toLocaleString("pt-br", { minimumIntegerDigits: 2 }) +
                "h:" +
                new Date()
                  .getMinutes()
                  .toLocaleString("pt-br", { minimumIntegerDigits: 2 })}
            </>
          </Text>
        </View>
      </View>
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

export const PDF = {
  Root: PagePDF,
  Page: Page,
  Ball,
  Footer,
};
