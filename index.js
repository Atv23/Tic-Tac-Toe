const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const winnerInfo = document.querySelector(".winner-info");
const newGameBtn = document.querySelector(".btn");
gameInfo.style.fontWeight = 'bold';
winnerInfo.style.fontWeight = 'bold';

let currentPlayer;
let gameGrid;

const winningPosition = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

//  initialize the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["","","","","","","","",""];

    // empty boxes on ui
    boxes.forEach((box,index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //intialise with css property
        box.classList = `box box${index+1}`;
    });


    winnerInfo.classList.remove("winnerupdate");
    // newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if(currentPlayer === "X")
    {
        currentPlayer = "O";
    }
    else
    {
        currentPlayer = "X";
    }

    // UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
};

function checkGameOver() {
    let answer = "";

    winningPosition.forEach((position) => {
        // All 3 boxes are non-empty and exactly same in value
        if((gameGrid[position[0]] != "" || gameGrid[position[1]] != "" || gameGrid[position[2]] != "") && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]))
        {
            // Check if winner is X
            if(gameGrid[position[0]] === "X")
            {
                answer = "X";
            }
            else
            {
                answer = "O";
            }

            // Disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //add animation behind to show winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //we got winner
    if(answer !== "")
    {
        winnerInfo.innerText = `Winner Player - ${answer}`;
        winnerInfo.classList.add("winnerupdate");
        // newGameBtn.classList.add("active");
        return;
    }

    //Check for tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if(box !== "")
        {
            fillCount++;
        }
    });

    //  game is tied
    if(fillCount === 9)
    {
        winnerInfo.innerText = "Game Tied !";
        winnerInfo.classList.add("winnerupdate");
        // newGameBtn.classList.add("active");
    }
};

function handleClick(index) {
    if(gameGrid[index] === "")
    {
        // showing in ui
        boxes[index].innerText = currentPlayer;

        // logic 
        gameGrid[index] = currentPlayer;

        boxes[index].style.pointerEvents = "none";

        // Swap the turn
        swapTurn();

        // check karo koi jeet tho nahi gaya
        checkGameOver();
    }
};

// To add eventListeners to all the grids so taking forEach Index -> to know which box we have clicked

boxes.forEach((box,index) => {
    box.addEventListener("click" , () => {
        handleClick(index);
    })
});


newGameBtn.addEventListener( "click" , initGame);