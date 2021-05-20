import { triggerLoading, stopLoading, setupForm } from "./modules/ui.js";
import { parseResponse, getCache, submitCsv } from "./modules/utils.js";

async function main() {
  triggerLoading();
  const cache = getCache();
  if (cache) {
    try {
      const json = JSON.parse(cache);
      removeForm();
      await parseResponse(json);
      stopLoading();
      return;
    } catch (err) {
      console.warn(err);
    }
  }
  setupForm(submitCsv);
  stopLoading();
}

window.strongMain = main;
window.strongBackToTop = function () {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
