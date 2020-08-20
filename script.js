const results = document.querySelector("#results");
const rockButton = document.querySelector("#rock");
const paperButton = document.querySelector("#paper");
const scissorsButton = document.querySelector("#scissors");
const winnerDisplayContainer = document.querySelector("#winnerDisplayContainer");

let computerSelection = "";
let scoreComputer = 0;
let scorePlayer = 0;
let round = 1;

rockButton.addEventListener("click", (currentEvent) => game(currentEvent));

paperButton.addEventListener("click", (currentEvent) => game(currentEvent));

scissorsButton.addEventListener("click", (currentEvent) => game(currentEvent));

//Play a game with so many round until Player or Computer has 5 Points
function game(buttonClicked){

    let playerWon;
    let playerSelection = buttonClicked.target.id;
    computerSelection = computerPlay();

    playerWon = playRound(playerSelection, computerSelection);

    displaySelections(buttonClicked, computerSelection);

    updateCurrentPoints(playerWon);

    updateDisplayPoints();

    if (checkWinnerAlready()) {

        displayWinner();
        resetPoints();
        round += 1;

    }
}

//Let computer return either rock, paper or scissors
function computerPlay () {

    let randomNum = randomNumber(0, 2);

    return  (randomNum === 0) ? "rock" :
            (randomNum === 1) ? "paper" :
                                "scissors";
}

//Return a random Integer number
function randomNumber (minNumber, maxNumber) {

    let randomDecimal = Math.random() * (maxNumber - minNumber + 1) + minNumber
    let randomInteger = Math.floor(randomDecimal)
    return randomInteger;

}

//Determine winner - return true if Player has won, false if Computer has won and 0 if it is a draw
function playRound (playerSelection, computerSelection) {

    let playerWon = true;

    if (playerSelection ==="rock") {

        return  (computerSelection === "paper") ? 
                    playerWon = false :
                (computerSelection === "scissors") ?
                    playerWon :
                    0;

    }else if (playerSelection === "paper") {

        return  (computerSelection === "rock") ? 
                    playerWon :
                (computerSelection === "scissors") ?
                    playerWon = false :
                    0;

    } else if (playerSelection === "scissors") {

        return  (computerSelection === "rock") ? 
                    playerWon = false :
                (computerSelection === "paper") ?
                    playerWon :
                    0;
    } 
}

function displaySelections (playerSelection, computerSelection) {

    let computersChoice = document.getElementById(`${computerSelection}Computer`);

    playerSelection.target.classList.add("choice");
    computersChoice.classList.add("choice");
    setTimeout(function(){ 
        playerSelection.target.classList.remove("choice"); 
        computersChoice.classList.remove("choice")
        }, 700);

    
}

function updateCurrentPoints (playerWon) {

    if (playerWon){
        scorePlayer += 1;
    } else if (playerWon === false) {
        scoreComputer += 1;
    } 

}

function updateDisplayPoints () {

    results.textContent = `Your Score: ${scorePlayer} / Computer's Score: ${scoreComputer}`;

}

function checkWinnerAlready () {

    return (scorePlayer === 5) ? true :
        (scoreComputer === 5) ? true : false;

}

function displayWinner () {

    let div = document.createElement('div');

    if (scorePlayer === 5) {
        
        div.textContent = `${round}. Round: You won with ${scorePlayer} : ${scoreComputer} !!`;
        
    } 

    if (scoreComputer === 5) {

        div.textContent = `${round}. Round: You lost with ${scorePlayer} : ${scoreComputer} ...`;
        
    }

    winnerDisplayContainer.appendChild(div);

}

function resetPoints () {
    scoreComputer = 0;
    scorePlayer = 0;
    updateCurrentPoints();
}