import { useEffect, useState } from "preact/hooks";

const keysNeedingConversion = new Set([
  "totalWeight",
  "minWeight",
  "maxWeight",
]);
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
const LBS_PER_KG = 2.20462;

const WIDTH = 800;
const HEIGHT = WIDTH;

const yKeys = ["totalReps", "totalWeight", "minWeight", "maxWeight"];
function eachPlot({ divName, name, exerciseStat, yKey, cb }) {
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
  setTimeout(() => {
    // eslint-disable-next-line no-undef
    Plotly.newPlot(divName, data, layout, config);
    cb();
  }, 1);
}

export function EachPlot({ name, exerciseStat }) {
  const [loading, setLoading] = useState(true);
  const [curKey, setKey] = useState(yKeys[0]);
  useEffect(() => {
    eachPlot({
      divName: name,
      exerciseStat,
      name,
      yKey: curKey,
      cb: () => setLoading(false),
    });
  }, [exerciseStat, name, curKey]);
  return (
    <>
      <p>{loading ? "Loading..." : null}</p>
      <div key={name} id={name} />
      {yKeys.map((k) => (
        <button
          className="control-btn"
          disabled={curKey === k}
          key={k}
          onClick={() => setKey(k)}
        >
          {btnLabels[k]}
        </button>
      ))}
    </>
  );
}