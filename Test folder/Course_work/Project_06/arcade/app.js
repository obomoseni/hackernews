const board = document.querySelector('#board');
const table = document.createElement('table');
function makeBoard () {

    for(let x = 0; x < 15; x++) {
        const row = document.createElement('tr');
        for(let y = 0; y < 15; y++) {
            const column = document.createElement('td');
            row.appendChild(column);
        }
        table.appendChild(row);
    }
    board.appendChild(table);
}
makeBoard()

// Define snake
let snake = { 
    head: [10, 5],
    body: [ [10, 6], [10, 7], [10, 8] ],
    nextDirection: [1, 0]
} 
let apple = [11, 8]

  let gameState = {
    apple: apple,
    snake: snake,
  }

function drawSnake() {
    table.children.item(snake.head[0]).children.item(snake.head[1]).setAttribute('class', 'snake'); 
    for(let i = 0; i<snake.body.length; i++){
        table.children.item(snake.body[i][0]).children.item(snake.body[i][1]).setAttribute('class', 'snake');
    } 
} drawSnake()

function drawApple() {
    table.children.item(apple[0]).children.item(apple[1]).setAttribute('id', 'apple');
}
drawApple()

function deleteApple() {
    table.children.item(apple[0]).children.item(apple[1]).removeAttribute('id');
} 

let score = 0

function eatingApple() {
    for(let i = 0; i < snake.body.length; i++) {
        if(snake.body[i][0] == apple[0] && snake.body[i][1] == apple[1]){
            min = Math.ceil(0);
            max = Math.floor(14);
            console.log(apple);
            deleteApple();
            apple[0] = Math.floor(Math.random() * 15);
            apple[1] = Math.floor(Math.random() * 15);
            console.log(apple);
            drawApple();
            score++ 
            document.getElementById('current-score').innerHTML ='Now: '+ score;
        } 

    }
}

let previousMovement = '38'
document.onkeydown = checkKey
function checkKey(e) {
    e = e || window.event;
    console.log(e.keyCode)
    movement = e.keyCode;
    if(movement == '38' && previousMovement != '40') {
        moveSnake(e.keyCode)
    } else if(movement == '40' && previousMovement != '38') {
        moveSnake(e.keyCode)
    } else if(movement== '37'&& previousMovement != '39') {
        moveSnake(e.keyCode)
    } else if(movement == '39' && previousMovement != '37') {
        moveSnake(e.keyCode);
    } previousMovement = e.keyCode;
}

function moveSnake(direction) {

    if(direction == '38') {
        deleteSnake()
            snake.head[0] = snake.head[0]-1
                for(let j = 0; j < snake.body.length; j++) {
                    if(snake.body[j][1] == snake.head[1]) {
                    snake.body[j][0] = snake.body[j][0]-1
                    } else if(snake.body[j][1] < snake.head[1]) {
                    snake.body[j][1] = snake.body[j][1]+1
                    } else if(snake.body[j][1] > snake.head[1]) {
                    snake.body[j][1] = snake.body[j][1]-1
                    }
                }
                drawSnake()        
    } 


    if(direction == '40') {
        deleteSnake()
        snake.head[0] = snake.head[0]+1
        for(let j = 0; j < snake.body.length; j++) {
            if(snake.body[j][1] == snake.head[1]) {
            snake.body[j][0] = snake.body[j][0]+1
            } else if(snake.body[j][1] < snake.head[1]) {
            snake.body[j][1] = snake.body[j][1]+1
            } else if(snake.body[j][1] > snake.head[1]) {
                snake.body[j][1] = snake.body[j][1]-1
            }
        }  
        drawSnake()
    } 

    if(direction == '37') {
        deleteSnake()
        snake.head[1] = snake.head[1]-1
        for(let j = 0; j < snake.body.length; j++) {
            if(snake.body[j][0] == snake.head[0]) {
            snake.body[j][1] = snake.body[j][1]-1
            } else if(snake.body[j][0] < snake.head[0]) {
            snake.body[j][0] = snake.body[j][0]+1
            } else if(snake.body[j][0] > snake.head[0]) {
                snake.body[j][0] = snake.body[j][0]-1
            }
        }  
        drawSnake() 
    } 
    if(direction == '39') {
        deleteSnake();
        console.log(snake.head);
        snake.head[1] = snake.head[1]+1
        for(let j = 0; j < snake.body.length; j++) {
            console.log(snake.head[0]);
            console.log(snake.body[j][0]);
            if(snake.body[j][0] == snake.head[0]) {
            snake.body[j][1] = snake.body[j][1]+1
            } else if(snake.body[j][0] < snake.head[0]) {
            snake.body[j][0] = snake.body[j][0]+1
            } else if(snake.body[j][0] > snake.head[0]) {
                snake.body[j][0] = snake.body[j][0]-1
            }
        }  
        drawSnake() 
    } eatingApple() 
    endGame()
} 

function deleteSnake() {
    for(let i = 0; i<snake.body.length; i++){
        table.children.item(snake.body[i][0]).children.item(snake.body[i][1]).removeAttribute('class');
    } 
}

let started = true;

function endGame(){
    if(snake.head[0] == snake.body[snake.body.length-1][0] && snake.head[1] == snake.body[snake.body.length-1][1]) {
        clearInterval(snakeInterval);
        document.getElementById('best-score').innerHTML ='Best: '+ score;
        alert('Game over');
    } else if(snake.head[0] == -1 || snake.head[1] == -1) {
        clearInterval(snakeInterval);
        document.getElementById('best-score').innerHTML ='Best: '+ score;
        alert('Game over');
    } else if(snake.head[0] == 15 || snake.head[1] == 15) {
        clearInterval(snakeInterval);
        document.getElementById('best-score').innerHTML ='Best: '+ score;
        alert('Game over');
    }
}

let snakeInterval = setInterval(moveSnake,100);






