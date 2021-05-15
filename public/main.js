async function fetchData() {
  const res = await fetch("/api/v1/data");

  if (res.status === 200) {
    return res.json();
  }
  throw new Error("Failed to get data");
}

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

export function plotExercise(divName, { name, exerciseStat, yKey }) {
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

async function main() {
  try {
    const data = await fetchData();
    console.log(data);
    const exerciseNames = Object.keys(data).slice(0, 50);
    // create bookmarks
    const bookmarksDiv = document.getElementById("bookmarks");
    bookmarksDiv.innerHTML = exerciseNames
      .map((e) => `<a href="#${e}">${e}<a/>`)
      .join("");

    const exercisesDiv = document.getElementById("exercisePlots");
    // create divs
    exercisesDiv.innerHTML = exerciseNames
      .map(
        (e) =>
          `
        <div class="plot-item " id="${e}">
        </div>
      `
      )
      .join("");
    // plot into divs
    exerciseNames.forEach((k) => {
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
    });
    const loader = document.getElementById("loader-div");
    loader.style.display = "none";
  } catch (err) {
    console.log(err);
  }
}

window.strongMain = main;
window.strongBackToTop = function () {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};
