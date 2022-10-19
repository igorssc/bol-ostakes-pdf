import { Image, Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import fireworksIcon from "../../../assets/fireworks.png";
import { PDFContext } from "../../../contexts/PDFContexts";
import { PDF, tw } from "../PDF";
import { Ranking } from "../Ranking";

export const Quina = () => {
  const { rankingData } = useContext(PDFContext);

  const ranking = rankingData({ isQuina: true });

  return (
    <>
      {ranking.length > 0 && (
        <PDF.Page>
          <View style={tw("h-[80mm] p-[5mm]")}>
            <Text style={tw("uppercase text-center text-lg font-bold")}>
              Quina
            </Text>
            <View style={tw("flex flex-row h-full mt-4")}>
              <Text
                style={tw(
                  "text-center text-base m-auto px-8 w-[120mm] reading-10"
                )}
              >
                Tivemos {ranking.length}{" "}
                {ranking.length === 1
                  ? "pessoa que acertou"
                  : "pessoas que acertaram"}{" "}
                a Quina hoje. Parabéns!!
              </Text>
              <Image
                src={fireworksIcon}
                style={tw("w-[70mm] h-[60.5mm] my-auto")}
              />
            </View>
          </View>

          <Ranking.Header isFeatured />
          <Ranking.Body data={ranking} isFeatured />
        </PDF.Page>
      )}
    </>
  );
};
