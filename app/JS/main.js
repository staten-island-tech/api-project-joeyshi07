import "../CSS/style.css";

const birdAPI = "https://api.ebird.org/v2/ref/taxonomy/ebird?fmt=json";

async function fetchData(birdAPI) {
  const response = await fetch(birdAPI);
  const data = await response.json();
  console.log(data);
  return data;
}
fetchData(birdAPI);

const putInHTML = async () => {
  const insert = await fetchData(birdAPI);
  const apiResponseDOM = document.getElementById("api-response");

  insert.forEach((item) => {
    // Check if the category is 'species'
    if (item.category === "species") {
      // Extracting relevant information from the response
      const commonName = item.comName;
      const scientificName = item.sciName;
      const order = item.order;
      const family = item.familySciName;

      // Constructing the HTML content to be inserted
      const birdCardHTML = `
        <div class="bird-card">
          <h3>Common Name: ${commonName}</h3>
          <h4>Scientific Name: ${scientificName}</h4>
          <p>Order: ${order}</p>
          <p>Family: ${family}</p>
        </div>
      `;

      // Using insertAdjacentHTML to add the new bird card after the existing content
      apiResponseDOM.insertAdjacentHTML("beforeend", birdCardHTML);
    }
  });
};

putInHTML();
