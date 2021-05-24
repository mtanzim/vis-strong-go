import { useState } from "preact/hooks";
import { EachPlot } from "./EachPlot";
export function Plot({ data }) {
  const exerciseNames = Object.keys(data);
  const [selectedName, setSelectedName] = useState(exerciseNames[0]);

  return (
    <div className="plot-container">
      <div className="bookmarks">
        {exerciseNames.map((name) => (
          <a
            className={selectedName === name ? "selected" : ""}
            onClick={() => setSelectedName(name)}
            key={name}
          >
            {name}
          </a>
        ))}
      </div>
      <div className="plots">
        <EachPlot
          key={selectedName}
          name={selectedName}
          exerciseStat={data[selectedName]}
        />
      </div>
    </div>
  );
}
