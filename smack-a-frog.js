/*
Resize your screen so you can just see game board

*/

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});



//global
let score = 0;

let row1 = ['⬜', '⬜', '⬜']
let row2 = ['⬜', '⬜', '⬜']
let row3 = ['⬜', '⬜', '⬜']
let board = [row1, row2, row3];
let speed = 1500;
let timer = 40000;
let gameOver = false;

let displayGameBoard = () => {
    console.log("   'SMACK-A-FROG'");
    console.log(row1)
    console.log("")
    console.log(row2)
    console.log("")
    console.log(row3)
    console.log("Score: ", score);
}

let userPlays = () => {
    let row;
    let col;
    let allowedKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9']
    rl.question("", (keyPress) => {
        if (allowedKeys.includes(String(keyPress))) {
            if (keyPress === '1') {
                row = 2;
                col = 0;
            } else if (keyPress === '2') {
                row = 2;
                col = 1;
            } else if (keyPress === '3') {
                row = 2;
                col = 2;
            } else if (keyPress === '4') {
                row = 1;
                col = 0;
            } else if (keyPress === '5') {
                row = 1;
                col = 1;
            } else if (keyPress === '6') {
                row = 1;
                col = 2;
            } else if (keyPress === '7') {
                row = 0;
                col = 0;
            } else if (keyPress === '8') {
                row = 0;
                col = 1;
            } else if (keyPress === '9') {
                row = 0;
                col = 2;
            }

            if (board[row][col] === '🐸') {
                board[row][col] = '👊';
                displayGameBoard()
                setTimeout(() => {
                    board[row][col] = '💥';
                    displayGameBoard()
                }, 300)
                setTimeout(() => {
                    board[row][col] = '⬜'
                    displayGameBoard()
                }, 1000)
                score += 100;

            } else {
                board[row][col] = '👊';
                setTimeout(() => {
                    board[row][col] = '⬜'
                    displayGameBoard()
                }, 1000)
            }
        }

        displayGameBoard();
        userPlays();

    })
}

let frogAppear = () => {
    setTimeout(() => {
        gameOver = true;
    }, timer)

    if (!gameOver) {
        displayGameBoard();
        userPlays();
        let num1 = Math.floor(Math.random() * 3)
        let num2 = Math.floor(Math.random() * 3)
        if (board[num1][num2] === '⬜') {
            board[num1][num2] = '🐸'
            displayGameBoard();
            setTimeout(() => {
                if (board[num1][num2] === '🐸') {
                    board[num1][num2] = '⬜'
                    displayGameBoard();
                } else {
                    if (speed > 700) speed -= 100;
                }
                frogAppear();
            }, speed)
        } else frogAppear();
    } else {
        row1 = ['🐸', '🐸', '🐸']
        row2 = ["👊GAME👊OVER👊"]
        row3 = ['🐸', '🐸', '🐸']
        displayGameBoard();
        rl.close();

    }
}

let welcomeScreen = () => {

    console.log("   'SMACK-A-FROG'");
    console.log(row1)
    console.log("     GET READY!")
    console.log(row2)
    console.log("")
    console.log(row3)
    console.log("Score: ", score);

    setTimeout(frogAppear, 5000);
}

welcomeScreen();
