async function fetchData() {
  const res = await fetch("/api/v1/data", {});

  if (res.status === 200) {
    return res.json();
  }
  throw new Error("Failed to get data");
}

async function main() {
  console.log("Hello world");
  try {
    const data = await fetchData();
    console.log(data);
    const exerciseNames = Object.keys(data);
    const exercisesDiv = document.getElementById("exerciseNames");
    exercisesDiv.innerHTML = `
    <ul style="list-style-type: none">
      ${exerciseNames.map((e) => `<li>${e}</l1>`).join("")}
    </ul>
    
    `;
  } catch (err) {
    console.log(err);
  }
}

window.strongMain = main;
