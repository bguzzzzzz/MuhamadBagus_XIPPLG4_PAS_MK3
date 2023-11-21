document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('board');
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.createElement('button');
    const boardOptions = ['redd', 'grenn', 'blueh'];
    let currentBoard = 'red';

    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    const checkWinner = () => {
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        for (const combo of winningCombos) {
            const [a, b, c] = combo;
            if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                return gameBoard[a];
            }
        }

        return gameBoard.includes('') ? null : 'T';
    };

    const handleCellClick = (index) => {
        if (!gameActive || gameBoard[index] !== '') return;

        gameBoard[index] = currentPlayer;
        cells[index].textContent = currentPlayer;

        const winner = checkWinner();
        if (winner) {
            gameActive = false;
            if (winner === 'T') {
                message.textContent = 'It\'s a tie!';
            } else {
                message.textContent = `${winner} wins!`;
            }
            showResetButton();
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            message.textContent = `${currentPlayer}'s turn`;
        }
    };

    const showResetButton = () => {
        resetButton.textContent = 'Play Again';
        resetButton.addEventListener('click', resetGame);
        board.appendChild(resetButton);
    };

    const resetGame = () => {
        gameActive = true;
        currentPlayer = 'X';
        gameBoard = ['', '', '', '', '', '', '', '', ''];
        message.textContent = `${currentPlayer}'s turn`;
        cells.forEach((cell) => {
            cell.textContent = '';
        });
        resetButton.remove();
    };

    const changeBoard = (newBoard) => {
        currentBoard = newBoard;
        board.className = `board ${currentBoard.toLowerCase()}`;
        resetGame();
    };

    const createBoardOptions = () => {
        const optionsContainer = document.createElement('div');
        optionsContainer.className = 'board-options';

        boardOptions.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.addEventListener('click', () => changeBoard(option));
            optionsContainer.appendChild(button);
        });

        return optionsContainer;
    };

    const initGame = () => {
        board.appendChild(createBoardOptions());
        board.className = `board ${currentBoard.toLowerCase()}`;

        cells.forEach((cell, index) => {
            cell.addEventListener('click', () => handleCellClick(index));
        });
    };

    initGame();
});
