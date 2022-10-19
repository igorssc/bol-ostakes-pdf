import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFGenerator } from "./components/PDFGenerator";

export function App() {
  return (
    <>
      <div className="flex items-center justify-center w-full h-screen">
        <PDFDownloadLink
          document={<PDFGenerator />}
          fileName="TESTE.pdf"
          className="flex px-5 py-3 items-center justify-center rounded b-2 bg-violet-500 text-white cursor-pointer"
        >
          {({ loading }) => {
            return loading ? "Loading document..." : "Download now!";
          }}
        </PDFDownloadLink>
      </div>
    </>
  );
}
