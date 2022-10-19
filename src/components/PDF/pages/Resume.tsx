import { Image, Text, View } from "@react-pdf/renderer";
import data from "../../../../data.json";
import brightnessIcon from "../../../assets/brilhante.png";
import winners from "../../../assets/winners.png";
import { formatDate } from "../../../utils/format";
import { PDF, tw } from "../PDF";

const MainCategories = ({ title, value }: { title: string; value: number }) => {
  return (
    <>
      <Text style={tw("text-base text-center")}>{title}</Text>
      <Text style={tw("text-base mt-5 text-center font-medium")}>
        {value.toLocaleString("pt-br", {
          style: "currency",
          currency: "BRL",
        })}
      </Text>
    </>
  );
};

const Category = ({ title, value }: { title: string; value: number }) => {
  return (
    <>
      <View style={tw("mt-1 flex gap-3 flex-row justify-around font-light")}>
        <Image src={brightnessIcon} style={tw("h-5")} />
        <Text style={tw("w-[150mm] ml-2")}>{title}</Text>
        <Text style={tw("w-[20mm] ml-2")}>
          {value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </Text>
      </View>
    </>
  );
};

export const Resume = () => {
  return (
    <>
      <PDF.Page>
        <View
          style={tw("h-[50mm] flex flex-col gap-4 items-center justify-center")}
        >
          <Text style={tw("text-5xl font-bold")}>BOLÃO DA QUINA</Text>
          <Text style={tw("mt-4 text-3xl font-light")}>
            Amigos de Caém e MG
          </Text>
          <Text style={tw("font-light text-sm")}>
            Concurso 60 (Início: {formatDate(data.initialDate)})
          </Text>
        </View>

        <View
          style={tw(
            "px-[15mm] h-[60mm] bg-[#D6E3FF] flex flex-row items-center justify-around"
          )}
        >
          <View style={tw("flex justify-center items-center")}>
            {data.categories.map(
              (category) =>
                category[0] === "Primeiro a realizar 10 pontos" && (
                  <MainCategories
                    title="1º Lugar"
                    value={category[1] as number}
                    key={category[0]}
                  />
                )
            )}
            <View style={tw("h-8")} />
            {data.categories.map(
              (category) =>
                category[0] === "Segundo a realizar 10 pontos" && (
                  <MainCategories
                    title="2º Lugar"
                    value={4000}
                    key={category[0]}
                  />
                )
            )}
          </View>
          <View style={tw("flex justify-center items-center")}>
            <Image src={winners} style={tw("w-[91mm] h-auto")} />
          </View>
          <View style={tw("flex justify-center items-center")}>
            {data.categories.map(
              (category) =>
                category[0] ===
                  "Indicador do Campeão com 10 pontos em primeira colocação" && (
                  <MainCategories
                    title="Coringa"
                    value={category[1] as number}
                    key={category[0]}
                  />
                )
            )}
            <View style={tw("h-8")} />
            {data.categories.map(
              (category) =>
                category[0] ===
                  "Possuir 9 pontos no momento que alguém chegar a 10 pontos primeiro" && (
                  <MainCategories
                    title="9 Pontos"
                    value={category[1] as number}
                    key={category[0]}
                  />
                )
            )}
          </View>
        </View>

        <View style={tw("h-[167mm] flex text-sm items-center justify-center")}>
          {data.categories.map(([title, value]) => (
            <Category
              title={title as string}
              value={value as number}
              key={title}
            />
          ))}
        </View>
      </PDF.Page>
    </>
  );
};
