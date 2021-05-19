const LS_KEY = "StrongData";
// async function fetchData() {
//   const cache = window.localStorage.getItem(LS_KEY);
//   if (cache) {
//     try {
//       const rv = JSON.parse(cache);
//       return rv;
//     } catch (err) {
//       console.warn(err);
//       window.localStorage.removeItem(LS_KEY);
//     }
//   }

//   const res = await fetch("/api/v1/data");

//   if (res.status === 200) {
//     const rv = await res.json();
//     window.localStorage.setItem(LS_KEY, JSON.stringify(rv));
//     return rv;
//   }
//   throw new Error("Failed to get data");
// }

const WIDTH = 800;
const HEIGHT = WIDTH;

const yKeys = ["totalReps", "totalWeight", "minWeight", "maxWeight"];
const keysNeedingConversion = new Set([
  "totalWeight",
  "minWeight",
  "maxWeight",
]);
const LBS_PER_KG = 2.20462;

const yLabels = {
  totalReps: "Total Reps",
  totalWeight: "Total Weight - kg",
  minWeight: "Min Weight - kg",
  maxWeight: "Max Weight - kg",
};

const btnLabels = {
  totalReps: "Total Reps",
  totalWeight: "Total Weight",
  minWeight: "Min Weight",
  maxWeight: "Max Weight",
};

function plotExercise(divName, { name, exerciseStat, yKey }) {
  const data = [
    {
      x: exerciseStat.map((d) => d.date),
      y: exerciseStat.map((d) => {
        const val = d[yKey];
        if (keysNeedingConversion.has(yKey) && d.weightUnit === "lbs") {
          return (val / LBS_PER_KG).toFixed(2);
        }
        return val.toFixed(2);
      }),
      type: "bar",
      text: exerciseStat.map((d) => d.eachRep),
    },
  ];
  const layout = {
    title: name,
    xaxis: { title: "Date" },
    yaxis: { title: yLabels[yKey] },
    height: HEIGHT,
    width: WIDTH,
  };
  const config = { responsive: true };
  Plotly.newPlot(divName, data, layout, config);
}

async function preparePlots(data, k) {
  const v = data[k];
  const curDiv = document.getElementById(k);

  // create buttons to toggle chart types
  yKeys.forEach((yKey) => {
    const button = document.createElement("button");
    button.onclick = () =>
      plotExercise(k, {
        name: k,
        exerciseStat: v,
        yKey,
      });
    button.textContent = btnLabels[yKey];
    button.className = "control-btn";
    curDiv.appendChild(button);
  });

  plotExercise(k, { name: k, exerciseStat: v, yKey: yKeys[0] });
}

async function main() {
  const form = document.getElementById("csv-form");
  form.addEventListener("submit", submitCsv);
}
function parseResponse(data) {
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
  exerciseNames.forEach((exc, idx) => {
    const plotDiv = document.createElement("div");
    plotDiv.className = "plot-item";
    plotDiv.id = exc;
    plotDiv.textContent = "Loading...";
    exercisesDiv.appendChild(plotDiv);
    setTimeout(() => {
      plotDiv.textContent = "";
      preparePlots(data, exc);
    }, idx);
  });
}

async function uploadFile(file) {
  const formData = new FormData();
  formData.append("myFile", file, file?.name || "strong.csv");
  const res = await fetch("/api/v1/upload", {
    method: "POST",
    body: formData,
  });
  const json = await res.json();
  console.log(json);
  parseResponse(json);
}

function submitCsv(event) {
  console.log(event);
  event.preventDefault();
  const input = document.getElementById("uploaded-csv");
  const file = input?.files?.[0];
  if (!file) {
    return;
  }
  console.log(file);
  uploadFile(file);
}

window.strongMain = main;
window.strongBackToTop = function () {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
