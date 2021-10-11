const game = document.querySelector('#game');

const drawBoard = (rows, cols, bombs) => {
    let first = true;
    let matrix = Array(rows).fill(null).map(() => Array(cols).fill(0));
    
    const revealCell = (clickedRow, clickedCol) => () => {
        const showCell = (row, col) => {
            const cell = document.getElementById(`${row}-${col}`);
            cell.innerHTML = matrix[row][col];
        };

        const isSafe = (row, col) => {
            return (row >= 0 && row < rows) &&
            (col >= 0 && col < cols) &&
            matrix[row][col] !== '*';
        };
        
        const increaseAdjacentNumbers = (row, col) => {
            for (let i = -1; i <= 1; i++) {
                for (let j = -1; j <= 1; j++) {
                    if (!(i === 0 && j === 0) && isSafe(row + i, col + j)) {
                        matrix[row + i][col + j] += 1;
                    }
                }
            }
        };

        const generateMatrix = () => {
            let activeBombs = 0;
            while (activeBombs < bombs) {
                const row = Math.floor(Math.random() * rows);
                const col = Math.floor(Math.random() * cols);

                const isNotFirstCellClicked = !(clickedRow === row && clickedCol === col);

                if (isNotFirstCellClicked && matrix[row][col] !== '*') {
                    matrix[row][col] = '*';
                    increaseAdjacentNumbers(row, col);
                    activeBombs++;
                }
            }
        };

        if (first) {
            generateMatrix();
            first = false;
            console.table(matrix);
            showCell(clickedRow, clickedCol);
        }
    };

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');
        game.appendChild(row);
        for (let j = 0; j < cols; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.id = `${i}-${j}`;
            cell.addEventListener('click', revealCell(i, j));
            row.appendChild(cell);
        }
    }
};

const initGame = (rows, cols, bombs) => {
    drawBoard(rows, cols, bombs);
};
