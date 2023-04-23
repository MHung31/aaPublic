/*
Resize your terminal so you can just see track.

Made by Matthew Hung
App Academy
April 2023

*/

const readline = require("readline");
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

//global
let player = ""
let playerLane = 2;
let runner;
let score = 0;
console.log("Welcome to Racer!")
//Designyourcar
let askCar = () => {

    rl.question("Design your car using 3 characters [ex '8x8']: ", (answer) => {

        if (answer.length !== 3) {
            console.log("Use only 3 characters!");
            askCar();
        } else {
            player = answer;
            console.log("------------------------------------------------")
            console.log("Enter 'a' to move left. Enter 'd' to move right.")
            console.log("Get ready to start! Try to make it to the finish!")
            console.log("Watch out for obstacles --> @  @  @")
            console.log("------------------------------------------------")
            setTimeout(raceTrack, 5000);
        }
    })

}

//Main
let raceTrack = () => {
    let count = 1;
    let obsCount = 4;
    let track = [
        ["|     |     |     |"],
        ["|                 |"],
        ["|                 |"],
        ["|     |     |     |"],
        ["|                 |"],
        ["|                 |"],
        ["|     |     |     |"],
        ["|                 |"],
        ["|                 |"],
        ["|     |     |     |"],

    ];
    //setUp
    track[0] = [track[0][0].slice(0, 8) + player + track[0][0].slice(11)]
    askToMove();

    //Obstacles
    let obstacles1 = () => {
        let choose = Math.floor(Math.random() * 3);
        let obs = [["|  @              |"], ["|        @        |"], ["|              @  |"]];
        return obs[choose];
    }
    let obstacles2 = () => {
        let choose = Math.floor(Math.random() * 3);
        let obs = [["|  @  |     |     |"], ["|     |  @  |     |"], ["|     |     |  @  |"]];
        return obs[choose];
    }



    //StartRace
    runner = setInterval(() => {

        if (track[1][0][3] === "@" && playerLane === 1 || track[1][0][9] === "@" && playerLane === 2 || track[1][0][15] === "@" && playerLane === 3) {
            youCrashed();
        } else {
            track.shift();
            if (count < 3) {
                if (obsCount === 0) {
                    track.push(obstacles1())
                    obsCount = 4;
                } else {
                    track.push(["|                 |"])
                    obsCount--;
                }
                count++;
            } else {
                if (obsCount === 0) {
                    track.push(obstacles2())
                    obsCount = 4;
                } else {
                    track.push(["|     |     |     |"]);
                    obsCount--;
                }
                count = 1;
            }

            //playerPosition
            if (playerLane === 3) {
                track[0] = [track[0][0].slice(0, 14) + player + track[0][0].slice(17)]
            } else if (playerLane === 2) {
                track[0] = [track[0][0].slice(0, 8) + player + track[0][0].slice(11)]
            } else if (playerLane === 1) {
                track[0] = [track[0][0].slice(0, 2) + player + track[0][0].slice(5)]
            }
            score++;
            console.log(track);

            //finish
            if (score > 300) {
                clearInterval(runner);
                rl.close();
                track = [
                    ["|     |     |     |"],
                    ["|                 |"],
                    ["|                 |"],
                    ["|     |     |     |"],
                    ["|                 |"],
                    ["|                 |"],
                    ["|     |     |     |"],
                    ["|                 |"],
                    ["|                 |"],
                    ["|     |     |     |"],

                ];
                track[0] = [track[0][0].slice(0, 8) + player + track[0][0].slice(11)]
                console.log(track)
                let i = 0;
                let finish = setInterval(() => {
                    if (i > track.length - 3) {
                        clearInterval(finish);
                        track[4] = [track[i][0].slice(0, 8) + "YOU" + track[i][0].slice(11)]
                        track[5] = [track[i][0].slice(0, 6) + "FINISHED!" + track[i][0].slice(15)]
                    }
                    track[i + 1] = [track[i + 1][0].slice(0, 8) + player + track[i + 1][0].slice(11)]
                    track[i] = [track[i][0].slice(0, 8) + "   " + track[i][0].slice(11)]
                    console.log(track)
                    i++;
                }, 100)
            }

            //raceSpeed
            if (runner._repeat > 250) {
                runner._repeat -= 10
            } else if (runner._repeat > 150) {
                runner._repeat -= 5;
            } else if (runner._repeat > 100) {
                runner._repeat -= 1;
            }
        }


    }, 350)


}

let youCrashed = () => {
    clearInterval(runner);
    console.log("You Crashed!")
    console.log("Score: " + score + "!")
    rl.close();
}

let askToMove = () => {
    rl.question("", (move) => {
        if (move === "a") {
            if (playerLane === 3) {
                playerLane = 2;
                askToMove();
            } else if (playerLane === 2) {
                playerLane = 1
                askToMove();
            } else if (playerLane === 1) {
                youCrashed();
            }
        } else if (move === "d") {
            if (playerLane === 3) {
                youCrashed();
            } else if (playerLane === 2) {
                playerLane = 3
                askToMove();
            } else if (playerLane === 1) {
                playerLane = 2;
                askToMove();
            }
        }
    })
}

askCar();
