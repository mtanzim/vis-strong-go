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
