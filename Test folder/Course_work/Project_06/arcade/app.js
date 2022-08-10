const board = document.querySelector('#board');
const table = document.createElement('table');
const start = document.getElementById('start');
const reset = document.getElementById('reset');

function makeBoard() {

    for (let x = 0; x < 15; x++) {
        const row = document.createElement('tr');
        for (let y = 0; y < 15; y++) {
            const column = document.createElement('td');
            row.appendChild(column);
        }
        table.appendChild(row);
    }
    board.appendChild(table);
}

function drawSnake() {
    table.children.item(gameState.snake.head[0]).children.item(gameState.snake.head[1]).setAttribute('class', 'snake');
    for (let i = 0; i < gameState.snake.body.length; i++) {
        table.children.item(gameState.snake.body[i][0]).children.item(gameState.snake.body[i][1]).setAttribute('class', 'snake');
    }
}

function drawApple() {
    table.children.item(gameState.apple[0]).children.item(gameState.apple[1]).setAttribute('id', 'apple');
}

let gameState = {
    snake: {},
    apple: [],
    speed: 0,
    gameStart: false,
    direction: '38'
}

function makeInitialGameState() {

    makeBoard()

    gameState.snake = {
        head: [10, 5],
        body: [[10, 6], [10, 7], [10, 8]],
        nextDirection: [1, 0]
    }
    drawSnake()

    gameState.apple = [11, 8]
    drawApple()

    gameState.speed = 1000

}

function snakeCollision() {
    if (gameState.snake.head[0] == 15 || gameState.snake.head[0] == -1 || gameState.snake.head[1] == 15 || gameState.snake.head[1] == -1) {
        gameState.gameStart = false;
    }
}
function clearSnake(snakeSpeed) {
    if (!gameState.gameStart) {
        clearInterval(snakeSpeed)
    }

}

function runningGameState() {
    console.log("Running game state")
    let snakeSpeed = setInterval(moveSnake, gameState.speed)
    console.log("This is snake speed ", snakeSpeed)
    setInterval(eatingApple, 10)
    setInterval(snakeCollision, 10)
    document.onkeydown = checkKey
    setInterval(clearSnake.bind(null, snakeSpeed), 10)
}
makeInitialGameState();

start.onclick = () => {
    gameState.gameStart = true;
    runningGameState()
}

function deleteApple() {
    table.children.item(gameState.apple[0]).children.item(gameState.apple[1]).removeAttribute('id');
}

let score = 0

function eatingApple() {
    for (let i = 0; i < gameState.snake.body.length; i++) {
        if (gameState.snake.body[i][0] === gameState.apple[0] && gameState.snake.body[i][1] === gameState.apple[1]) {
            min = Math.ceil(0);
            max = Math.floor(14);
            console.log(apple);
            deleteApple();
            gameState.apple[0] = Math.floor(Math.random() * 15);
            gameState.apple[1] = Math.floor(Math.random() * 15);
            console.log(gameState.apple);
            drawApple();
            score++
            document.getElementById('current-score').innerHTML = 'Now: ' + score;
        }

    }
}

let direction = '38'
function checkKey(e) {
    e = e || window.event;
    console.log(e.keyCode)
    let movement = e.keyCode;
    if (movement == '38' && gameState.direction != '40') {
        moveSnake(e.keyCode)
    } else if (movement == '40' && gameState.direction != '38') {
        moveSnake(e.keyCode)
    } else if (movement == '37' && gameState.direction != '39') {
        moveSnake(e.keyCode)
    } else if (movement == '39' && gameState.direction != '37') {
        moveSnake(e.keyCode);
    } gameState.direction = e.keyCode;
}

function moveSnake() {

    if (gameState.direction == '38') {
        deleteSnake()
        gameState.snake.head[0] = gameState.snake.head[0] - 1
        for (let j = 0; j < gameState.snake.body.length; j++) {
            if (gameState.snake.body[j][1] == gameState.snake.head[1]) {
                gameState.snake.body[j][0] = gameState.snake.body[j][0] - 1
            } else if (gameState.snake.body[j][1] < gameState.snake.head[1]) {
                gameState.snake.body[j][1] = gameState.snake.body[j][1] + 1
            } else if (gameState.snake.body[j][1] > gameState.snake.head[1]) {
                gameState.snake.body[j][1] = gameState.snake.body[j][1] - 1
            }
        }
        drawSnake()
    }


    if (gameState.direction == '40') {
        deleteSnake()
        gameState.snake.head[0] = gameState.snake.head[0] + 1
        for (let j = 0; j < gameState.snake.body.length; j++) {
            if (gameState.snake.body[j][1] == gameState.snake.head[1]) {
                gameState.snake.body[j][0] = gameState.snake.body[j][0] + 1
            } else if (gameState.snake.body[j][1] < gameState.snake.head[1]) {
                gameState.snake.body[j][1] = gameState.snake.body[j][1] + 1
            } else if (gameState.snake.body[j][1] > gameState.snake.head[1]) {
                gameState.snake.body[j][1] = gameState.snake.body[j][1] - 1
            }
        }
        drawSnake()
    }

    if (gameState.direction == '37') {
        deleteSnake()
        gameState.snake.head[1] = gameState.snake.head[1] - 1
        for (let j = 0; j < gameState.snake.body.length; j++) {
            if (gameState.snake.body[j][0] == gameState.snake.head[0]) {
                gameState.snake.body[j][1] = gameState.snake.body[j][1] - 1
            } else if (gameState.snake.body[j][0] < gameState.snake.head[0]) {
                gameState.snake.body[j][0] = gameState.snake.body[j][0] + 1
            } else if (gameState.snake.body[j][0] > gameState.snake.head[0]) {
                gameState.snake.body[j][0] = gameState.snake.body[j][0] - 1
            }
        }
        drawSnake()
    }
    if (gameState.direction == '39') {
        deleteSnake();
        console.log(gameState.snake.head);
        gameState.snake.head[1] = gameState.snake.head[1] + 1
        for (let j = 0; j < gameState.snake.body.length; j++) {
            console.log(gameState.snake.head[0]);
            console.log(gameState.snake.body[j][0]);
            if (gameState.snake.body[j][0] == gameState.snake.head[0]) {
                gameState.snake.body[j][1] = gameState.snake.body[j][1] + 1
            } else if (gameState.snake.body[j][0] < gameState.snake.head[0]) {
                gameState.snake.body[j][0] = gameState.snake.body[j][0] + 1
            } else if (gameState.snake.body[j][0] > gameState.snake.head[0]) {
                gameState.snake.body[j][0] = gameState.snake.body[j][0] - 1
            }
        }
        drawSnake()
    } eatingApple()
}

function deleteSnake() {
    for (let i = 0; i < gameState.snake.body.length; i++) {
        table.children.item(gameState.snake.body[i][0]).children.item(gameState.snake.body[i][1]).removeAttribute('class');
    }
}

let started = true;








