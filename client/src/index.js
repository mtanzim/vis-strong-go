import { Upload } from "./components/Upload";
import "./style";

export default function App() {
  return (
    <div className="content">
      <h1 className="title" id="title">
        Strong Dashboard
      </h1>
      <Upload />
      <a href="#title" id="backToTop" class="back-to-top" title="Go to top">
        Top
      </a>
    </div>
  );
}
