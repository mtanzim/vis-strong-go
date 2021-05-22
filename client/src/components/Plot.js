import { useEffect } from "preact/hooks";

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

const LBS_PER_KG = 2.20462;

const WIDTH = 800;
const HEIGHT = WIDTH;

const yKeys = ["totalReps", "totalWeight", "minWeight", "maxWeight"];
const btnLabels = {
  totalReps: "Total Reps",
  totalWeight: "Total Weight",
  minWeight: "Min Weight",
  maxWeight: "Max Weight",
};

function Bookmarks({ names }) {
  return (
    <div>
      {names.map((name) => (
        <a style={{ marginRight: 12 }} key={name} href={`#${name}`}>
          {name}
        </a>
      ))}
    </div>
  );
}

function eachPlot({ divName, name, exerciseStat, yKey }) {
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

export function EachPlot({ name, exerciseStat }) {
  useEffect(() => {
    eachPlot({
      divName: name,
      exerciseStat,
      name,
      yKey: yKeys[0],
    });
  }, []);
  return <div key={name} id={name} />;
}

export function Plot({ data }) {
  useEffect(() => {
    const script = document.createElement("script");

    script.src = "deps/plotly.min.js";
    script.async = true;

    document.body.appendChild(script);
  });

  // TODO: plot plots here
  const exerciseNames = Object.keys(data);
  return (
    <>
      <Bookmarks names={exerciseNames} />
      {exerciseNames.map((name) => (
        <EachPlot key={name} name={name} exerciseStat={data[name]} />
      ))}
    </>
  );
}
