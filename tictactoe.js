const brd = document.getElementById('board');
const curPlrDisp = document.getElementById('current-player');
const rstBtn = document.getElementById('restart-btn');
const mmBtn = document.getElementById('main-menu-btn');

let curPlr = 'X';
let brdState = ['', '', '', '', '', '', '', '', ''];

function initBrd() {
  brd.innerHTML = '';
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.dataset.idx = i;
    cell.addEventListener('click', onCellClick);
    brd.appendChild(cell);
  }
}

function onCellClick(e) {
  const idx = e.target.dataset.idx;
  if (brdState[idx] !== '') return;
  brdState[idx] = curPlr;
  e.target.textContent = curPlr;

  if (checkWin()) {
    alert(`${curPlr} победил!`);
    return;
  }

  curPlr = curPlr === 'X' ? 'O' : 'X';
  curPlrDisp.textContent = `Текущий игрок: ${curPlr}`;
}

function checkWin() {
  const patterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (const [a, b, c] of patterns) {
    if (brdState[a] && brdState[a] === brdState[b] && brdState[a] === brdState[c]) {
      return true;
    }
  }
  return false;
}

rstBtn.addEventListener('click', () => {
  curPlr = 'X';
  curPlrDisp.textContent = `Текущий игрок: ${curPlr}`;
  brdState = ['', '', '', '', '', '', '', '', ''];
  initBrd();
});

mmBtn.addEventListener('click', () => {
  window.location.href = 'index.html';
});

initBrd();
