import "./styles.css";
import { renderReactMaterials } from "./reactComponentRuntime.jsx";

window.renderReactMaterials = renderReactMaterials;

renderReactMaterials();

import("./app.js")
  .then(() => {
    renderReactMaterials();
  })
  .catch((error) => {
    console.error(error);
    const app = document.querySelector("#app");
    if (app) app.textContent = error instanceof Error ? error.message : String(error);
  });
