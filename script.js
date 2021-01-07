// BACK TO TOP BUTTON

btnTop = document.getElementById("btnTop");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    btnTop.style.display = "block";
  } else {
    btnTop.style.display = "none";
  }
};

function topFunction() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

// PAPA PARSE ALL GAMES

function parseGames() {
  Papa.parse('https://docs.google.com/spreadsheets/d/1deyiHAzodAjSE7kh40f4uod2lcM3f4M8bPdSiQy27Qs/pub?output=csv', {
    download: true,
    header: true,
    complete: function (results) {
      // console.log(results.data)
    }
  });
};

parseGames();

// NAV ITEMS

const siteTitle = document.getElementById("siteTitle");
const navSearch = document.getElementById("navSearch");
const navRandom = document.getElementById("navRandom");
const navAll = document.getElementById("navAll");
const navManage = document.getElementById("navManage");
const contentHome = document.getElementById("contentHome");
const contentSearch = document.getElementById("contentSearch");
const contentRandom = document.getElementById("contentRandom");
const contentAll = document.getElementById("contentAll");
const contentManage = document.getElementById("contentManage");

siteTitle.addEventListener("click", siteTitleFn);
navSearch.addEventListener("click", navSearchFn);
navRandom.addEventListener("click", navRandomFn);
navAll.addEventListener("click", navAllFn);
navManage.addEventListener("click", navManageFn);

function siteTitleFn() {
  contentSearch.style.display = "none";
  contentRandom.style.display = "none";
  contentAll.style.display = "none";
  contentManage.style.display = "none";
  if (contentHome.style.display === "none") {
    contentHome.style.display = "block";
  };
};

function navSearchFn() {
  contentHome.style.display = "none";
  contentSearch.style.display = "block";
  contentRandom.style.display = "none";
  contentAll.style.display = "none";
  contentManage.style.display = "none";
};

function navRandomFn() {
  contentHome.style.display = "none";
  contentSearch.style.display = "none";
  contentRandom.style.display = "block";
  contentAll.style.display = "none";
  contentManage.style.display = "none";
  randomGame();
};

function navAllFn() {
  contentHome.style.display = "none";
  contentSearch.style.display = "none";
  contentRandom.style.display = "none";
  contentAll.style.display = "block";
  contentManage.style.display = "none";
  getGames();
};

function navManageFn() {
  contentHome.style.display = "none";
  contentSearch.style.display = "none";
  contentRandom.style.display = "none";
  contentAll.style.display = "none";
  contentManage.style.display = "block";
};

// SEARCH GAMES

const playerSlider = document.getElementById('playerSlider');
const playerNum = document.getElementById('playerNum');

playerSlider.defaultValue = 4;

playerNum.innerHTML = playerSlider.value;
playerSlider.oninput = function () {
    playerNum.innerHTML = this.value;
}

const form = document.getElementById('search');
function handleForm(event) { event.preventDefault(); } 
form.addEventListener('submit', handleForm);

const resultsContainer = document.getElementById('resultsContainer');
const searchBtn = document.getElementById('searchBtn');
const refreshSearchBtn = document.getElementById('refreshSearchBtn');
const cardGame = document.getElementById('cardGame');
const boardGame = document.getElementById('boardGame');
const skillGame = document.getElementById('skillGame');
const leisure = document.getElementById('leisure');
const drinkingGame = document.getElementById('drinkingGame');

const gameTypesArr = ["Card Game", "Board Game", "Skill Game", "Leisure", "Drinking Game"];
var searchGameTypes = [];
var gameTypeTrue = [];
// gameTypesArr Index = 0 Card Game, 1 Board Game, 2 Skill Game, 3 Leisure, 4 Drinking Game

searchBtn.addEventListener("click", searchGames);
refreshSearchBtn.addEventListener("click", refreshSearch);

function searchGames() {
  resultsContainer.innerHTML = "";
  Papa.parse('https://docs.google.com/spreadsheets/d/1deyiHAzodAjSE7kh40f4uod2lcM3f4M8bPdSiQy27Qs/pub?output=csv', {
    download: true,
    header: true,
    complete: function (results) {
      var data = results.data
      console.log("Getting games to search now");
      filterGames(data)
    }
  })
};

function filterGames(gamesToFilter) {
  var searchGameTypes = [];
  console.log("Confirming game type now");
  var checkboxes = document.getElementsByClassName('gameChoice');
  for (var checkbox of checkboxes) {
    if (checkbox.checked) {
      searchGameTypes.push(checkbox.name);
    };
  };
  if (searchGameTypes.length === 0) {
    searchGameTypes.push("Card Game", "Board Game", "Skill Game", "Leisure", "Drinking Game");
  };
  console.log("Looking for " + searchGameTypes);
  console.log("Filtering games to show now");
  var gameTypeTrue = [];
  for (let i = 0; gamesToFilter.length > i; i++) {
    if (gamesToFilter[i].Type === searchGameTypes[0])
      gameTypeTrue.push(gamesToFilter[i])
    if (gamesToFilter[i].Type === searchGameTypes[1])
      gameTypeTrue.push(gamesToFilter[i])
    if  (gamesToFilter[i].Type === searchGameTypes[2])
      gameTypeTrue.push(gamesToFilter[i])
    if  (gamesToFilter[i].Type === searchGameTypes[3])
      gameTypeTrue.push(gamesToFilter[i])
    if  (gamesToFilter[i].Type === searchGameTypes[4])
      gameTypeTrue.push(gamesToFilter[i])
  };
  searchResults(gameTypeTrue);
};

