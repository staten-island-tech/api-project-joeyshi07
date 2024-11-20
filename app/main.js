import "./style.css";

const nasaAPI = "https://images-api.nasa.gov/search?q=&media_type=image";

async function fetchData(nasaAPI) {
  const response = await fetch(nasaAPI);
  const data = await response.json();
  document.getElementById("api-response").textContent = data.content;
  return data;
}
fetchData(nasaAPI);
