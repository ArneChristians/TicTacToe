function Gameboard() {
    const rows = 3;
    const columns = 3;
    const board = [];

    for(let i = 0; i < rows; i++) {
        board[i] = [];
        for(let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    const getBoard = () => board;

    return {getBoard}
}

function Cell() {
    let state = "";

    const addMarker = (player) => {
        state = this.marker;
    }

    const getState = () => state;

    return {
        addMarker,
        getState
    };
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

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    }
    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        console.log(`It's ${getActivePlayer().marker}'s turn`)
    }

    const checkWinner = () => {
        
    }


    const playRound = () => {
        //Logic to play a round
    }
}

