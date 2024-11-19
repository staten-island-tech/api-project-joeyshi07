import "./style.css";

const nasaAPI = "https://images-api.nasa.gov/search?q=&media_type=image";
fetch(nasaAPI)
    .then((response) => response.json()