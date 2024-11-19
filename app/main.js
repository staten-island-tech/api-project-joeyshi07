import "./style.css";

const nasaAPI = "https://images-api.nasa.gov/search?q=&media_type=image";
fetch(nasaAPI).then((response) => response.json());

async function fetchData(nasaAPI) {
  const response = await fetch(nasaAPI);
  const data = await response.json();
  return data;
}
fetchData(nasaAPI);

const apiResponseDOM = document.getElementById("api-response");
const putQuoteINHTML = async () => {
  const quote = await fetchData(apiEntry);
  apiResponseDOM.innerHTML = `Quote: ${quote.content}`;
};
putQuoteINHTML();
