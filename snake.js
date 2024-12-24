const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');
const scrEl = document.getElementById('score');
const rstBtn = document.getElementById('restart');

const bgImg = new Image();
bgImg.src = 'background.png';

const foodImg = new Image();
foodImg.src = 'apple.png';

const sz = 20;
let snake = [{ x: 10 * sz, y: 10 * sz }];
let food = { x: Math.floor(Math.random() * 20) * sz, y: Math.floor(Math.random() * 20) * sz };
let dir = null;
let scr = 0;

document.addEventListener('keydown', e => {
  if (e.key === 'ArrowUp' && dir !== 'DOWN') dir = 'UP';
  if (e.key === 'ArrowDown' && dir !== 'UP') dir = 'DOWN';
  if (e.key === 'ArrowLeft' && dir !== 'RIGHT') dir = 'LEFT';
  if (e.key === 'ArrowRight' && dir !== 'LEFT') dir = 'RIGHT';
});

function draw() {
  ctx.drawImage(bgImg, 0, 0, cvs.width, cvs.height);

  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? '#3b0066' : '#fff';
    ctx.fillRect(snake[i].x, snake[i].y, sz, sz);
  }

  ctx.drawImage(foodImg, food.x, food.y, sz, sz);

  let hX = snake[0].x;
  let hY = snake[0].y;

  if (dir === 'UP') hY -= sz;
  if (dir === 'DOWN') hY += sz;
  if (dir === 'LEFT') hX -= sz;
  if (dir === 'RIGHT') hX += sz;

  const nHead = { x: hX, y: hY };

  if (hX === food.x && hY === food.y) {
    scr++;
    scrEl.textContent = scr;
    food = { x: Math.floor(Math.random() * 20) * sz, y: Math.floor(Math.random() * 20) * sz };
  } else {
    snake.pop();
  }

  if (
    hX < 0 || hY < 0 ||
    hX >= cvs.width || hY >= cvs.height ||
    snake.some(seg => seg.x === hX && seg.y === hY)
  ) {
    clearInterval(game);
    alert('Game Over! Score: ' + scr);
  }

  snake.unshift(nHead);
}

rstBtn.addEventListener('click', () => {
  clearInterval(game);
  snake = [{ x: 10 * sz, y: 10 * sz }];
  dir = null;
  scr = 0;
  scrEl.textContent = scr;
  food = { x: Math.floor(Math.random() * 20) * sz, y: Math.floor(Math.random() * 20) * sz };
  game = setInterval(draw, 100);
});

let game = setInterval(draw, 100);
