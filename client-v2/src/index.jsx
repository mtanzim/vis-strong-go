import { render } from "preact";

import "./style.css";
import { Upload } from "./components/Upload";

export function App() {
  return (
    <div className="content">
      <h1 className="title" id="title">
        Strong Dashboard
      </h1>
      <Upload />
    </div>
  );
}

render(<App />, document.getElementById("app"));
