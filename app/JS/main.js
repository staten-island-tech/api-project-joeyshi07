import "../CSS/style.css";

const apiKey = "bc57d6e4-ef97-4886-adb1-ed3d5f4bae64";
let startPage = 1;

const startURL = "https://nuthatch.lastelm.software/v2/birds?page=";

async function fetchData(page) {
  const birdAPI = `${startURL}${page}&pageSize=100&hasImg=true&operator=AND`;
  const response = await fetch(birdAPI, {
    headers: { "api-key": apiKey },
  });
  const data = await response.json();
  console.log(data);
  return data;
}

const putInHTML = async () => {
  const apiResponseDOM = document.getElementById("api-response");

  let morePages = true;

  while (morePages) {
    const data = await fetchData(startPage);

    data.entities.forEach((bird) => {
      const name = bird.name;
      const sciName = bird.sciName;
      const family = bird.family;
      const order = bird.order;
      const region = bird.region.join(", ");
      const image = bird.images[0];

      apiResponseDOM.insertAdjacentHTML(
        "beforeend",
        `
        <div class="bird-card">
          <div class="card-front">
            <h3>${name}</h3>
            <img src="${image}" alt="${name}" class="bird-image"/>
            <p><strong>Region:</strong> ${region}</p>
          </div>

          <div class="card-back">
            <p><strong>Scientific Name:</strong> ${sciName}</p>
            <p><strong>Family:</strong> ${family}</p>
            <p><strong>Order:</strong> ${order}</p>
          </div>
        </div>
      `
      );
    });

    if (data.entities.length < 100) {
      morePages = false; // cuts off before the 100
    } else {
      startPage++; // goes to the next page
    }
  }
};

putInHTML();
