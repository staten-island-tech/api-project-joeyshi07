import "../CSS/style.css";

const apiKey = "bc57d6e4-ef97-4886-adb1-ed3d5f4bae64";
let startPage = 1;

const startURL = "https://nuthatch.lastelm.software/v2/birds?page=";

let birdData = []; // Use an array to store bird data

async function fetchData(page) {
  try {
    const birdAPI = `${startURL}${page}&pageSize=100&hasImg=true&operator=AND`;
    const response = await fetch(birdAPI, {
      headers: { "api-key": apiKey },
    });
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error fetching bird data", error);
  }
}

const putInHTML = async () => {
  const apiResponseDOM = document.querySelector("#api-response");
  let morePages = true;

  while (morePages) {
    const data = await fetchData(startPage);

    data.entities.forEach((bird) => {
      const name = bird.name;
      const sciName = bird.sciName;
      const family = bird.family;
      const order = bird.order;
      const region = bird.region.join(", "); //if there are multiple list both
      const image = bird.images[0]; //taking first image

      // push bird data to the array
      birdData.push({ name, sciName, family, order, region, image });

      const birdCardHTML = `
        <div class="bird-card w-full sm:w-1/2 md:w-1/3 lg:w-1/5 bg-white border-2 border-teal-600 rounded-lg shadow-lg p-4 m-3 flex flex-col items-center relative overflow-hidden transition-all duration-300 text-xl">
          <div class="card-front flex flex-col items-center justify-center p-4 bg-white text-black z-10 transform translate-x-0 transition-transform duration-500 ease-in-out">
            <h3 class="card-title font-bold text-2xl">${name}</h3>
            <img src="${image}" alt="${name}" class="bird-image shadow-md shadow-slate-400 w-full aspect-square object-cover m-4"/>
            <p class="card-region text-xl">Region: ${region}</p>
          </div>
          <div class="card-back flex flex-col items-center justify-center p-4 bg-white text-teal-800 z-0 absolute top-0 left-0 w-full h-full translate-x-0 text-2xl transition-transform duration-500 ease-in-out ">
            <div class="text-overlay opacity-0 transition-opacity duration-100 ease-in-out hover:opacity-100 text-2xl">
              <p class="text-row mb-4 text-center text-lg"><strong>Scientific Name:</strong> ${sciName}</p>
              <p class="text-row mb-4 text-center text-lg"><strong>Family:</strong> ${family}</p>
              <p class="text-row mb-4 text-center text-lg"><strong>Order:</strong> ${order}</p>
            </div>
          </div>
        </div>
      `;

      apiResponseDOM.insertAdjacentHTML("beforeend", birdCardHTML);
    });

    if (data.entities.length < 100) {
      //if it ends off before 100 that means theres no more left --> stop
      morePages = false;
    } else {
      startPage++; // go to next page and keep generating
    }
  }

  startQuiz(); //only after theres all the data does the quiz start
};

function startQuiz() {
  const quizImage = document.querySelector("#quiz-image"); //identify
  const userInput = document.querySelector("#quiz-input"); //pick category
  const answerInput = document.querySelector("#answer-input"); //user answer
  const quizResult = document.querySelector("#quiz-result");
  const nextQuestion = document.querySelector("#next-question");
  const submitButton = document.querySelector("#submit-button");

  function newQuestion() {
    // Clear previous image
    quizImage.innerHTML = "";

    const randomBird = birdData[Math.floor(Math.random() * birdData.length)]; // random bird from array

    quizImage.insertAdjacentHTML(
      "beforeend",
      `<img src="${randomBird.image}" alt="Random Bird" class="w-full sm:w-3/5 md:w-2/5 lg:w-1/5  aspect-square object-cover mx-auto shadow-md shadow-slate-400 m-4" />`
    ); //insert into the dom

    let currentQuestionType = userInput.value; //what category its on now

    submitButton.addEventListener("click", () => {
      const userAnswer = answerInput.value.trim().toLowerCase(); //their answer goes to all lowercase
      let correctAnswer = "";
      let correctEverything = randomBird[currentQuestionType]; //answer w all the punctauation and whatnot

      correctAnswer = correctEverything.replace(/[^\w\s]/gi, "").toLowerCase(); //match it up all lowercase no punctuation

      if (userAnswer === correctAnswer) {
        quizResult.textContent = "Correct!";
        quizResult.style.color = "green";
      } else {
        quizResult.textContent = `Incorrect! The correct answer was: ${correctEverything}`;
        quizResult.style.color = "red";
      }

      answerInput.value = "";
    });

    userInput.addEventListener("change", () => {
      //other category types
      currentQuestionType = userInput.value;
    });
    quizResult.textContent = "";
  }
  newQuestion();
  nextQuestion.addEventListener("click", newQuestion); //new question
}
putInHTML();
