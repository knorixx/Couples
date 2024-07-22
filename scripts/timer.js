import { totalFlips } from "./gameLogic.js";
let totalTime = 60;
let intervalID;
function startTimer() {
    const time = document.querySelector('.state__time');
    const moves = document.querySelector('.state__moves');
    intervalID = setInterval(() => {
        totalTime--
        moves.textContent = `Шаги: ${totalFlips} шагов`;
        time.textContent = `Время: ${totalTime} сек`;
    if (totalTime === 0) {
      clearInterval(intervalID);
    }
  }, 1000);
}
function stopTimer() {
    clearInterval(intervalID);
}
export {startTimer, stopTimer, totalTime};



