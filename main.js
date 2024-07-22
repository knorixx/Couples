import { createBoard } from "./scripts/createBoard.js";
const startButton = document.querySelector(".btnBoard")


startButton.addEventListener('click', (event) => {
    event.preventDefault();
    const input = document.querySelector('.input_board');
    let columns = input.value;
    let count;
    if (columns >= 2 && columns <= 6 && columns % 2 == 0) {
        count = columns * columns;
    } else {
        input.value = 4
    }
    createBoard(count, columns);
});







