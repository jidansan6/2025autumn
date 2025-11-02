// 2048 Puzzle Game
const boardEl = document.getElementById('board');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restartBtn');
const restartBtn2 = document.getElementById('restartBtn2');
const gameOverEl = document.getElementById('gameOver');

let board, score, gameOver;

function init() {
  board = Array(4).fill().map(()=>Array(4).fill(0));
  score = 0;
  gameOver = false;
  addTile(); addTile();
  update();
}

function addTile() {
  let empty = [];
  for(let r=0;r<4;r++) for(let c=0;c<4;c++) if(board[r][c]===0) empty.push([r,c]);
  if(empty.length){
    let [r,c] = empty[Math.floor(Math.random()*empty.length)];
    board[r][c] = Math.random()<0.9 ? 2 : 4;
  }
}

function update(mergeMap) {
  boardEl.innerHTML = '';
  for(let r=0;r<4;r++){
    for(let c=0;c<4;c++){
      let v = board[r][c];
      let tile = document.createElement('div');
      tile.className = 'tile';
      tile.setAttribute('data-value', v);
      tile.textContent = v>0?v:'';
      if(mergeMap && mergeMap[r] && mergeMap[r][c]) tile.classList.add('merge');
      boardEl.appendChild(tile);
    }
  }
  scoreEl.textContent = 'Score: ' + score;
  if(gameOver){
    gameOverEl.style.display = 'block';
  }else{
    gameOverEl.style.display = 'none';
  }
}

function move(dir){
  let moved = false;
  let merged = Array(4).fill().map(()=>Array(4).fill(false));
  function tryMove(r,c,dr,dc){
    let nr=r+dr,nc=c+dc;
    if(nr<0||nr>3||nc<0||nc>3) return false;
    if(board[nr][nc]===0){
      board[nr][nc]=board[r][c];
      board[r][c]=0;
      moved=true;
      tryMove(nr,nc,dr,dc);
    }else if(board[nr][nc]===board[r][c]&&!merged[nr][nc]&&!merged[r][c]){
      board[nr][nc]*=2;
      board[r][c]=0;
      score+=board[nr][nc];
      merged[nr][nc]=true;
      moved=true;
    }
  }
  if(dir==='left'){
    for(let r=0;r<4;r++) for(let c=1;c<4;c++) if(board[r][c]) tryMove(r,c,0,-1);
  }
  if(dir==='right'){
    for(let r=0;r<4;r++) for(let c=2;c>=0;c--) if(board[r][c]) tryMove(r,c,0,1);
  }
  if(dir==='up'){
    for(let c=0;c<4;c++) for(let r=1;r<4;r++) if(board[r][c]) tryMove(r,c,-1,0);
  }
  if(dir==='down'){
    for(let c=0;c<4;c++) for(let r=2;r>=0;r--) if(board[r][c]) tryMove(r,c,1,0);
  }
  if(moved){
    addTile();
    update(merged);
    if(isGameOver()){
      gameOver=true;
      update();
    }
  }
}

function isGameOver(){
  for(let r=0;r<4;r++) for(let c=0;c<4;c++) if(board[r][c]===0) return false;
  for(let r=0;r<4;r++) for(let c=0;c<4;c++){
    let v=board[r][c];
    if(r<3&&board[r+1][c]===v) return false;
    if(c<3&&board[r][c+1]===v) return false;
  }
  return true;
}


// PC: 矢印キー
document.addEventListener('keydown',e=>{
  if(gameOver) return;
  if(e.key==='ArrowLeft') move('left');
  if(e.key==='ArrowRight') move('right');
  if(e.key==='ArrowUp') move('up');
  if(e.key==='ArrowDown') move('down');
});

// スマホ: スワイプ
let touchStartX, touchStartY;
boardEl.addEventListener('touchstart',e=>{
  if(e.touches.length!==1) return;
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
});
boardEl.addEventListener('touchend',e=>{
  if(gameOver) return;
  if(touchStartX==null||touchStartY==null) return;
  let dx = e.changedTouches[0].clientX - touchStartX;
  let dy = e.changedTouches[0].clientY - touchStartY;
  if(Math.abs(dx)>Math.abs(dy)){
    if(dx>30) move('right');
    else if(dx<-30) move('left');
  }else{
    if(dy>30) move('down');
    else if(dy<-30) move('up');
  }
  touchStartX = touchStartY = null;
});

restartBtn.onclick = restartBtn2.onclick = ()=>{init();};

init();
