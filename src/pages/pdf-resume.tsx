import data from "../../data.json";
import { ChampionsIcon } from "../components/ChampionsIcon";
import { formatDate } from "../utils/format";
import { Page } from "./pdf";
const MainCategories = ({ title, value }: { title: string; value: number }) => {
  return (
    <>
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-medium">{title}</h2>
        <p className="text-sm">
          {value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>
    </>
  );
};

const Category = ({ title, value }: { title: string; value: number }) => {
  return (
    <>
      <div className="flex gap-5">
        <span>✨</span>
        <span className="w-[150mm] inline-block">{title}</span>
        <span className="w-[20mm]">
          {value.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </span>
      </div>
    </>
  );
};

export const PDFResume = () => {
  return (
    <>
      <Page>
        <header className="h-[60mm] flex flex-col gap-4 items-center justify-center">
          <h1 className="text-5xl font-bold">BOLÃO DA QUINA</h1>
          <h2 className="text-3xl">Amigos de Caém e MG</h2>
          <h3 className="italic">
            Concurso 60 (Início: {formatDate(data.initialDate)})
          </h3>
        </header>
        <main>
          <div className="h-[60mm] bg-[#D6E3FF] flex items-center justify-around">
            <div className="flex flex-col gap-6 text-center">
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
              {data.categories.map(
                (category) =>
                  category[0] === "Segundo a realizar 10 pontos" && (
                    <MainCategories
                      title="2º Lugar"
                      value={category[1] as number}
                      key={category[0]}
                    />
                  )
              )}
            </div>
            <div>
              <ChampionsIcon />
            </div>
            <div className="flex flex-col gap-6 text-center">
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
            </div>
          </div>
          <div className="h-[157mm] flex flex-col items-center justify-center">
            {data.categories.map(([title, value]) => (
              <Category
                title={title as string}
                value={value as number}
                key={title}
              />
            ))}
          </div>
        </main>
      </Page>
    </>
  );
};
