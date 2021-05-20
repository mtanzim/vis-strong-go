import {
  triggerLoading,
  stopLoading,
  removeForm,
  createBookmarks,
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

export async function uploadFile(file) {
  triggerLoading();
  const formData = new FormData();
  formData.append("myFile", file, file?.name || "strong.csv");
  const res = await fetch("/api/v1/upload", {
    method: "POST",
    body: formData,
  });
  if (res.status === 200) {
    const json = await res.json();
    removeForm(removeCache, submitCsv);
    cacheData(json);
    await parseResponse(json);
    stopLoading();
    return;
  }
  throw new Error("Failed to get data");
}

export function submitCsv(event) {
  console.log(event);
  event.preventDefault();
  const input = document.getElementById("uploaded-csv");
  const file = input?.files?.[0];
  if (!file) {
    return;
  }
  uploadFile(file);
}
