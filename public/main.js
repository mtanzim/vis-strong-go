import { preparePlots } from "./modules/plot.js";

const LS_KEY = "StrongData";

async function parseResponse(data) {
  const exerciseNames = Object.keys(data);
  // create bookmarks
  const bookmarksDiv = document.getElementById("bookmarks");
  exerciseNames.forEach((exc) => {
    const aComp = document.createElement("a");
    aComp.href = `#${exc}`;
    aComp.text = exc;
    bookmarksDiv.appendChild(aComp);
  });

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

async function uploadFile(file) {
  triggerLoading();

  const formData = new FormData();
  formData.append("myFile", file, file?.name || "strong.csv");
  const res = await fetch("/api/v1/upload", {
    method: "POST",
    body: formData,
  });
  if (res.status === 200) {
    const json = await res.json();
    removeForm();
    cacheData(json);
    await parseResponse(json);
    stopLoading();
    return;
  }
  throw new Error("Failed to get data");
}

function submitCsv(event) {
  console.log(event);
  event.preventDefault();
  const input = document.getElementById("uploaded-csv");
  const file = input?.files?.[0];
  if (!file) {
    return;
  }
  uploadFile(file);
}

function setupForm() {
  const form = document.getElementById("csv-form");
  form.addEventListener("submit", submitCsv);
  form.style.display = "block";

  const reupload = document.getElementById("re-upload");
  reupload.style.display = "none";
}

function removeForm() {
  const form = document.getElementById("csv-form");
  form.style.display = "none";

  const reupload = document.getElementById("re-upload");
  reupload.style.display = "block";

  reupload.addEventListener("click", () => {
    removeCache();
    document.getElementById("bookmarks").innerHTML = "";
    document.getElementById("exercisePlots").innerHTML = "";
    setupForm();
  });
}

function cacheData(data) {
  window.localStorage.setItem(LS_KEY, JSON.stringify(data));
}

function removeCache() {
  window.localStorage.removeItem(LS_KEY);
}

function triggerLoading() {
  const loader = document.getElementById("loader");
  loader.innerText = "Loading...";
  const elems = document.getElementsByClassName("upload-form");
  console.log(elems);
  for (const elem of elems) {
    elem.style.visibility = "hidden";
  }
}
function stopLoading() {
  const loader = document.getElementById("loader");
  loader.innerText = "";
  const elems = document.getElementsByClassName("upload-form");
  for (const elem of elems) {
    elem.style.visibility = "visible";
  }
}

async function main() {
  triggerLoading();
  const cache = window.localStorage.getItem(LS_KEY);
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
  setupForm();
  stopLoading();
}

window.strongMain = main;
window.strongBackToTop = function () {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