function searchResults(gameResults) {
  console.log("Getting games ready to display now");
  var searchPlayerValue = parseInt(document.getElementById('playerSlider').value, 10);
  console.log(searchPlayerValue);
  resultsContainer.innerHTML = "";
  for (let i = 0; i < gameResults.length; i++) {
    var gameName = gameResults[i].Name;
    var gameType = gameResults[i].Type;
    var gameMinPlayers = parseInt(gameResults[i].Min, 10);
    var gameMaxPlayers = parseInt(gameResults[i].Max, 10);
    var gameNotes = gameResults[i].Notes;
    if (searchPlayerValue >= gameMinPlayers) {
      if (searchPlayerValue <= gameMaxPlayers) {
        let gameEle = document.createElement('div');
        let gameNameEle = document.createElement('h3');
        let gameTypeEle = document.createElement('p');
        let gamePlayersEle = document.createElement('p');
        let gameNotesEle = document.createElement('p');
        resultsContainer.appendChild(gameEle);
        gameEle.setAttribute('class', 'gameItem');
        gameEle.appendChild(gameNameEle);
        gameEle.appendChild(gameTypeEle);
        gameEle.appendChild(gamePlayersEle);
        gameEle.appendChild(gameNotesEle);
        gameNameEle.innerHTML = gameName;
        gameTypeEle.innerHTML = gameType;
        gamePlayersEle.innerHTML = gameMinPlayers + "-" + gameMaxPlayers + " players";
        gameNotesEle.innerHTML = gameNotes;
      }
    }
  };
  console.log("Search complete");
};

function refreshSearch() {
  resultsContainer.innerHTML = "";
  playerSlider.value = 4;
  playerNum.innerHTML = playerSlider.value;
  var checkboxes = document.getElementsByClassName('gameChoice');
  for (var checkbox of checkboxes) {
    if (checkbox.checked) {
      checkbox.checked = false;
    };
  };
  console.log("Refreshing search now");
};

// RANDOM GAME

const randomContainer = document.getElementById('randomContainer');
const randomBtn = document.getElementById('randomBtn');

randomBtn.addEventListener("click", randomGame);

function randomGame() {
  randomContainer.innerHTML = "";
  Papa.parse('https://docs.google.com/spreadsheets/d/1deyiHAzodAjSE7kh40f4uod2lcM3f4M8bPdSiQy27Qs/pub?output=csv', {
    download: true,
    header: true,
    complete: function (results) {
      var data = results.data
      showRandom(data)
    }
  });
};

function showRandom(gamesRandom) {
  var randomIndex = Math.floor(Math.random() * gamesRandom.length);
  console.log("Getting random game now");
  let gameName = gamesRandom[randomIndex].Name;
  let gameType = gamesRandom[randomIndex].Type;
  let gameMinPlayers = gamesRandom[randomIndex].Min;
  let gameMaxPlayers = gamesRandom[randomIndex].Max;
  let gameNotes = gamesRandom[randomIndex].Notes;
  let gameEle = document.createElement('div');
  let gameNameEle = document.createElement('h3');
  let gameTypeEle = document.createElement('p');
  let gamePlayersEle = document.createElement('p');
  let gameNotesEle = document.createElement('p');
  randomContainer.appendChild(gameEle);
  gameEle.setAttribute('class', 'gameItem');
  gameEle.appendChild(gameNameEle);
  gameEle.appendChild(gameTypeEle);
  gameEle.appendChild(gamePlayersEle);
  gameEle.appendChild(gameNotesEle);
  gameNameEle.innerHTML = gameName;
  gameTypeEle.innerHTML = gameType;
  gamePlayersEle.innerHTML = gameMinPlayers + "-" + gameMaxPlayers + " players";
  gameNotesEle.innerHTML = gameNotes;
};

// SEE ALL GAMES

const allGamesContainer = document.getElementById('allGamesContainer');
const refreshAllBtn = document.getElementById('refreshAllBtn');

refreshAllBtn.addEventListener("click", refreshAllGames);

function refreshAllGames() {
  allGamesContainer.innerHTML = "";
  console.log("Refreshing games now");
  getGames();
};

function getGames() {
  Papa.parse('https://docs.google.com/spreadsheets/d/1deyiHAzodAjSE7kh40f4uod2lcM3f4M8bPdSiQy27Qs/pub?output=csv', {
    download: true,
    header: true,
    complete: function (results) {
      var data = results.data
      showGames(data)
    }
  })
};

function showGames(gamesAll) {
  for (let i = 0; i < gamesAll.length; i++){
    let gameName = gamesAll[i].Name;
    let gameType = gamesAll[i].Type;
    let gameMinPlayers = gamesAll[i].Min;
    let gameMaxPlayers = gamesAll[i].Max;
    let gameNotes = gamesAll[i].Notes;
    let gameEle = document.createElement('div');
    let gameNameEle = document.createElement('h3');
    let gameTypeEle = document.createElement('p');
    let gamePlayersEle = document.createElement('p');
    let gameNotesEle = document.createElement('p');
    allGamesContainer.appendChild(gameEle);
    gameEle.setAttribute('class', 'gameItem');
    gameEle.appendChild(gameNameEle);
    gameEle.appendChild(gameTypeEle);
    gameEle.appendChild(gamePlayersEle);
    gameEle.appendChild(gameNotesEle);
    gameNameEle.innerHTML = gameName;
    gameTypeEle.innerHTML = gameType;
    gamePlayersEle.innerHTML = gameMinPlayers + "-" + gameMaxPlayers + " players";
    gameNotesEle.innerHTML = gameNotes;
  }
};

// MANAGE GAMES

const sheetsBtn = document.getElementById('sheetsBtn');
const sheetsUrl = "https://docs.google.com/spreadsheets/d/1deyiHAzodAjSE7kh40f4uod2lcM3f4M8bPdSiQy27Qs/edit";

function sheetsBtnFn() {
  window.open(sheetsUrl)
};