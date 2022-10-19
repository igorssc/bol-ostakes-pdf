import { Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import { PDFContext } from "../../contexts/PDFContexts";
import { tw } from "./PDF";

export const RankingScore = () => {
  const { rankingData } = useContext(PDFContext);

  const rankingPerScore = new Array(11).fill(0);

  rankingData({}).map(
    (participant) => rankingPerScore[participant.draw.score]++
  );

  return (
    <>
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
    </>
  );
};
