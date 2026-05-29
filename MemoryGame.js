
// Game State Variables

let firstPick = null;
let secondPick = null;
let count = 0;
let score = 0;
let minutes = 0;
let seconds = 0;
let intervalId = 0;
let isBoardLocked = true;

// DOM elements

const startBtn = document.querySelector('.start button')
const timer = document.querySelector('.timer span')
const countSpan = document.querySelector('.count span')
const scoreSpan = document.querySelector('.score span')
const box = document.querySelector('.box')
const showMessageBox = document.querySelector('.showMessageBox')
const startSound = new Audio("mixkit-ominous-drums-227 (1).wav")
const finishSound = new Audio("mixkit-game-level-completed-2059.wav")
const winSound = new Audio("mixkit-correct-positive-notification-957.wav")
const loseSound = new Audio("floraphonic-classic-game-action-negative-18-224576.mp3")
const images = [
    "https://i.pinimg.com/originals/8a/64/ff/8a64ffe27232d40c19bd7a094a0d7a38.jpg?nii=t",
    "https://i.pinimg.com/originals/64/6c/d2/646cd2f063f80183d105b460b1bbf293.png?nii=t",
    "https://i.pinimg.com/474x/da/29/8d/da298dabba4d171c25f9b6b9e2bf0f85.jpg?nii=t",
    "https://static-cdn.jtvnw.net/jtv_user_pictures/7293ca06-bbc9-4cc1-847b-9b3031797124-profile_image-300x300.png",
    "https://i.kym-cdn.com/entries/icons/original/000/047/549/kurt_angle_meme.jpg",
    "https://preview.redd.it/t2rct9vkp8r61.jpg?auto=webp&s=fab567c0dae642b47f37c61de90b9be40de2e1d8"
]
const totalImages = [...images, ...images]

console.log("before shuffle")
console.log(totalImages)
shuffleImage(totalImages)
console.log("after shuffle")
console.log(totalImages)

function shuffleImage(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]]
    }
}


function showGamebox() {
    showMessageBox.style.display = "none"

    totalImages.forEach((arrz_src) => {
        const card = document.createElement("div")
        card.classList.add("card")

        const front = document.createElement("div")
        front.classList.add('front')
        const back = document.createElement("div")
        back.classList.add("back")

        const image = document.createElement("img")
        image.src = arrz_src;
        back.appendChild(image)
        card.appendChild(front)
        card.appendChild(back)
        box.appendChild(card)


        card.addEventListener("click", startGame, previewCard)

    })


}

function startGame() {
    if (isBoardLocked || this.classList.contains("active")) return;
    this.classList.toggle("active")
    if (!firstPick) {
        firstPick = this;
        return;
    }

    secondPick = this;
    count++;
    countSpan.textContent = count;

    console.log(" firstpick", firstPick)
    console.log("sec pick", secondPick)
    if (firstPick.querySelector(".back img").src === secondPick.querySelector(".back img").src) {

        score++;
        scoreSpan.textContent = score;
        winSound.play();
        if (score === 1) {

            let message = "";
            const time = `${minutes} : ${seconds < 10 ? "0" + seconds : seconds}`;
            if (count < 7) {
                message = `Bro is him ! bet you can’t do better, can you? Only ${count} tries and your time was ${time}!`;

            } else if (count < 10) {
                message = `Not bad, homie! You remembered most of them! Tries:${count}, Time:${time}`;

            } else {
                message = `nah bruhh, try again, this aint great. hah JK Tries:${count}, Time:${time}.`;
            }
            clearInterval(intervalId)
            intervalId = null;
            showMessageBox.style.display = "block";
            setTimeout(() => {
                const showMessage = document.createElement("div")

                showMessage.textContent = message
                showMessage.style.color = "#fff2f2"
                showMessage.style.padding = "5px"
                showMessage.style.marginTop = "15px"

                showMessageBox.appendChild(showMessage)
                box.style.display = "none";
                const restartBtn = document.createElement("button")

                restartBtn.textContent = "Restart";
                restartBtn.style.backgroundColor = "#ffac07"
                restartBtn.style.border = "none"
                restartBtn.style.padding = "5px 20px 5px 20px"
                restartBtn.style.color = "azure";

                restartBtn.style.fontFamily = "monospace"
                showMessageBox.appendChild(restartBtn);
                restartBtn.addEventListener("click", reStart)

            }, 200)
            finishSound.play();
        }
        firstPick = null;
        secondPick = null;

    } else {
        isBoardLocked = true;
        loseSound.play();
        setTimeout(() => {
            firstPick.classList.remove("active")
            secondPick.classList.remove("active")
            firstPick = null;
            secondPick = null;
            isBoardLocked = false;
        }, 1000)
    }

}

function reStart() {



    seconds = 0;
    minutes = 0;
    count = 0;
    score = 0;
    firstPick = null;
    secondPick = null;
    clearInterval(intervalId);
    intervalId = null;
    isBoardLocked = true;
    timer.textContent = "00:00"
    countSpan.textContent = "0"
    scoreSpan.textContent = "0"
    showMessageBox.innerHTML = "";
    startBtn.textContent = "Start"



    box.style.display = "grid";
    box.innerHTML = " ";
    shuffleImage(totalImages)
    showGamebox()
    previewCard();



}


function startTimer() {
    if (!intervalId) {
        intervalId = setInterval(() => {
            seconds++;
            if (seconds === 60) {
                minutes++;
                seconds = 0;
            }
            timer.textContent = `${minutes < 10 ? "0" + minutes : minutes} : ${seconds < 10 ? "0" + seconds : seconds}  `;

        }, 1000);
    } else {
        clearInterval(intervalId)
        intervalId = null;
    }
}


function previewCard() {
    const cards = document.querySelectorAll(".card");

    cards.forEach((card) => card.classList.add("active"))
    setTimeout(() => {
        cards.forEach((card) => card.classList.remove("active"))
    }, 1000);

}

startBtn.style.color = "white";
startBtn.style.backgroundColor = "#029642"
startBtn.style.border = "none";
startBtn.style.padding = "5px 20px 5px 20px"
startBtn.style.fontFamily = "monospace"
startBtn.style.fontSize = "20px"


startBtn.addEventListener("click", () => {

    if (startBtn.textContent === "Start") {
        startBtn.textContent = "Stop";
        startBtn.style.color = "white";
        startBtn.style.backgroundColor = "#b22222"
        startBtn.style.border = "none";
        startBtn.style.padding = "5px 20px 5px 20px"
        startBtn.style.fontFamily = "monospace"
        startBtn.style.fontSize = "20px"
        startSound.play();
    }

    isBoardLocked = false;
    startTimer();


})


// cards.forEach((card)=>{
//     card.addEventListener("click", ()=>{
//         card.classList.add("active")
//     })
// })



showGamebox();
previewCard();

