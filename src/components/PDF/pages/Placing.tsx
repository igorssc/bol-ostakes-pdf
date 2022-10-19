import { Image, Text, View } from "@react-pdf/renderer";
import { useContext } from "react";
import exclamationIcon from "../../../assets/exclamation.png";
import indicationIcon from "../../../assets/indication.png";
import { PDFContext } from "../../../contexts/PDFContexts";
import { PDF, tw } from "../PDF";
import { Ranking } from "../Ranking";

export const Placing = () => {
  const { rankingData } = useContext(PDFContext);

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
        <Ranking.Header />
        <Ranking.Body data={rankingData({ order: "numeric" })} />
      </PDF.Page>
    </>
  );
};
