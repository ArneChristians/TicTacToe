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
        for(let i = 0; i < board.getBoard().length; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.textContent = board.getBoard()[i];
            //Append Cell to main
            gameboard.appendChild(cell);
        }
    }

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        console.log(`It's ${getActivePlayer().marker}'s turn`)
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

            if(a != "" && b != "" && c !="") {
                if(a === b || b === c) {
                    roundWon = true;
                }
            }
        }
        return roundWon;
    }

    const placeMarker = (num) => {
        const cell = board.getCell(num);
        if(cell === "") {
            board.placeMarker(num, getActivePlayer())
            console.log(board.getCell(num));
        } else {
            console.log("Cell is already compromised!")
        }
    };
    
    const playRound = () => {

          
        //while() -> Solange es keinen Winner gibt
            printNewRound();
            placeMarker(0);
            if(checkWinner === true) {
                console.log(`${activePlayer.marker} has won the game!`)
            }
            switchPlayerTurn();
            placeMarker(1)
            console.log(board.getBoard());
            renderBoard();
        
    }

    return {
        playRound,
        checkWinner,
        placeMarker,
        renderBoard
    }
}

