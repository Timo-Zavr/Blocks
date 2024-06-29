const map = document.querySelector("#game")
const canvas = map.getContext('2d')
canvas.fillStyle = 'rgb( 60, 100, 0)'

const grid = 15
const pSpeed = 13
let biger = 0
let paddleHeight = grid + biger;

let randomL = Math.floor(Math.random()*1000)+500

const plaer = {
    x: map.width / 2,
    y: map.height - grid* 5,
    width: grid+biger,
    height: grid+biger,
    dx: 0,
    dy: 0,
}
let randomS = Math.floor(Math.random()*paddleHeight/3*grid)
let maxPaddleY = map.height - grid - paddleHeight;
let maxPaddleX = map.width - grid - paddleHeight;
const enemy = {
    x: randomL,
    y: -randomS*3,
    width: randomS,
    height: randomS,
    dy: 5,
}

function clearMap() {
    canvas.clearRect(0, 0, map.width, map.height);
}
function renderPlaer(){
    canvas.fillRect(plaer.x, plaer.y, plaer.width, plaer.height)
}
function renderOll(){
    canvas.fillRect(enemy.x, enemy.y, enemy.width, enemy.height)
}
function renderMap() {
    canvas.fillRect(0, 0, map.width, grid); // Верхняя граница
    canvas.fillRect(0, map.height - grid, map.width, grid) // Нижняя граница
    canvas.fillRect(0, 0, grid, map.height) // Левая граница
    canvas.fillRect(map.width - grid, 0, grid, map.height) // Правая граница
}
function moveOll() {
    plaer.y += plaer.dy
    plaer.x += plaer.dx

    enemy.y += enemy.dy
}
function isCollides(object1, object2) {
    const width1 = object1.x + object1.width+20;
    const width2 = object2.x + object2.width+20;
    const height1 = object1.y + object1.height;
    const height2 = object2.y + object2.height;
    return object1.x < width2
        && object2.x < width1
        && object1.y < height2
        && object2.y < height1
}
function colideOllWithsWalls(){
    if (enemy.y > map.height){
        enemy.y = -randomS*3
        randomS = Math.floor(Math.random()*paddleHeight/3*grid)
        randomL = Math.floor(Math.random()*1100)
        enemy.x = randomL
        enemy.width = randomS
        enemy.height = randomS
    }
    if (plaer.x < grid){
        plaer.x = grid
    }
    if (plaer.x > maxPaddleX){
        plaer.x = maxPaddleX
    }
    if (plaer.y > maxPaddleY){
        plaer.y = maxPaddleY
    }
    if (plaer.y < grid){
        plaer.y = grid
    }
}
function coildeOll(){
    if(isCollides(plaer, enemy)){
        if (plaer.width >= enemy.width){
            enemy.y = -randomS*3
            randomL = Math.floor(Math.random()*1100)
            enemy.x = randomL
            
            biger += plaer.width - enemy.width
            plaer.width = grid+biger
            plaer.height = grid+biger
            paddleHeight = grid + biger;
            maxPaddleY = map.height - grid - paddleHeight;
            maxPaddleX = map.width - grid - paddleHeight;
            randomS = Math.floor(Math.random()*paddleHeight/3*grid)
            enemy.width = randomS
            enemy.height = randomS
        } else {
            enemy.y = -randomS*3
            randomL = Math.floor(Math.random()*1100)
            enemy.x = randomL
            
            plaer.x = map.width / 2
            plaer.y = map.height - grid* 5
            biger = 0
            plaer.width = grid+biger
            plaer.height = grid+biger
            paddleHeight = grid + biger
            maxPaddleY = map.height - grid - paddleHeight;
            maxPaddleX = map.width - grid - paddleHeight;
            randomS = Math.floor(Math.random()*paddleHeight/3*grid)
            enemy.width = randomS
            enemy.height = randomS
        }
    }
}

function loop() {
    clearMap()
    renderPlaer()
    renderOll()
    
    coildeOll()
    colideOllWithsWalls()
    moveOll()
    
    renderMap()
    requestAnimationFrame(loop)
}

document.addEventListener('keydown', (event) => {
    if (event.code === "KeyD") {
        plaer.dx = pSpeed
    }
})
document.addEventListener('keydown', (event) => {
    if (event.code === "KeyA") {
        plaer.dx = -pSpeed
    }
})
document.addEventListener("keyup", (event) =>{
    if (event.code === "KeyA" || event.code === "KeyD"){
        plaer.dx = 0
    }
})
document.addEventListener('keydown', (event) => {
    if (event.code === "KeyW") {
        plaer.dy = -pSpeed
    }
})
document.addEventListener('keydown', (event) => {
    if (event.code === "KeyS") {
        plaer.dy = pSpeed
    }
})
document.addEventListener("keyup", (event) =>{
    if (event.code === "KeyW" || event.code === "KeyS"){
        plaer.dy = 0
    }
})

document.addEventListener('keydown', (event) => {
    if (event.key === 'f' || event.key === 'а') {
        fs()
    }
})
function fs(){
    if (!document.fullscreenElement){
        document.documentElement.requestFullscreen()
    } else if (document.exitFullscreen){
        document.exitFullscreen()
    }
}
requestAnimationFrame(loop)