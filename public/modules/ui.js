export function showError(msg) {
  const errorDiv = document.getElementById("error");
  errorDiv.innerText = msg;
}

export function resetError() {
  const errorDiv = document.getElementById("error");
  errorDiv.innerText = "";
}

export function triggerLoading() {
  const loader = document.getElementById("loader");
  loader.innerText = "Loading...";
  const elems = document.getElementsByClassName("upload-form");
  for (const elem of elems) {
    elem.style.visibility = "hidden";
  }
}
export function stopLoading() {
  const loader = document.getElementById("loader");
  loader.innerText = "";
  const elems = document.getElementsByClassName("upload-form");
  for (const elem of elems) {
    elem.style.visibility = "visible";
  }
}

export function setupForm(submitHandler) {
  const form = document.getElementById("csv-form");
  form.addEventListener("submit", submitHandler);
  form.style.display = "block";

  const reupload = document.getElementById("re-upload");
  reupload.style.display = "none";
}

export function removeForm(cacheRemover, submitHandler) {
  const form = document.getElementById("csv-form");
  form.style.display = "none";

  const reupload = document.getElementById("re-upload");
  reupload.style.display = "block";

  reupload.addEventListener("click", () => {
    cacheRemover();
    document.getElementById("bookmarks").innerHTML = "";
    document.getElementById("exercisePlots").innerHTML = "";
    setupForm(submitHandler);
  });
}

export function createBookmarks(exerciseNames) {
  const bookmarksDiv = document.getElementById("bookmarks");
  exerciseNames.forEach((exc) => {
    const aComp = document.createElement("a");
    aComp.href = `#${exc}`;
    aComp.text = exc;
    bookmarksDiv.appendChild(aComp);
  });
}
