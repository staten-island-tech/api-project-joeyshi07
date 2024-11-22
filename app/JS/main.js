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

  insert.collection.items.forEach((item) => {
    const title = item.data[0].title;
    const image = item.links[0].href;
    const desc = item.data[0].description;

    apiResponseDOM.innerHTML += `
    <h3> title: ${title}</h3> 
    <img src= "${image}" id = "nasa-image" />
    <p> description: ${desc}</p>
    ;`;
  });
};

putInHTML();
