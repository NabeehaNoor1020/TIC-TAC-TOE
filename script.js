const cells = document.querySelectorAll(".cell");

const turn = document.getElementById("turn");

const popup = document.getElementById("popup");

const winnerTitle = document.getElementById("winnerTitle");

const winnerMessage = document.getElementById("winnerMessage");

const restart = document.getElementById("restart");

const close = document.getElementById("close");


/* GAME DATA */

let board = [
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    ""
];


let currentPlayer = "heart";

let gameOver = false;



/* WINNING PATTERNS */

const winningPatterns = [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    [0, 4, 8],
    [2, 4, 6]

];



/* CELL CLICK */

cells.forEach(function (cell) {

    cell.addEventListener("click", function () {

        const index = Number(cell.dataset.index);


        /* Agar game khatam hai */

        if (gameOver) {
            return;
        }


        /* Agar cell already filled hai */

        if (board[index] !== "") {
            return;
        }


        /* Current player save */

        board[index] = currentPlayer;



        /* HEART */

        if (currentPlayer === "heart") {

            cell.innerHTML = "♥";

            cell.classList.add("heart");

        }


        /* ARROW */

        else {

            cell.innerHTML = "➜";

            cell.classList.add("arrow");

        }



        /* Winner check */

        checkWinner();

    });

});



/* CHECK WINNER */

function checkWinner() {

    for (let i = 0; i < winningPatterns.length; i++) {

        const pattern = winningPatterns[i];


        const first = pattern[0];

        const second = pattern[1];

        const third = pattern[2];


        if (
            board[first] !== "" &&
            board[first] === board[second] &&
            board[first] === board[third]
        ) {

            gameOver = true;

            showWinner(board[first]);

            return;

        }

    }



    /* CHECK DRAW */

    if (!board.includes("")) {

        gameOver = true;

        winnerTitle.innerHTML =
            "It's a Tie! 🎀";

        winnerMessage.innerHTML =
            "Awww! Nobody won this time 💕";

        popup.classList.add("show");

        return;

    }



    /* CHANGE PLAYER */

    if (currentPlayer === "heart") {

        currentPlayer = "arrow";

        turn.innerHTML =
            "Arrow's turn ➜";

    }

    else {

        currentPlayer = "heart";

        turn.innerHTML =
            "Heart's turn 💗";

    }

}



/* SHOW WINNER */

function showWinner(winner) {


    if (winner === "heart") {

        winnerTitle.innerHTML =
            "Heart Wins! 💗";

        winnerMessage.innerHTML =
            "Yayyy! The little heart won! 🎁💕";

    }


    else if (winner === "arrow") {

        winnerTitle.innerHTML =
            "Arrow Wins! ➜";

        winnerMessage.innerHTML =
            "Awww! The little arrow won! 🎁💜";

    }


    popup.classList.add("show");

}



/* RESET GAME */

function resetGame() {

    board = [
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        "",
        ""
    ];


    currentPlayer = "heart";

    gameOver = false;



    /* Clear cells */

    cells.forEach(function (cell) {

        cell.innerHTML = "";

        cell.classList.remove("heart");

        cell.classList.remove("arrow");

    });



    /* Reset turn */

    turn.innerHTML =
        "Heart's turn 💗";

}



/* MAIN PLAY AGAIN */

restart.addEventListener("click", function () {

    resetGame();

    popup.classList.remove("show");

});



/* CLOSE POPUP */

close.addEventListener("click", function () {

    popup.classList.remove("show");

});