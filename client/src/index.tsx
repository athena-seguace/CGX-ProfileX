import { createRoot } from "react-dom/client";

import "./assets/styles/global.css";
import "./assets/styles/form.css";

import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(<App />);
