import "./global.css";
import ReactDOM from "react-dom/client";
import { App } from "./app";

// biome-ignore lint/style/noNonNullAssertion: <react application>
const rootElement = document.getElementById("app")!;

ReactDOM.createRoot(rootElement).render(<App />);
