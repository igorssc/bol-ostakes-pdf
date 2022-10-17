import { PDFDownloadLink } from "@react-pdf/renderer";
import { PDFGenerator } from "./components/PDFGenerator";

export function App() {
  return (
    <>
      <PDFDownloadLink document={<PDFGenerator />} fileName="TESTE.pdf">
        {({ blob, url, loading, error }) => {
          console.log(blob);
          return loading ? "Loading document..." : "Download now!";
        }}
      </PDFDownloadLink>
    </>
  );
}
