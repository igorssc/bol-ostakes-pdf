import {
  Document,
  Font,
  Page as PagePrimitive,
  Text,
  View,
} from "@react-pdf/renderer";
import clsx from "clsx";
import { ReactNode, useMemo } from "react";
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

export type ParticipantProps = {
  name: string;
  dozens: number[];
};

export type DataProps = {
  name: string;
  draw: {
    dozens: {
      number: number;
      checked?: boolean | undefined;
    }[];
    score: number;
  };
};

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
  checked?: boolean | { style: string };
}) => (
  <>
    <View
      style={tw(
        clsx(
          "w-[12mm] h-[12mm] text-sm font-black rounded-full bg-gray-300 text-center",
          style,
          checked && "bg-[#286CFF] text-white",
          typeof checked === "object" && checked.style
        )
      )}
    >
      <Text style={tw("my-auto")}>{number}</Text>
    </View>
  </>
);

const RankingHeader = ({ isFeatured = false }: { isFeatured?: boolean }) => {
  return (
    <>
      <View
        style={tw(
          clsx(
            "mx-[5mm] h-[10mm] bg-[#D6E3FF] font-bold flex flex-row text-xs mt-6",
            isFeatured && "bg-[#286CFF] text-white"
          )
        )}
        fixed
      >
        <Text style={tw("my-auto inline-block w-[18mm] pl-3")}>Registro</Text>
        <Text style={tw("my-auto inline-block w-[18mm] pl-3")}>Pontos</Text>
        <Text style={tw("my-auto inline-block w-[84mm] pl-3")}>Nome</Text>
        <Text style={tw("my-auto inline-block w-[80mm] pl-3")}>Dezenas</Text>
      </View>
    </>
  );
};

const RankingBody = ({
  data,
  isFeatured = false,
}: {
  data: DataProps[];
  isFeatured?: boolean;
}) => {
  const scoreMin = !isFeatured ? rankingScoreMin(data) : null;

  const scoreMax = !isFeatured ? rankingScoreMax(data) : null;

  return useMemo(() => {
    return (
      <>
        {data.map(({ name, draw }, index) => (
          <View
            style={tw(
              clsx(
                "mx-[5mm] h-[10mm] flex flex-row text-xs",
                index % 2 !== 0 && "bg-[#ECECEC]",
                draw.score === scoreMax && index % 2 === 0 && "bg-[#DAF8E1]",
                draw.score === scoreMax && index % 2 !== 0 && "bg-[#C3E6CB]",
                draw.score === scoreMin && index % 2 === 0 && "bg-[#F8E0E2]",
                draw.score === scoreMin && index % 2 !== 0 && "bg-[#F5C6CB]",
                isFeatured && index % 2 !== 0 && "bg-[#D6E3FF]",
                isFeatured && index % 2 === 0 && "bg-[white]"
              )
            )}
            key={index}
            wrap={false}
            break={index === 18 || (index - 18) % 26 === 0}
          >
            <Text style={tw("my-auto inline-block w-[18mm] pl-3")}>
              {index + 1}
            </Text>
            <Text style={tw("my-auto inline-block w-[18mm] pl-3")}>
              {draw.score}
            </Text>
            <Text
              style={tw(
                "my-auto inline-block w-[84mm] pl-3 whitespace-nowrap overflow-hidden"
              )}
            >
              {name.toUpperCase()}
            </Text>
            <View style={tw("my-auto flex flex-row w-[80mm] pl-3")}>
              {draw.dozens.map((dozen) => (
                <PDF.Ball
                  number={dozen.number}
                  key={dozen.number}
                  style="mx-1 w-[6mm] h-[6mm] bg-transparent text-xs font-regular"
                  checked={
                    dozen.checked && {
                      style: clsx(
                        !isFeatured &&
                          draw.score === scoreMax &&
                          "bg-[#148f30]",
                        !isFeatured && draw.score === scoreMin && "bg-[#b32533]"
                      ),
                    }
                  }
                />
              ))}
            </View>
          </View>
        ))}
      </>
    );
  }, []);
};

const Footer = () => {
  return (
    <>
      <View style={tw("absolute bottom-0 h-[20mm] w-full text-center")} fixed>
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

export const rankingScoreMin = (data: DataProps[]) =>
  data.reduce(function (prev, current) {
    return prev.draw.score < current.draw.score ? prev : current;
  }).draw.score;

export const rankingScoreMax = (data: DataProps[]) =>
  data.reduce(function (prev, current) {
    return prev.draw.score > current.draw.score ? prev : current;
  }).draw.score;

export const dozensDrawn = (results: { date: string; dozens: number[] }[]) => {
  return results
    .map((value) => value.dozens)
    .reduce((acc, value) => acc.concat(value), [])
    .filter((value, i, arr) => arr.indexOf(value) === i)
    .sort((a, b) => a - b);
};

export const ranking = ({
  participants,
  results,
  isFeatured = false,
}: {
  participants: ParticipantProps[];
  results: number[];
  isFeatured?: boolean;
}) => {
  let participantsWithRanking = participants.map((participant) => ({
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
  }));

  if (isFeatured) {
    const scoreMax = rankingScoreMax(participantsWithRanking);

    participantsWithRanking = participantsWithRanking.filter((participant) => {
      return participant.draw.score === scoreMax;
    });
  }

  participantsWithRanking = participantsWithRanking
    .sort((a, b) => a.name.localeCompare(b.name))
    .sort((a, b) => b.draw.score - a.draw.score);

  return participantsWithRanking;
};

export const PDF = {
  Root: PagePDF,
  Page: Page,
  Ball,
  Ranking: { Header: RankingHeader, Body: RankingBody },
  Footer,
};
