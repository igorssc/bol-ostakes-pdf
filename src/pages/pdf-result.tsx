import data from "../../data.json";
import { CellPhone } from "../components/CellIcon";
import { MenIcon } from "../components/MenIcon";
import { formatDate } from "../utils/format";
import { Ball, Page } from "./pdf";

export const PDFResult = () => {
  const lastResult = data.results.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  )[0];

  return (
    <>
      <Page>
        <header className="h-[50mm] p-6 bg-[#D6E3FF] flex gap-4 items-center">
          <div className="text-center">
            <h2 className="text-[15px] font-black uppercase">
              Faça seu palpite pela plataforma e concorra a um prêmio bônus
            </h2>
            <p className="mt-10">
              Prêmio bônus de R$ 50,00 dado ao palpite com mais pontos no
              primeiro sorteio, caso tenha sido feito na plataforma
              bolaodaquina.com.br
            </p>
          </div>
          <CellPhone className="w-64" />
        </header>
        <main>
          <div className="flex flex-col gap-5 items-center justify-center mt-6">
            <h3>
              Último resultado -{" "}
              <span className="font-bold">{formatDate(lastResult.date)}</span>
            </h3>
            <div className="bg-[#D6E3FF] px-10 py-5 rounded-full flex gap-5">
              {lastResult.dozens.map((dozen) => (
                <Ball checked number={dozen} key={dozen} />
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="flex flex-col gap-5 items-center justify-center mt-6">
              {Array.from({ length: 8 }, (_, indexRow) => (
                <div className="flex gap-2" key={indexRow}>
                  {Array.from({ length: 10 }, (_, indexColumn) => (
                    <Ball
                      number={indexRow * 10 + 1 + indexColumn}
                      key={indexColumn}
                      checked={data.results.some((result) =>
                        result.dozens.some(
                          (dozen) => dozen === indexRow * 10 + 1 + indexColumn
                        )
                      )}
                    />
                  ))}
                </div>
              ))}
            </div>
            <div className="absolute -bottom-16 w-full h-72 flex items-center">
              <MenIcon className="w-[180mm] m-auto" />
            </div>
          </div>
          <div className="flex items-center justify-center px-[5mm] mb-6 mt-24">
            <div className="flex flex-col">
              <span className="bg-[#286cff] text-white font-black px-6 py-3">
                Pontos
              </span>
              <span className="bg-[#286cff] text-white font-black px-6 py-3">
                Palpites
              </span>
            </div>
            <div className="grid grid-cols-10 w-full">
              {Array.from({ length: 10 }, (_, index) => (
                <div className="flex flex-col text-center" key={index}>
                  <span className="bg-[#d6e3ff] font-black py-3">{index}</span>
                  <span className="bg-[#d6e3ff] py-3">12000</span>
                </div>
              ))}
            </div>
          </div>
        </main>
      </Page>
    </>
  );
};
