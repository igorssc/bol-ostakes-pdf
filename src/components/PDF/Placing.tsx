import { Image, Text, View } from "@react-pdf/renderer";
import { useMemo } from "react";
import data from "../../../data.json";
import participants from "../../../participants.json";
import exclamationIcon from "../../assets/exclamation.png";
import indicationIcon from "../../assets/indication.png";
import { dozensDrawn, PDF, ranking, tw } from "../PDF";

export const Placing = () => {
  const dozensD = useMemo(() => dozensDrawn(data.results), []);

  const rankingData = useMemo(
    () =>
      ranking(
        participants as {
          name: string;
          dozens: number[];
        }[],
        dozensD
      ),
    []
  );

  return (
    <>
      <PDF.Page>
        <View style={tw("h-[80mm] p-[5mm]")}>
          <Text style={tw("uppercase text-center text-lg font-bold")}>
            Mais pontos hoje
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
        <View
          style={tw(
            "mx-[5mm] h-[10mm] bg-[#d6e3ff] font-bold flex flex-row text-xs mt-6"
          )}
        >
          <Text style={tw("my-auto inline-block w-[18mm] pl-3")}>Registro</Text>
          <Text style={tw("my-auto inline-block w-[18mm] pl-3")}>Pontos</Text>
          <Text style={tw("my-auto inline-block w-[84mm] pl-3")}>Nome</Text>
          <Text style={tw("my-auto inline-block w-[80mm] pl-3")}>Dezenas</Text>
        </View>
        {rankingData.map(({ name, draw }, index) => (
          <View
            style={tw("mx-[5mm] h-[10mm] flex flex-row text-xs")}
            key={index}
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
              {name}
            </Text>
            <View style={tw("my-auto flex flex-row w-[80mm] pl-3")}>
              {draw.dozens.map((dozen) => (
                <PDF.Ball
                  number={dozen.number}
                  key={dozen.number}
                  style="mx-1 w-[6mm] h-[6mm] bg-gray-200 text-xs font-regular"
                  checked={dozen.checked}
                />
              ))}
            </View>
          </View>
        ))}
      </PDF.Page>
    </>
  );
};
