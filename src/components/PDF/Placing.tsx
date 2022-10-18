import { Image, Text, View } from "@react-pdf/renderer";
import { useMemo } from "react";
import data from "../../../data.json";
import participants from "../../../participants1.json";
import exclamationIcon from "../../assets/exclamation.png";
import indicationIcon from "../../assets/indication.png";
import { dozensDrawn, PDF, ranking, tw, type ParticipantProps } from "../PDF";

export const Placing = () => {
  const dozens = useMemo(() => dozensDrawn(data.results), []);
  const rankingData = useMemo(
    () =>
      ranking({
        participants: participants as ParticipantProps[],
        results: dozens,
      }),
    []
  );

  return (
    <>
      <PDF.Page>
        <View style={tw("h-[80mm] p-[5mm]")}>
          <Text style={tw("uppercase text-center text-lg font-bold")}>
            CLASSIFICAÇÃO
          </Text>
          <View style={tw("flex flex-row h-full")}>
            <View style={tw("flex flex-col m-auto w-[120mm]")}>
              <Image src={indicationIcon} style={tw("w-[80mm] mx-auto")} />
              <Text style={tw("text-center text-sm px-8 mt-4")}>
                Ao abrir a planilha, clique no símbolo indicado e digite seu
                nome, assim será direcionado ao seu palpite.
              </Text>
            </View>
            <Image
              src={exclamationIcon}
              style={tw("w-[80mm] h-[51.816mm] my-auto")}
            />
          </View>
        </View>
        <PDF.Ranking.Header />
        <PDF.Ranking.Body data={rankingData} />
      </PDF.Page>
    </>
  );
};
