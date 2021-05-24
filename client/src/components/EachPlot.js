import { useState } from "preact/hooks";
import Plot from "react-plotly.js";

const keysNeedingConversion = new Set([
  "totalWeight",
  "minWeight",
  "maxWeight",
]);

const keysForDuration = new Set(["totalSeconds"]);

const yLabels = {
  totalReps: "Total Reps",
  totalWeight: "Total Weight - kg",
  minWeight: "Min Weight - kg",
  maxWeight: "Max Weight - kg",
  totalSeconds: "Total Duration - s",
};
const btnLabels = {
  totalReps: "Total Reps",
  totalWeight: "Total Weight",
  minWeight: "Min Weight",
  maxWeight: "Max Weight",
  totalSeconds: "Total Duration",
};
const LBS_PER_KG = 2.20462;

const WIDTH = 900;
const HEIGHT = 700;

const yKeys = [
  "totalReps",
  "totalWeight",
  "minWeight",
  "maxWeight",
  "totalSeconds",
];

export function EachPlot({ name, exerciseStat }) {
  const [curKey, setKey] = useState(yKeys[0]);

  const data = [
    {
      x: exerciseStat.map((d) => d.date),
      y: exerciseStat.map((d) => {
        const val = d[curKey];
        if (keysNeedingConversion.has(curKey) && d.weightUnit === "lbs") {
          return (val / LBS_PER_KG).toFixed(2);
        }
        return val.toFixed(2);
      }),
      type: "bar",
      marker: { color: "crimson" },
      text: exerciseStat.map((d) =>
        keysForDuration.has(curKey) ? d.eachRepDuration : d.eachRep
      ),
    },
  ];
  const layout = {
    title: name,
    xaxis: { title: "Date" },
    yaxis: { title: yLabels[curKey] },
    height: HEIGHT,
    width: WIDTH,
  };
  const config = { responsive: true };

  const handleSelectChange = (event) => {
    setKey(event.target.value);
  };

  return (
    <div>
      <select value={curKey} onChange={handleSelectChange}>
        {yKeys.map((k) => (
          <option value={k} key={k}>
            {btnLabels[k]}
          </option>
        ))}
      </select>
      <Plot data={data} config={config} layout={layout} />
    </div>
  );
}
