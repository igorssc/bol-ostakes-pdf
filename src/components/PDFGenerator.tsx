import { PDF } from "./PDF";
import { Highlights } from "./PDF/Highlights";
import { Placing } from "./PDF/Placing";
import { Result } from "./PDF/Result";
import { Resume } from "./PDF/Resume";

export const PDFGenerator = () => {
  return (
    <>
      <PDF.Root>
        <Resume />
        <Result />
        <Highlights />
        <Placing />
      </PDF.Root>
    </>
  );
};
