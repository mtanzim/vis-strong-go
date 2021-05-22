import { uploadFile, removeCache, getCache } from "../api/upload";
import { useState, useEffect } from "preact/hooks";
import { createRef } from "preact";
import { Plot } from "./Plot";
export function Upload() {
  const [isLoading, setLoading] = useState(false);
  const [failureMsg, setFailureMsg] = useState(null);
  const [responseData, setResponseData] = useState(null);

  const fileInputRef = createRef();

  useEffect(() => {
    const cached = getCache();
    if (cached) {
      setResponseData(cached);
    }
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
    return <p>Loading...</p>;
  }

  if (failureMsg) {
    return (
      <>
        <button onClick={resetData}>Upload a new file</button>
        <p>{failureMsg}</p>
      </>
    );
  }

  if (responseData) {
    return (
      <>
        <button onClick={resetData}>Upload a new file</button>
        <Plot data={responseData} />
      </>
    );
  }

  return (
    <form onSubmit={submit} enctype="multipart/form-data">
      Select CSV file to upload
      <input type="file" accept=".csv" name="myFile" ref={fileInputRef} />
      <input type="submit" value="Upload File" />
    </form>
  );
}
