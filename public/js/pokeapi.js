// Variables to initialize or move pages
const searchBtn = document.getElementById("search-submit");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
let currentPage = 1;

//*Function to get pokemon card data. Change name of pokemon to get a different result. Change pagesize= and a number to get a different number of results (can become a variable later too if we want)
// const getCards = async () => {
//   let currentPageEl = document.querySelector(".pageCount");
//   // const apiKey = process.env("X_API_KEY");
//   let userInput = document.querySelector("#pokemon-name").value;
//   try {
//     const response = await fetch(
//       `https://api.pokemontcg.io/v2/cards/?q=name:${userInput}&page=${currentPage}&pageSize=10`,
//       {
//         method: "GET",
//         //TODO use variable once server is up and running
//         // headers: { "X-API-KEY": X_API_KEY },
//       }
//     );
//     const result = await response.json();
//     let cardEl = document.querySelector(".pokemonCard");
//     let pageTotal = Math.ceil(result.totalCount / result.pageSize);
//     cardEl.innerHTML = "";
//     // Loops through results and returns the desired number of cards
//     for (let i = 0; i < result.data.length; i++) {
//       cardEl.innerHTML += `<a data-toggle="modal" href="#${result.data[i].id}" class="modal-trigger"><img class="cards" id="${result.data[i].id}" src ="${result.data[i].images.small}"/></a>`;
//       if (currentPage === 1) {
//         prevBtn.disabled = true;
//       }
//       if (currentPage > 1) {
//         prevBtn.disabled = false;
//       }
//       if (currentPage / pageTotal === 1) {
//         nextBtn.disabled = true;
//       } else {
//         nextBtn.disabled = false;
//       }
//     }
//     currentPageEl.innerHTML = `<h1>Page ${currentPage} of ${pageTotal}</h1>`;
//     // console.log(result);
//     // console.log(cardCount);
//     // console.log(pageTotal);
//   } catch (err) {
//     console.log(err);
//   }
// };

const getCards = async () => {
  try {
    let userInput = document.querySelector("#pokemon-name").value;

    const apiData = await fetch("/search/results", {
      method: "POST",
      body: JSON.stringify({ name: userInput }),
      headers: { "Content-Type": "application/json" },
    });
    await document.location.replace("/search/results");
  } catch (err) {
    console.log(err);
  }
};

const getCardsTest = async () => {
  try {
    let userInput = document.querySelector("#pokemon-name").value;

    const apiData = await fetch("/search/results/test", {
      method: "POST",
      body: JSON.stringify({ name: userInput }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(apiData);
    // document.location.replace("/search/results");
  } catch (err) {
    console.log(err);
  }
};
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  getCardsTest();
});

nextBtn.addEventListener("click", function () {
  event.preventDefault();
  currentPage++;
  getCards();
});
prevBtn.addEventListener("click", function () {
  event.preventDefault();
  currentPage--;
  getCards();
});
