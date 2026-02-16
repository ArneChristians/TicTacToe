function Gameboard() {
    const board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;
    const getCell = (num) => board[num];

    const placeMarker = (num, player) => {
        board[num] = player.marker;
    }

    const reset = () => {
        for(let i = 0; i < board.length; i++) {
            board[i] = "";
        }
    }

    return {
        getBoard,
        getCell,
        placeMarker,
        reset
    }
}


function GameController (playerOneName, playerTwoName) {
    const board = Gameboard();

    const players = [
        {
            name: playerOneName,
            marker: "X"
        },
        {
            name: playerTwoName,
            marker: "O"
        }
    ];

    const gameboard = document.querySelector(".gameboard");

    const renderBoard = () => {
        gameboard.innerHTML = "";
        const cells = board.getBoard();
        for(let i = 0; i < board.getBoard().length; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i
            cell.textContent = cells[i];
            //Append Cell to main
            gameboard.appendChild(cell);
        }
    }

    let activePlayer = players[0];

    const info = document.querySelector(".infoContainer");

    const clearBoard = () => {
        const reset = document.querySelector(".reset")

        reset.addEventListener("click", () => {
            board.reset();
            renderBoard();
            activePlayer = players[0];
            info.innerHTML = "";
            info.textContent = `It's ${activePlayer.marker}'s turn!`;
        })
    }

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        info.innerHTML = "";
        info.textContent = `It's ${getActivePlayer().marker}'s turn`;
    }

    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
    ]

    const checkWinner = () => {
        let roundWon = false;

        for(let i = 0; i <= 7; i++) {
            const winningCondition = winConditions[i];
            let a = board.getCell(winningCondition[0]);
            let b = board.getCell(winningCondition[1]);
            let c = board.getCell(winningCondition[2]);

            console.log(a, b, c);

            if(a !== "" && b !== "" && c !=="") {
                if(a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }
        }
        return roundWon;
    }

    const placeMarker = () => {
        gameboard.addEventListener("click", function(e) {
            const cell = e.target.closest(".cell");
            if (!cell) return;

            const index = Number(cell.dataset.index);
            if (board.getCell(index) !== "") {
                console.log("Cell is already compromised!");
            return;
            }

            if(!checkWinner()){
                board.placeMarker(index, getActivePlayer());
                renderBoard();
            }

            if (checkWinner()) {
                info.innerHTML = "";
                info.textContent =`${getActivePlayer().marker} has won the game!`;

            } else {
            switchPlayerTurn();
            printNewRound();
            }
        });
    };

    

    const playRound = () => {
        renderBoard();
        clearBoard();
        printNewRound();
        placeMarker();
    }

    return {
        playRound,
        checkWinner,
        placeMarker,
        renderBoard,
        board,
        clearBoard
    }
}

GameController().playRound();