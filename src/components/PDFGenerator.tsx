import { PDFProvider } from "../contexts/PDFContexts";
import { Highlights } from "./PDF/pages/Highlights";
import { Placing } from "./PDF/pages/Placing";
import { Quina } from "./PDF/pages/Quina";
import { Result } from "./PDF/pages/Result";
import { Resume } from "./PDF/pages/Resume";
import { PDF } from "./PDF/PDF";

export const PDFGenerator = () => {
  return (
    <>
      <PDFProvider>
        <PDF.Root>
          <Resume />
          <Result />
          <Quina />
          <Highlights />
          <Placing />
        </PDF.Root>
      </PDFProvider>
    </>
  );
};
