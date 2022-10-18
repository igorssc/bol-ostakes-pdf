import { Image, Text, View } from "@react-pdf/renderer";
import { useMemo } from "react";
import data from "../../../data.json";
import participants from "../../../participants1.json";
import cellIcon from "../../assets/cell.png";
import mensIcon from "../../assets/mens.png";
import { formatDate } from "../../utils/format";
import { dozensDrawn, PDF, ranking, tw } from "../PDF";

export const Result = () => {
  const lastResult = data.results.reduce((prev, current) =>
    new Date(prev.date).getTime() > new Date(current.date).getTime()
      ? prev
      : current
  );

  const dozens = useMemo(() => dozensDrawn(data.results), []);
  const rankingData = useMemo(
    () =>
      ranking({
        participants: participants as {
          name: string;
          dozens: number[];
        }[],
        results: dozens,
      }),
    []
  );

  const rankingPerScore = new Array(11).fill(0);

  rankingData.map((participant) => rankingPerScore[participant.draw.score]++);

  return (
    <>
      <PDF.Page>
        <View style={tw("h-[50mm] p-6 bg-[#D6E3FF] flex flex-row")}>
          <View style={tw("text-center w-[160mm] my-auto")}>
            <Text style={tw("text-base font-bold uppercase text-center")}>
              Faça seu palpite pela plataforma e concorra a um prêmio bônus
            </Text>
            <Text style={tw("mt-8 text-xs text-center leading-6")}>
              Prêmio bônus de R$ 50,00 dado ao palpite com mais pontos no
              primeiro sorteio, caso tenha sido feito na plataforma
              bolaodaquina.com.br
            </Text>
          </View>
          <Image
            src={cellIcon}
            style={tw("w-[104px] h-[109.6px] float-right")}
          />
        </View>

        <View style={tw("flex flex-col items-center justify-center my-[6mm]")}>
          <View style={tw("flex flex-row mt-6 text-xs")}>
            <Text style={tw("")}>Último resultado - </Text>
            <Text style={tw("font-bold")}>{formatDate(lastResult.date)}</Text>
          </View>
          <View
            style={tw("bg-[#D6E3FF] px-8 py-4 rounded-full flex flex-row mt-5")}
          >
            {lastResult.dozens
              .sort((a, b) => a - b)
              .map((dozen) => (
                <PDF.Ball checked number={dozen} key={dozen} style="mx-2" />
              ))}
          </View>
        </View>

        <View style={tw("relative")}>
          <View
            style={tw("flex flex-col gap-5 items-center justify-center mt-6")}
          >
            {Array.from({ length: 8 }, (_, indexRow) => (
              <View style={tw("flex flex-row gap-2")} key={indexRow}>
                {Array.from({ length: 10 }, (_, indexColumn) => (
                  <PDF.Ball
                    number={indexRow * 10 + 1 + indexColumn}
                    style="mx-1 my-1"
                    key={indexColumn}
                    checked={data.results.some((result) =>
                      result.dozens.some(
                        (dozen) => dozen === indexRow * 10 + 1 + indexColumn
                      )
                    )}
                  />
                ))}
              </View>
            ))}
          </View>

          <View style={tw("absolute -bottom-16 w-full h-72 flex items-center")}>
            <Image style={tw("w-[198mm] h-[79.2mm] m-auto")} src={mensIcon} />
          </View>
        </View>

        <View
          style={tw(
            "flex flex-row items-center justify-center px-[5mm] mb-6 mt-[30mm]"
          )}
        >
          <View style={tw("flex flex-col w-[30mm] h-[20mm] text-sm")}>
            <Text style={tw("bg-[#286cff] text-white font-black px-6 py-3")}>
              Pontos
            </Text>
            <Text style={tw("bg-[#286cff] text-white font-black px-6 py-3")}>
              Palpites
            </Text>
          </View>
          {Array.from({ length: 11 }, (_, index) => (
            <View
              style={tw("w-[14.545mm] h-[20mm] flex flex-col text-center")}
              key={index}
            >
              <Text style={tw("bg-[#d6e3ff] font-black py-3 text-sm")}>
                {index}
              </Text>
              <Text style={tw("bg-[#d6e3ff] py-3 text-xs")}>
                {rankingPerScore[index]}
              </Text>
            </View>
          ))}
        </View>
      </PDF.Page>
    </>
  );
};
