const gameBoard = document.querySelector(".game")
const startButton = document.querySelector(".btnBoard")
const input = document.querySelector('.input_board');

let totalTime = 60;
let totalFlips = 0;
let intervalID;
let gameOver = false;
startButton.addEventListener('click', (event) => {
    event.preventDefault();
    let columns = input.value;
    let count;
    if (columns >= 2 && columns <= 6 && columns % 2 == 0) {
        count = columns * columns;
    } else {
        input.value = 4
    }
    createBoard(count, columns);
})


function createBoard(count, columns) {
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



function createCard(flippedIcon) {
    const template = document.querySelector('#cardTemplate').cloneNode(true).content;
    const card = template.querySelector('.card');
    card.querySelector('#flippedIcon').classList.add(`fa-${flippedIcon}`);
    card.addEventListener('click', () => {
        gameLogic(card);
    });
    return card;
    
};
function createiconsArray(initialCount) {
    const cardsIcons = ["compass", "cloud", "play", "bolt", "stop", "cogs", "atom", "basketball-ball", "arrows", "angle-left", "bars", "file", "filter", "gear", "folder", "folder-open", "shield", "scissors", "pen-clip"];
    let cards = cardsIcons.slice(0, Math.floor(initialCount / 2));
    let duobleCards = dublicateElements(cards);
    return shuffleArray(duobleCards);
}
function dublicateElements(array) {
    const mas = []
    array.forEach(element => {
        mas.push(element, element)
    });
    return mas;
}
function shuffleArray(array) {
    let currentIndex = array.length;
    while (currentIndex !== 0) {
        currentIndex -= 1;
        const randomIndex = Math.floor(Math.random() * currentIndex);
        const temp = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temp;
    };
    return array;
}
const couple = {
    first: null,
    firstClickable: true,
    second: null,
    secondClickable: true
}
function gameLogic(card) {
    if (gameOver) return;
    if (totalTime === 0) return;
    if (!couple.firstClickable && !couple.secondClickable) return;
    card.classList.add('flip');
    totalFlips++;
    if (couple.first === null) {
     couple.first = card;
     couple.firstClickable = false;
    } else if (couple.second === null && couple.first !== card) {
    couple.second = card;
      couple.secondClickable = false;
    }
    if (couple.first === null || couple.second === null) return;
    const isEqual = couple.first.firstElementChild.classList[2] === couple.second.firstElementChild.classList[2];
    if (isEqual) {
      setTimeout(() => {
        couple.first.classList.add('successfully');
        couple.second.classList.add('successfully');
        refresh();
      }, 1000);
    } else {
      setTimeout(() => {
        
        couple.first.classList.remove('flip');
        couple.second.classList.remove('flip');
        refresh();
      }, 1000);
    };
    function refresh() {
      couple.first = null;
      couple.second = null;
      couple.firstClickable = true;
      couple.secondClickable = true;
    };
    isWin();
  };
function isWin() {
    const gameTable = document.querySelector('.table');
  if (Array.from(gameTable.children).every((card) => card.classList.contains('flip'))) {
    setTimeout(() => {
    clearInterval(intervalId);
    gameOver = true;
    alert("Вы победили!");
    }, 1500)
  }
}
function startTimer() {
    const time = document.querySelector('.state__time');
    const moves = document.querySelector('.state__moves');
    intervalId = setInterval(() => {
        totalTime--
        moves.textContent = `Шаги: ${totalFlips} шагов`;
        time.textContent = `Время: ${totalTime} сек`;
    if (totalTime === 0) {
      clearInterval(intervalId);
    }
  }, 1000);
}