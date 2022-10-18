import ReactDOM from "react-dom/client";
import { App } from "./App";
import "./styles/global.css";
import {ExamplePDF} from './pages/pdf'

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <>
    <App />
    <ExamplePDF />
  </>
);
