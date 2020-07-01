// index.js
// Play rock paper scissors with the computer
// Default is 5 rounds but customizable

const rockPaperScissors = function() {
  // DOM elements
  let body = document.querySelector("body");
  let app = document.getElementById("rps-app");
  let header = document.createElement("div");
  let title = document.createElement("div");
  let container = document.createElement("div");
  let sideNav = document.createElement("div");
  let gameScores = document.createElement("div");
  let nameDiv = document.createElement("div");
  let nameLabel = document.createElement("span");
  let recordText = document.createElement("span");
  let playerScore = document.createElement("div");
  let playerLabel = document.createElement("span");
  let playerRecord = document.createElement("span");
  let cpuScore = document.createElement("div");
  let cpuLabel = document.createElement("span");
  let cpuRecord = document.createElement("span");
  let ratioDiv = document.createElement("div");
  let ratioLabel = document.createElement("span");
  let ratioText = document.createElement("span");
  let roundsDiv = document.createElement("div");
  let roundsLabel = document.createElement("span");
  let roundsText = document.createElement("span");
  let totalRoundsDiv = document.createElement("div");
  let totalRoundsLabel = document.createElement("span");
  let totalRoundsText = document.createElement("span");
  let gameSettings = document.createElement("div");
  let championshipDiv = document.createElement("div");
  let championshipLabel = document.createElement("span");
  let championshipInput = document.createElement("input");
  let btnGroup = document.createElement("div");
  const options = ["Rock", "Paper", "Scissors", "Reset"];
  const optionBtns = options.map(option => {
    let btn = document.createElement("button");
    btn.name = option;
    btn.textContent = option;
    btn.setAttribute(
      "style",
      "width: 100px; height: 25px; margin-bottom: 10px; background-color: #0D47A1; border: none; border-radius: 5px; color: #ffffff;"
    );
    return btn;
  });
  let content = document.createElement("div");
  let gameResults = document.createElement("div");
  let instructions = document.createElement("div");
  let instructionsText = document.createElement("p");
  let footer = document.createElement("div");
  let footerText = document.createElement("a");

  // Game variables
  const results = {
    Rock: { win: "Scissors", lose: "Paper" },
    Paper: { win: "Rock", lose: "Scissors" },
    Scissors: { win: "Paper", lose: "Rock" }
  };
  const choices = Object.keys(results);
  const scores = {
    player: { wins: 0, losses: 0, ties: 0 },
    cpu: { wins: 0, losses: 0, ties: 0 }
  };
  let rounds = 1;
  let totalRounds = 0;
  let isChampion = 0;
  let judges = { player: scores.player, cpu: scores.cpu };

  /******************** GAME METHODS ********************/

  /*
   * Returns random choice for the computer
   */
  function computerPlay() {
    return choices[Math.floor(Math.random() * choices.length)];
  }

  /*
   * Returns win / loss ratio
   */
  function calcRatio() {
    let wins = scores.player.wins;
    let losses = scores.player.losses;
    return losses === 0
      ? Number(wins).toFixed(3)
      : Number(wins / losses).toFixed(3);
  }

  /*
   * Returns record text
   */
  function getRecordText(bool) {
    if (bool) {
      return `${scores.player.wins}-${scores.player.losses}-${
        scores.player.ties
      } ${isChampion === 1 ? "(C)" : ""}`;
    }
    return `${scores.cpu.wins}-${scores.cpu.losses}-${scores.cpu.ties} ${
      isChampion === -1 ? "(C)" : ""
    }`;
  }

  /*
   * Reset rounds and total rounds
   */
  function resetRounds() {
    // reset scores
    scores.player = { wins: 0, losses: 0, ties: 0 };
    scores.cpu = { wins: 0, losses: 0, ties: 0 };
    rounds = 1;
    totalRounds = 0;
    playerRecord.textContent = getRecordText(1);
    cpuRecord.textContent = getRecordText(0);
    ratioText.textContent = "0.000 %";
    roundsText.textContent = rounds;
    totalRoundsText.textContent = totalRounds;
    championshipInput.checked = false;
    // reset game results children
    while (gameResults.firstChild) {
      gameResults.removeChild(gameResults.firstChild);
    }
  }

  /*
   * Reset rounds
   */
  function resetRound() {
    rounds = 1;
    roundsText.textContent = rounds;
  }

  /*
   * Reset judges
   */
  function resetJudges() {
    judges.player = { wins: 0, losses: 0, ties: 0 };
    judges.cpu = { wins: 0, losses: 0, ties: 0 };
  }

  /*
   * Handle banner results
   */
  function handleBanner() {
    let banner = document.createElement("div");
    banner.setAttribute(
      "style",
      "display: flex; justify-content: center; align-items: center; width: 100%; height: 50px; border-radius: 5px;"
    );
    let scoring = judges.player.wins > judges.cpu.wins;
    // handle normal match
    if (!championshipInput.checked && scoring) {
      banner.textContent = "YOU WON THE MATCH!";
      banner.style.backgroundColor = "#1976D2";
      gameResults.appendChild(banner);
    } else if (!championshipInput.checked && !scoring) {
      banner.textContent = "YOU LOST THE MATCH!";
      banner.style.backgroundColor = "#1976D2";
      gameResults.appendChild(banner);
    }

    // handle championship match
    if (championshipInput.checked && scoring && isChampion <= 0) {
      banner.textContent = "YOU WON THE RPS TITLE!!!";
      banner.style.backgroundColor = "#0D47A1";
      gameResults.appendChild(banner);
      isChampion = 1;
    } else if (championshipInput.checked && scoring && isChampion > 0) {
      banner.textContent = "YOU DEFENDED THE RPS TITLE!!!";
      banner.style.backgroundColor = "#0D47A1";
      gameResults.appendChild(banner);
    } else if (championshipInput.checked && !scoring && isChampion > 0) {
      banner.textContent = "YOU LOST THE RPS TITLE!!!";
      banner.style.backgroundColor = "#0D47A1";
      gameResults.appendChild(banner);
      isChampion = -1;
    } else if (championshipInput.checked && !scoring && isChampion <= 0) {
      banner.textContent = "YOU LOST THE CHAMPIONSHIP MATCH!!!";
      banner.style.backgroundColor = "#0D47A1";
      gameResults.appendChild(banner);
      isChampion = -1;
    }

    resetJudges();
    playerRecord.textContent = getRecordText(1);
    cpuRecord.textContent = getRecordText(0);
  }

  /*
   * Handle play round results
   */
  function handleResults(bool, player, computer) {
    let div = document.createElement("div");
    if (bool === 1) {
      scores.player.wins += 1;
      scores.cpu.losses += 1;
      judges.player.wins += 1;
      judges.cpu.losses += 1;
      div.textContent = `You Win! ${player} beats ${computer}`;
    } else if (bool === 0) {
      scores.player.losses += 1;
      scores.cpu.wins += 1;
      judges.player.losses += 1;
      judges.cpu.wins += 1;
      div.textContent = `You Lose! ${player} loses to ${computer}`;
    } else {
      scores.player.ties += 1;
      scores.cpu.ties += 1;
      judges.player.ties += 1;
      judges.cpu.ties += 1;
      div.textContent = `You Tied! ${player} ties with ${computer}`;
    }
    playerRecord.textContent = getRecordText(1);
    cpuRecord.textContent = getRecordText(0);
    ratioText.textContent = `${calcRatio()} %`;

    if (rounds === 3 && !championshipInput.checked) {
      resetRound();
      gameResults.append(div);
      handleBanner();
    } else if (rounds === 5 && championshipInput.checked) {
      resetRound();
      gameResults.append(div);
      handleBanner();
    } else {
      rounds += 1;
      gameResults.append(div);
    }

    totalRounds += 1;
    roundsText.textContent = rounds;
    totalRoundsText.textContent = totalRounds;
  }

  /*
   * Displays outcome based on results dictionary
   */
  function playRound(e) {
    // disable championship input during round
    if (rounds === 1) {
      championshipDiv.contentEditable = true;
      championshipInput.readonly = false;
    } else {
      championshipDiv.contentEditable = false;
      championshipInput.readonly = true;
    }

    if (e.target.name === "Reset") {
      resetRounds();
    } else {
      const player = e.target.name;
      const computer = computerPlay();
      if (computer === results[player]["win"]) {
        handleResults(1, player, computer);
      } else if (computer === results[player]["lose"]) {
        handleResults(0, player, computer);
      } else {
        handleResults(-1, player, computer);
      }
    }
  }

  /******************** GAME METHODS END ********************/

  /******************** DOM METHODS ********************/

  // DOM header
  header.setAttribute(
    "style",
    "display: flex; justify-content: center; align-items: center; width: 100%; height: 72px; background-color: #2196F3;"
  );
  header.appendChild(title);
  title.setAttribute("style", "text-align: center; font-size: 2em;");
  title.textContent = "ROCK PAPER SCISSORS";

  // DOM container
  container.setAttribute(
    "style",
    "max-width: 800px; display: flex; flex-wrap: wrap; margin: 0 auto;"
  );
  container.appendChild(sideNav);
  container.appendChild(content);
  container.appendChild(instructions);

  // DOM sideNav
  sideNav.setAttribute(
    "style",
    "display: flex; flex-direction: column; justify-content: space-around; align-items: center; width: 300px; height: 400px; background-color: #424242;"
  );
  sideNav.appendChild(gameScores);

  // DOM gameScores
  nameLabel.textContent = "Name : ";
  recordText.textContent = "W-L-T";
  nameDiv.appendChild(nameLabel);
  nameDiv.appendChild(recordText);
  gameScores.appendChild(nameDiv);

  gameScores.appendChild(playerScore);
  playerLabel.textContent = "Player : ";
  playerRecord.textContent = getRecordText(1);
  playerScore.appendChild(playerLabel);
  playerScore.appendChild(playerRecord);

  gameScores.appendChild(cpuScore);
  cpuLabel.textContent = "CPU : ";
  cpuRecord.textContent = getRecordText(0);
  cpuScore.appendChild(cpuLabel);
  cpuScore.appendChild(cpuRecord);

  ratioLabel.textContent = "W/L : ";
  ratioText.textContent = "0.000 %";
  ratioDiv.appendChild(ratioLabel);
  ratioDiv.appendChild(ratioText);
  gameScores.appendChild(ratioDiv);

  roundsLabel.textContent = "Round : ";
  roundsText.textContent = rounds;
  roundsDiv.appendChild(roundsLabel);
  roundsDiv.appendChild(roundsText);
  gameScores.appendChild(roundsDiv);

  totalRoundsLabel.textContent = "Total Rounds : ";
  totalRoundsText.textContent = totalRounds;
  totalRoundsDiv.appendChild(totalRoundsLabel);
  totalRoundsDiv.appendChild(totalRoundsText);
  gameScores.appendChild(totalRoundsDiv);

  // DOM gameSettings
  championshipDiv.setAttribute(
    "style",
    "display: flex; justify-content: center; align-items: center;"
  );
  sideNav.appendChild(gameSettings);
  championshipLabel.textContent = "Championship : ";
  championshipInput.type = "checkbox";
  championshipDiv.appendChild(championshipLabel);
  championshipDiv.appendChild(championshipInput);
  gameSettings.appendChild(championshipDiv);

  // DOM btnGroup
  btnGroup.setAttribute("style", "display: flex; flex-direction: column;");
  optionBtns.forEach(btn => btnGroup.appendChild(btn));
  sideNav.append(btnGroup);

  // DOM content
  content.setAttribute(
    "style",
    "display: flex; width: 500px; height: 400px; background-color: #212121;"
  );
  content.appendChild(gameResults);

  // DOM game results
  gameResults.setAttribute(
    "style",
    "width: 100%; overflow: auto; padding: 15px; line-height: 1.5;"
  );

  // DOM instructions
  instructionsText.textContent =
    "Instructions: Default play is a 3 round match. Championship play is a 5 round match. Championship mode can only be toggled during round 1.";
  instructions.appendChild(instructionsText);

  // DOM footer
  footer.setAttribute(
    "style",
    "display: flex; justify-content: center; align-items: center; height: 100px;"
  );
  footerText.setAttribute("style", "text-decoration: none; color: inherit;");
  footerText.textContent = "github.com/headnodic";
  footerText.href =
    "https://github.com/headnodic/vue-the-odin-project-coursework/tree/master/src/components/web-development-101/projects/rock-paper-scissors";
  footer.appendChild(footerText);

  /*
   * Renders DOM elements
   */
  function render() {
    body.setAttribute("style", "margin: 0; padding: 0;");
    // render children
    app.setAttribute(
      "style",
      "font-family: Roboto, sans-serif; background-color: #020202; color: #ffffff;"
    );
    app.appendChild(header);
    app.appendChild(container);
    app.appendChild(footer);

    // TODO: fix bug on refresh
    resetRounds();
  }

  /******************** DOM METHODS END ********************/

  /******************** INIT METHODS ********************/

  // Add event listeners
  optionBtns.forEach(btn => btn.addEventListener("click", playRound));

  // init app
  render();

  /******************** INIT METHODS END ********************/
};

export default rockPaperScissors;
