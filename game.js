const cvs = document.getElementById('gameCanvas');
const ctx = cvs.getContext('2d');
document.getElementById('main-menu-btn').addEventListener('click', () => {
  window.location.href = 'index.html';
});

const bRad = 10;
const pH = 10;
const pW = 100;
let x = cvs.width / 2;
let y = cvs.height - 30;
let dx = 2;
let dy = -2;
let pX = (cvs.width - pW) / 2;
let rPr = false;
let lPr = false;
const minB = 2;
const maxB = 10;
const bRow = Math.floor(Math.random() * (maxB - minB + 1)) + minB;
const bCol = 7;
const bW = 75;
const bH = 20;
const bPad = 10;
const bTop = 30;
const bLeft = 30;

let brks = [];
for (let c = 0; c < bCol; c++) {
  brks[c] = [];
  for (let r = 0; r < bRow; r++) {
    brks[c][r] = { x: 0, y: 0, s: 1 };
  }
}

let gOver = false;

function drawBrks() {
  for (let c = 0; c < bCol; c++) {
    for (let r = 0; r < bRow; r++) {
      if (brks[c][r].s === 1) {
        let bX = (c * (bW + bPad)) + bLeft;
        let bY = (r * (bH + bPad)) + bTop;
        brks[c][r].x = bX;
        brks[c][r].y = bY;
        ctx.beginPath();
        ctx.rect(bX, bY, bW, bH);
        ctx.fillStyle = "#444";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}

function drawP() {
  ctx.beginPath();
  ctx.rect(pX, cvs.height - pH, pW, pH);
  ctx.fillStyle = "#444";
  ctx.fill();
  ctx.closePath();
}

function drawB() {
  ctx.beginPath();
  ctx.arc(x, y, bRad, 0, Math.PI * 2);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.closePath();
}

function draw() {
  ctx.clearRect(0, 0, cvs.width, cvs.height);
  drawBrks();
  drawP();
  drawB();

  if (rPr && pX < cvs.width - pW) pX += 7;
  else if (lPr && pX > 0) pX -= 7;

  x += dx;
  y += dy;

  if (x + dx > cvs.width - bRad || x + dx < bRad) dx = -dx;
  if (y + dy < bRad) dy = -dy;
  else if (y + dy > cvs.height - bRad) {
    if (x > pX && x < pX + pW) dy = -dy;
    else if (!gOver) {
      gOver = true;
      alert("Game Over!");
      document.location.reload();
    }
  }

  let allBrks = true;
  for (let c = 0; c < bCol; c++) {
    for (let r = 0; r < bRow; r++) {
      let b = brks[c][r];
      if (b.s === 1) {
        allBrks = false;
        if (x > b.x && x < b.x + bW && y > b.y && y < b.y + bH) {
          dy = -dy;
          b.s = 0;
        }
      }
    }
  }

  if (allBrks) {
    alert("You Win!");
    document.location.reload();
  }

  requestAnimationFrame(draw);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Right" || e.key === "ArrowRight") rPr = true;
  else if (e.key === "Left" || e.key === "ArrowLeft") lPr = true;
});

document.addEventListener("keyup", (e) => {
  if (e.key === "Right" || e.key === "ArrowRight") rPr = false;
  else if (e.key === "Left" || e.key === "ArrowLeft") lPr = false;
});

document.getElementById('start-button').addEventListener('click', () => {
  draw();
});
