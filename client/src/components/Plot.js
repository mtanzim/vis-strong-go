import { EachPlot } from "./EachPlot";
import { Bookmarks } from "./Bookmarks";
export function Plot({ data }) {
  const exerciseNames = Object.keys(data);
  return (
    <div>
      <Bookmarks names={exerciseNames} />
      <div className="plots">
        {exerciseNames.map((name) => (
          <div key={name} className="plot-item">
            <EachPlot name={name} exerciseStat={data[name]} />
          </div>
        ))}
      </div>
    </div>
  );
}
