import { useEffect, useState } from "preact/hooks";

// TODO: dynamic units ie: kg vs lbs
const yLabels = {
  totalReps: "Total Reps",
  totalWeight: "Total Weight - kg",
  minWeight: "Min Weight - kg",
  maxWeight: "Max Weight - kg",
  totalSeconds: "Total Duration - s",
  totalDistance: "Total Distance - m",
};
const btnLabels = {
  maxWeight: "Max Weight",
  minWeight: "Min Weight",
  totalWeight: "Total Weight",
  totalReps: "Total Reps",
  totalSeconds: "Total Duration",
  totalDistance: "Total Distance",
};

const WIDTH = 900;
const HEIGHT = 600;

const yKeys = [
  "maxWeight",
  "minWeight",
  "totalWeight",
  "totalReps",
  "totalSeconds",
  "totalDistance",
];

export function EachPlot({ name, exerciseStat }) {
  const [curKey, setKey] = useState(yKeys[0]);

  useEffect(() => {
    const data = [
      {
        x: exerciseStat.map((d) => d.date),
        y: exerciseStat.map((d) => {
          const val = d[curKey];
          switch (curKey) {
            case "totalWeight":
            case "minWeight":
            case "maxWeight":
            case "totalDistance":
              return val.toFixed(2);
            default:
              return val.toFixed(2);
          }
        }),
        type: "bar",
        marker: { color: "crimson" },
        text: exerciseStat.map((d) => {
          switch (curKey) {
            case "totalSeconds":
              return d.eachRepDuration;
            case "totalDistance":
              return `${d.totalDistance} ${d.distanceUnit}`;
            default:
              return d.eachRep;
          }
        }),
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
    // eslint-disable-next-line no-undef
    Plotly.newPlot(name, data, layout, config);
  }, [name, exerciseStat, curKey]);

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
      <div className="plots fade-in" id={name} />
    </div>
  );
}
