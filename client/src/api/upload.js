const LS_KEY = "StrongData";

export function removeCache() {
  window.localStorage.removeItem(LS_KEY);
}

export function getCache() {
  const cached = window.localStorage.getItem(LS_KEY);
  if (cached) {
    return JSON.parse(cached);
  }
  return null;
}

function isFalsyObject(obj) {
  return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
}
export function cacheData(data) {
  window.localStorage.setItem(LS_KEY, JSON.stringify(data));
}

const BASE_API = "http://localhost:8081/";

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("myFile", file, file?.name || "strong.csv");
  const res = await fetch(BASE_API + "api/v1/upload", {
    method: "POST",
    body: formData,
  });
  if (res.status === 200) {
    const json = await res.json();
    if (isFalsyObject(json)) {
      throw new Error("No data returned. Please check your file.");
    }
    cacheData(json);

    return json;
  }
  throw new Error("Failed to get data");
}
