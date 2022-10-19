import { createContext, ReactNode } from "react";
import data from "../../data.json";
import participants from "../../participants1.json";

interface PDFProviderProps {
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

type DozensDrawProps = {
  date: string;
  dozens: number[];
};

type RankingProps = {
  results: number[];
  order?: "numeric" | "alphabetic";
};

type RankingFeaturesProps = {
  ranking: DataProps[];
  isFeatured?: boolean;
  isQuina?: boolean;
};

type RankingDataProps = {
  isFeatured?: boolean;
  isQuina?: boolean;
  order?: "numeric" | "alphabetic";
};

type PDFContextData = {
  lastResult: DozensDrawProps;
  rankingData: (props: RankingDataProps) => DataProps[];
  rankingScoreMin: (props: DataProps[]) => number;
  rankingScoreMax: (props: DataProps[]) => number;
  dozensDrawn: (props: DozensDrawProps[]) => number[];
  countDaysOfDraw: number;
};

export const PDFContext = createContext({} as PDFContextData);

export const PDFProvider = ({ children }: PDFProviderProps) => {
  const dozensDrawn = (results: DozensDrawProps[]) => {
    return results
      .map((value) => value.dozens)
      .reduce((acc, value) => acc.concat(value), [])
      .filter((value, i, arr) => arr.indexOf(value) === i)
      .sort((a, b) => a - b);
  };

  const lastResult = data.results.reduce((prev, current) =>
    new Date(prev.date).getTime() > new Date(current.date).getTime()
      ? prev
      : current
  );

  const dozens = ({ isLastResult = false }: { isLastResult?: boolean }) => {
    const results = isLastResult ? [lastResult] : data.results;

    return dozensDrawn(results);
  };

  const rankingScoreMin = (data: DataProps[]) => {
    return data.reduce(function (prev, current) {
      return prev.draw.score < current.draw.score ? prev : current;
    }).draw.score;
  };

  const rankingScoreMax = (data: DataProps[]) => {
    return data.reduce(function (prev, current) {
      return prev.draw.score > current.draw.score ? prev : current;
    }).draw.score;
  };

  const ranking = ({ results, order = "numeric" }: RankingProps) => {
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

    participantsWithRanking = participantsWithRanking.sort((a, b) =>
      a.name.localeCompare(b.name)
    );

    if (order === "numeric") {
      participantsWithRanking = participantsWithRanking.sort(
        (a, b) => b.draw.score - a.draw.score
      );
    }

    return participantsWithRanking as DataProps[];
  };

  const rankingFeatures = ({
    ranking,
    isFeatured,
    isQuina,
  }: RankingFeaturesProps) => {
    let participantsWithRanking = ranking;

    if (isQuina) {
      participantsWithRanking = participantsWithRanking.filter(
        (participant) => {
          return participant.draw.score === 5;
        }
      );
    }

    if (isFeatured) {
      const scoreMax = 4;

      participantsWithRanking = participantsWithRanking.filter(
        (participant) => {
          return participant.draw.score === scoreMax;
        }
      );
    }

    return participantsWithRanking;
  };

  const rankingData = ({
    isFeatured = false,
    isQuina = false,
    order,
  }: RankingDataProps) => {
    if (isFeatured || isQuina) {
      return rankingFeatures({
        ranking: ranking({
          results: dozens({ isLastResult: true }),
        }),
        isFeatured,
        isQuina,
      });
    }

    return ranking({
      results: dozens({}),
      order,
    });
  };

  const countDaysOfDraw = data.results.length;

  return (
    <PDFContext.Provider
      value={{
        lastResult,
        rankingData,
        rankingScoreMin,
        rankingScoreMax,
        dozensDrawn,
        countDaysOfDraw,
      }}
    >
      {children}
    </PDFContext.Provider>
  );
};
