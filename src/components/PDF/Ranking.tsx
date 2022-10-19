import { Text, View } from "@react-pdf/renderer";
import clsx from "clsx";
import { useContext, useMemo } from "react";
import { DataProps, PDFContext } from "../../contexts/PDFContexts";
import { Ball } from "./Ball";
import { tw } from "./PDF";

interface RankingHeaderProps {
  isFeatured?: boolean;
}

const RankingHeader = ({ isFeatured = false }: RankingHeaderProps) => {
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

interface RankingBodyProps {
  data: DataProps[];
  isFeatured?: boolean;
}

const RankingBody = ({ data, isFeatured = false }: RankingBodyProps) => {
  const { rankingScoreMin, rankingScoreMax } = useContext(PDFContext);

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
                <Ball
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

export const Ranking = {
  Header: RankingHeader,
  Body: RankingBody,
};
