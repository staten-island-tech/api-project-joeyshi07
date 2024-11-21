import "../CSS/style.css";

const nasaAPI = "https://images-api.nasa.gov/search?q=&media_type=image";

async function fetchData(nasaAPI) {
  const response = await fetch(nasaAPI);
  const data = await response.json();
  console.log(data);
  return data;
}
fetchData(nasaAPI);

const putInHTML = async () => {
  const insert = await fetchData(nasaAPI);
  const apiResponseDOM = document.getElementById("api-response");
  const title = insert.collection.items[0].data[0].title;
  const image = insert.collection.items[0].links[0].href;
  apiResponseDOM.innerHTML = `title: ${title} <img src= ${image}/>`;
};
putInHTML();
