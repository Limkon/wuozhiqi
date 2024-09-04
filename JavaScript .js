const boardSize = 15;
let currentPlayer = 'black';
let board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
const gameBoard = document.getElementById('gameBoard');
const statusDiv = document.getElementById('status');
const restartButton = document.getElementById('restartButton');

function createBoard() {
    // 清空现有棋盘
    gameBoard.innerHTML = '';
    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            gameBoard.appendChild(cell);
        }
    }
}

function handleCellClick(e) {
    const row = e.target.dataset.row;
    const col = e.target.dataset.col;

    if (board[row][col] || checkWinner()) return;

    board[row][col] = currentPlayer;
    e.target.classList.add('taken');
    e.target.style.backgroundColor = currentPlayer;

    if (checkWinner()) {
        statusDiv.textContent = `${currentPlayer === 'black' ? '黑方' : '白方'}胜利！`;
    } else {
        currentPlayer = currentPlayer === 'black' ? 'white' : 'black';
        statusDiv.textContent = `轮到${currentPlayer === 'black' ? '黑方' : '白方'}`;
    }
}

function checkWinner() {
    function checkDirection(row, col, rowDir, colDir) {
        let count = 0;
        let r = row;
        let c = col;

        while (r >= 0 && r < boardSize && c >= 0 && c < boardSize && board[r][c] === currentPlayer) {
            count++;
            r += rowDir;
            c += colDir;
        }

        return count;
    }

    for (let row = 0; row < boardSize; row++) {
        for (let col = 0; col < boardSize; col++) {
            if (board[row][col] === currentPlayer) {
                if (
                    checkDirection(row, col, 1, 0) + checkDirection(row, col, -1, 0) - 1 >= 5 ||
                    checkDirection(row, col, 0, 1) + checkDirection(row, col, 0, -1) - 1 >= 5 ||
                    checkDirection(row, col, 1, 1) + checkDirection(row, col, -1, -1) - 1 >= 5 ||
                    checkDirection(row, col, 1, -1) + checkDirection(row, col, -1, 1) - 1 >= 5
                ) {
                    return true;
                }
            }
        }
    }

    return false;
}

function resetGame() {
    board = Array(boardSize).fill(null).map(() => Array(boardSize).fill(null));
    currentPlayer = 'black';
    statusDiv.textContent = '轮到黑方';
    createBoard();
}

restartButton.addEventListener('click', resetGame);

// 页面加载时调用createBoard()，生成初始棋盘
createBoard();
statusDiv.textContent = '轮到黑方';
