import { createiconsArray, createCard } from "./cards.js";
import { startTimer } from "./timer.js";

export function createBoard(count, columns) {
    const gameBoard = document.querySelector(".game");
    gameBoard.textContent = "";
    const template = document.querySelector('#gameTableTemplate').cloneNode(true).content;
    const gameTable = template.querySelector('.table');
    const gameRestart = template.querySelector('.table_button');
    let icons = createiconsArray(count);
    icons.forEach((icon) => {
        gameTable.append(createCard(icon));
    });
    gameTable.style = `
    grid-template-columns: repeat(${columns}, 1fr);
    grid-template-rows: repeat(${columns}, 1fr);
  `;
    gameBoard.append(gameTable);
    gameRestart.addEventListener('click', () => {
        location.reload();
    })
    gameBoard.append(gameRestart);
    startTimer();
}
