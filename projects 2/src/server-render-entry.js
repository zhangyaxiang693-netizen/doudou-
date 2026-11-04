import "./styles.css";
import { renderReactMaterials } from "./reactComponentRuntime.jsx";

window.__SERVER_EXPORT_MODE__ = true;
window.renderReactMaterials = renderReactMaterials;
for (const element of [document.documentElement, document.body, document.querySelector("#app")]) {
  element.style.setProperty("background", "transparent", "important");
  element.style.setProperty("height", "auto", "important");
  element.style.setProperty("overflow", "visible", "important");
  element.style.margin = "0"; element.style.padding = "0";
}
import("./app.js").catch((error) => {
  window.serverExportLoadError = error.message;
  console.error(error);
});
