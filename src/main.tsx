import ReactDOM from "react-dom";
import { App } from "./App";
import { ExamplePDF } from "./pages/pdf";
import "./styles/global.css";

ReactDOM.render(
  <>
    <App />
    <ExamplePDF />
  </>,
  document.getElementById("root") as HTMLElement
);
