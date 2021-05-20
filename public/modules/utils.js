import {
  triggerLoading,
  stopLoading,
  removeForm,
  createBookmarks,
  showError,
  resetError,
} from "./ui.js";
import { preparePlots } from "./plot.js";

const LS_KEY = "StrongData";

export function cacheData(data) {
  window.localStorage.setItem(LS_KEY, JSON.stringify(data));
}

export function removeCache() {
  window.localStorage.removeItem(LS_KEY);
}

export function getCache() {
  return window.localStorage.getItem(LS_KEY);
}

export async function parseResponse(data) {
  const exerciseNames = Object.keys(data);
  // create bookmarks
  createBookmarks(exerciseNames);

  // create divs for plots, and queue up plotly renders
  const exercisesDiv = document.getElementById("exercisePlots");
  return Promise.all(
    exerciseNames.map((exc, idx) => {
      const plotDiv = document.createElement("div");
      plotDiv.className = "plot-item";
      plotDiv.id = exc;
      plotDiv.textContent = "Loading...";
      exercisesDiv.appendChild(plotDiv);
      return new Promise((resolve) => {
        setTimeout(() => {
          plotDiv.textContent = "";
          preparePlots(data, exc);
          return resolve();
        }, idx);
      });
    })
  );
}

function isFalsyObject(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("myFile", file, file?.name || "strong.csv");
  const res = await fetch("/api/v1/upload", {
    method: "POST",
    body: formData,
  });
  if (res.status === 200) {
    const json = await res.json();
    if (isFalsyObject(json)) {
      throw new Error("No data returned. Please check your file.");
    }
    removeForm(removeCache, submitCsv);
    cacheData(json);
    await parseResponse(json);
    return;
  }
  throw new Error("Failed to get data");
}

export async function submitCsv(event) {
  event.preventDefault();
  resetError();

  const input = document.getElementById("uploaded-csv");
  const file = input?.files?.[0];
  if (!file) {
    return;
  }
  try {
    triggerLoading();
    await uploadFile(file);
  } catch (err) {
    console.log(err);
    showError(err?.message || "Something went wrong");
    stopLoading();
  }
}
