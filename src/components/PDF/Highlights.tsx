import { Image, Text, View } from "@react-pdf/renderer";
import moneyIcon from "../../assets/money.png";
import { PDF, tw } from "../PDF";

export const Highlights = () => {
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
              Olá, com a tabela zerada, tivemos 8 palpites que marcaram mais
              pontos hoje. Parabéns!!
            </Text>
            <Image src={moneyIcon} style={tw("w-[70mm] h-[60.5mm] my-auto")} />
          </View>
        </View>
        <View
          style={tw(
            "mx-[5mm] h-[10mm] bg-[#286cff] text-white font-bold flex flex-row text-xs mt-6"
          )}
        >
          <Text style={tw("my-auto inline-block w-[18mm] pl-3")}>Registro</Text>
          <Text style={tw("my-auto inline-block w-[18mm] pl-3")}>Pontos</Text>
          <Text style={tw("my-auto inline-block w-[84mm] pl-3")}>Nome</Text>
          <Text style={tw("my-auto inline-block w-[80mm] pl-3")}>Dezenas</Text>
        </View>
        <View style={tw("mx-[5mm] h-[10mm] flex flex-row text-xs")}>
          <Text style={tw("my-auto inline-block w-[18mm] pl-3")}>1</Text>
          <Text style={tw("my-auto inline-block w-[18mm] pl-3")}>6</Text>
          <Text
            style={tw(
              "my-auto inline-block w-[84mm] pl-3 whitespace-nowrap overflow-hidden"
            )}
          >
            Junio A Nunes Anjos (Ind. Everton F Oliveira) 1
          </Text>
          <View style={tw("my-auto flex flex-row w-[80mm] pl-3")}>
            {[23, 34, 35, 36, 41, 45, 67, 70, 72, 80].map((number) => (
              <PDF.Ball
                number={number}
                key={number}
                style="mx-1 w-[6mm] h-[6mm] bg-gray-200 text-xs font-regular"
              />
            ))}
          </View>
        </View>
        <View
          style={tw("mx-[5mm] h-[10mm] flex flex-row text-xs bg-[#d6e3ff]")}
        >
          <Text style={tw("my-auto inline-block w-[18mm] pl-3")}>1</Text>
          <Text style={tw("my-auto inline-block w-[18mm] pl-3")}>6</Text>
          <Text
            style={tw(
              "my-auto inline-block w-[84mm] pl-3 whitespace-nowrap overflow-hidden"
            )}
          >
            Junio A Nunes Anjos (Ind. Everton F Oliveira) 1
          </Text>
          <View style={tw("my-auto flex flex-row w-[80mm] pl-3")}>
            {[23, 34, 35, 36, 41, 45, 67, 70, 72, 80].map((number) => (
              <PDF.Ball
                number={number}
                key={number}
                style="mx-1 w-[6mm] h-[6mm] bg-gray-200 text-xs font-regular"
                checked
              />
            ))}
          </View>
        </View>
      </PDF.Page>
    </>
  );
};
