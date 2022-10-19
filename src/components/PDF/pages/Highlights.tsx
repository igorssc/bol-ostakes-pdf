import { Image, Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import moneyIcon from "../../../assets/money.png";
import noDataIcon from "../../../assets/no-data.png";
import { PDFContext } from "../../../contexts/PDFContexts";
import { PDF, tw } from "../PDF";
import { Ranking } from "../Ranking";

export const Highlights = () => {
  const { rankingData, countDaysOfDraw } = useContext(PDFContext);

  const ranking = rankingData({ isFeatured: true });

  return (
    <>
      {countDaysOfDraw <= 10 && (
        <PDF.Page>
          {ranking.length > 0 ? (
            <>
              <View style={tw("h-[80mm] p-[5mm]")}>
                <Text style={tw("uppercase text-center text-lg font-bold")}>
                  4 pontos hoje
                </Text>
                <View style={tw("flex flex-row h-full mt-4")}>
                  <Text
                    style={tw(
                      "text-center text-base m-auto px-8 w-[120mm] reading-10"
                    )}
                  >
                    Olá, com a tabela zerada, tivemos {ranking.length}{" "}
                    {ranking.length === 1
                      ? "palpite que marcou"
                      : "palpites que marcaram"}{" "}
                    4 pontos hoje. Parabéns!!
                  </Text>
                  <Image
                    src={moneyIcon}
                    style={tw("w-[70mm] h-[60.5mm] my-auto")}
                  />
                </View>
              </View>

              <Ranking.Header isFeatured />
              <Ranking.Body data={ranking} isFeatured />
            </>
          ) : (
            <>
              <View style={tw("h-[80mm] p-[5mm]")}>
                <Text style={tw("uppercase text-center text-lg font-bold")}>
                  4 pontos hoje
                </Text>
              </View>
              <View style={tw("mt-[15mm]")}>
                <Image
                  src={noDataIcon}
                  style={tw("w-[70mm] h-[60.5mm] mx-auto")}
                />
                <Text style={tw("text-center text-sm mt-[20mm]")}>
                  Hoje não tivemos palpites com 4 pontos!
                </Text>
              </View>
            </>
          )}
        </PDF.Page>
      )}
    </>
  );
};
