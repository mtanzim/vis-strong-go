import { EachPlot } from "./EachPlot";
import { Bookmarks } from "./Bookmarks";
export function Plot({ data }) {
  const exerciseNames = Object.keys(data);
  return (
    <div>
      <Bookmarks names={exerciseNames} />
      <div className="plots">
        {exerciseNames.map((name) => (
          <EachPlot key={name} name={name} exerciseStat={data[name]} />
        ))}
      </div>
    </div>
  );
}
