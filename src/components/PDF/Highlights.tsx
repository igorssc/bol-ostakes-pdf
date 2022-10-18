import { Image, Text, View } from "@react-pdf/renderer";
import { useMemo } from "react";
import data from "../../../data.json";
import participants from "../../../participants1.json";
import moneyIcon from "../../assets/money.png";
import { dozensDrawn, PDF, ranking, tw } from "../PDF";

export const Highlights = () => {
  const lastResult = data.results.reduce((prev, current) =>
    new Date(prev.date).getTime() > new Date(current.date).getTime()
      ? prev
      : current
  );

  const dozens = useMemo(() => dozensDrawn([lastResult]), []);
  const rankingData = useMemo(
    () =>
      ranking({
        participants: participants as {
          name: string;
          dozens: number[];
        }[],
        results: dozens,
        isFeatured: true,
      }),
    []
  );

  return (
    <>
      <PDF.Page>
        <View style={tw("h-[80mm] p-[5mm]")}>
          <Text style={tw("uppercase text-center text-lg font-bold")}>
            Mais pontos hoje
          </Text>
          <View style={tw("flex flex-row h-full mt-4")}>
            <Text
              style={tw(
                "text-center text-base m-auto px-8 w-[120mm] reading-10"
              )}
            >
              Olá, com a tabela zerada, tivemos {rankingData.length} palpites
              que marcaram mais pontos hoje. Parabéns!!
            </Text>
            <Image src={moneyIcon} style={tw("w-[70mm] h-[60.5mm] my-auto")} />
          </View>
        </View>

        <PDF.Ranking.Header isFeatured />
        <PDF.Ranking.Body data={rankingData} isFeatured />
      </PDF.Page>
    </>
  );
};
