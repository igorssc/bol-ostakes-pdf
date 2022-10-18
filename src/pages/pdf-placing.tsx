import { useMemo } from "react";
import data from "../../data.json";
import participants from "../../participants.json";
import { ExclamationIcon } from "../components/ExclamationIcon";
import { IndicationIcon } from "../components/IndicationIcon";
import { Ball, dozensDrawn, Page, ranking } from "./pdf";

const Ranking = () => {
  const dozens = useMemo(() => dozensDrawn(data.results), []);
  const rankingData = useMemo(
    () =>
      ranking(
        participants as {
          name: string;
          dozens: number[];
        }[],
        dozens
      ),
    []
  );

  return useMemo(() => {
    return (
      <>
        {rankingData.map(({ name, draw }, index) => (
          <div className="mx-[5mm] h-[10mm] flex flex-row text-xs">
            <span className="my-auto inline-block w-[18mm] pl-3">
              {index + 1}
            </span>
            <span className="my-auto inline-block w-[18mm] pl-3">
              {draw.score}
            </span>
            <span className="my-auto inline-block w-[84mm] pl-3 whitespace-nowrap overflow-hidden">
              {name}
            </span>
            <span className="my-auto w-[80mm] pl-3 flex gap-1">
              {draw.dozens.map((dozen) => (
                <Ball
                  number={dozen.number}
                  key={dozen.number}
                  style="!w-2 !h-2 font-regular text-xs !p-3 bg-gray-200"
                  checked={dozen.checked}
                />
              ))}
            </span>
          </div>
        ))}
      </>
    );
  }, []);
};

export const PDFPlacing = () => {
  return (
    <>
      <Page>
        <header className="h-[80mm] p-6">
          <h1 className="uppercase text-center font-bold">Mais pontos hoje</h1>
          <div className="flex flex-row h-full">
            <div className="flex flex-col m-auto">
              <IndicationIcon className="w-[100mm] mx-auto" />
              <p className="text-center text-xl px-8">
                Ao abrir a planilha, clique no símbolo indicado e digite seu
                nome, assim será direcionado ao seu palpite.
              </p>
            </div>
            <ExclamationIcon className="w-[80mm] my-auto" />
          </div>
        </header>
        <main>
          <div className="mx-[5mm] h-[10mm] bg-[#d6e3ff] font-bold flex flex-row text-xs">
            <span className="my-auto inline-block w-[18mm] pl-3">Registro</span>
            <span className="my-auto inline-block w-[18mm] pl-3">Pontos</span>
            <span className="my-auto inline-block w-[84mm] pl-3">Nome</span>
            <span className="my-auto inline-block w-[80mm] pl-3">Dezenas</span>
          </div>
          <Ranking />
        </main>
      </Page>
    </>
  );
};
