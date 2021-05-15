async function fetchData() {
  const res = await fetch("/api/v1/data", {});

  if (res.status === 200) {
    return res.json();
  }
  throw new Error("Failed to get data");
}

async function main() {
  console.log("Hello world");
  const data = await fetchData();
  console.log(data);
}

window.strongMain = main;
