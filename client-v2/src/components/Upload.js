import { uploadFile, removeCache, getCache } from "../api/upload";
import { useState, useEffect } from "preact/hooks";
import { createRef } from "preact";
import { Plot } from "./Plot";
import { Loader } from "./Loader";
export function Upload() {
  const [isLoading, setLoading] = useState(true);
  const [failureMsg, setFailureMsg] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const fileInputRef = createRef();

  useEffect(() => {
    const cached = getCache();
    if (cached) {
      setResponseData(cached);
    }
    setLoading(false);
  }, []);

  const resetData = () => {
    removeCache();
    setFailureMsg(null);
    setResponseData(null);
  };

  const submit = async (event) => {
    event.preventDefault();
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      return;
    }
    try {
      setLoading(true);
      const data = await uploadFile(file);
      setResponseData(data);
    } catch (err) {
      console.log(err);
      setFailureMsg(err?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (failureMsg) {
    return (
      <>
        <button className="control-btn" onClick={resetData}>
          Upload a new file
        </button>
        <div className="border-bottom" />
        <p>{failureMsg}</p>
      </>
    );
  }

  if (responseData) {
    return (
      <div>
        <button className="control-btn" onClick={resetData}>
          Upload a new file
        </button>
        <div className="border-bottom" />
        <Plot data={responseData} />
      </div>
    );
  }

  return (
    <div>
      <p>
        Welcome to Strong Dashboard. Upload your csv file exported from the
        Strong app to visualize your data and get a sense of your progress.
      </p>
      <div>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="#"
        >
          <button className="control-btn">Strong App</button>
        </a>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="#"
        >
          <button className="control-btn">Exporting Strong data</button>
        </a>
      </div>
      <form
        className="upload-form border-bottom"
        onSubmit={submit}
        enctype="multipart/form-data"
      >
        <label>
          <input
            className="control-btn"
            type="file"
            accept=".csv"
            name="myFile"
            ref={fileInputRef}
          />
          <input
            className="control-btn"
            style={{ marginLeft: 8 }}
            type="submit"
            value="Upload File"
          />
        </label>
      </form>
    </div>
  );
}
