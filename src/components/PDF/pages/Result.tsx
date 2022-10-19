import { Image, Text, View } from "@react-pdf/renderer";
import cellIcon from "../../../assets/cell.png";
import { Draw } from "../Draw";
import { LastResult } from "../LastResult";
import { PDF, tw } from "../PDF";
import { RankingScore } from "../RankingScore";

export const Result = () => {
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

        <LastResult />
        <Draw />
        <RankingScore />
      </PDF.Page>
    </>
  );
};
