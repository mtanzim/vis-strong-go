import {
  triggerLoading,
  stopLoading,
  setupForm,
  removeForm,
} from "./modules/ui.js";
import {
  parseResponse,
  getCache,
  submitCsv,
  removeCache,
} from "./modules/utils.js";

async function main() {
  triggerLoading();
  const cache = getCache();
  if (cache) {
    try {
      const json = JSON.parse(cache);
      removeForm(removeCache, submitCsv);
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
