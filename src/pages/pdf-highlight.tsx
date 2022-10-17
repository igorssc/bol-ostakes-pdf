import { MoneyIcon } from "../components/MoneyIcon";
import { Ball, Page } from "./pdf";

export const PDFHighlight = () => {
  return (
    <>
      <Page>
        <header className="h-[80mm] p-6">
          <h1 className="uppercase text-center font-bold">Mais pontos hoje</h1>
          <div className="flex flex-row h-full">
            <p className="text-center text-xl my-auto px-8">
              Olá, com a tabela zerada, tivemos 8 palpites que marcaram mais
              pontos hoje. Parabéns!!
            </p>
            <MoneyIcon className="w-64 my-auto" />
          </div>
        </header>
        <main>
          <div className="mx-[5mm] h-[10mm] bg-[#286cff] text-white font-bold flex flex-row text-xs">
            <span className="my-auto inline-block w-[18mm] pl-3">Registro</span>
            <span className="my-auto inline-block w-[18mm] pl-3">Pontos</span>
            <span className="my-auto inline-block w-[84mm] pl-3">Nome</span>
            <span className="my-auto inline-block w-[80mm] pl-3">Dezenas</span>
          </div>
          <div className="mx-[5mm] h-[10mm] flex flex-row text-xs">
            <span className="my-auto inline-block w-[18mm] pl-3">1</span>
            <span className="my-auto inline-block w-[18mm] pl-3">6</span>
            <span className="my-auto inline-block w-[84mm] pl-3 whitespace-nowrap overflow-hidden">
              Junio A Nunes Anjos (Ind. Everton F Oliveira) 1
            </span>
            <span className="my-auto w-[80mm] pl-3 flex gap-1">
              {[23, 34, 35, 36, 41, 45, 67, 70, 72, 80].map((number) => (
                <Ball
                  number={number}
                  key={number}
                  style="!w-2 !h-2 font-regular text-xs !p-3 bg-gray-200"
                />
              ))}
            </span>
          </div>
        </main>
      </Page>
    </>
  );
};
