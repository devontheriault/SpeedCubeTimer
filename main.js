let timerDisplay = document.querySelector("#timer")
let result = document.querySelector("#result")
let scramble = document.querySelector("#scramble")

const scrambleGenerator = () => {
    let moveList = ["R","L","U","D","F","B"]
    let moveModifierList = ["\'","2",""]
    let scrambleLength = 25
    let generatedScramble = ""

    for(i = 0; i <= scrambleLength; i++){
        generatedScramble += moveList[Math.floor(Math.random() * moveList.length)]
        generatedScramble += moveModifierList[Math.floor(Math.random() * moveModifierList.length)]
        generatedScramble += " "
    }
    
    return generatedScramble
}

//setting the initial scramble
scramble.innerHTML = scrambleGenerator()
//setting the initial timerRunning bool
let timerRunning = false
//setting the initialStartTime
let startTime = 0

//funcion for starting and stopping the timer
document.body.onkeyup = function (e) { 
    let updateLoop = null
    //e.keyCode 32 is the spacebar
    if (e.keyCode == 32) {
        if (timerRunning == false) {
            startTimer()
            updateLoop = setInterval(updateTime, 10)
        } 
        else {   
            clearInterval(updateLoop)
            stopTimer() 
        }
    }
}


const startTimer = () => {
    let date = new Date()
    startTime = date.getTime()
    timerDisplay.innerHTML = "0"
    timerRunning = true
}

const stopTimer = () => {
    let date = new Date()
    let finishTime = date.getTime() - startTime
    timerDisplay.innerHTML = timeFormatter(finishTime)
    timerRunning = false
    scramble.innerHTML = scrambleGenerator()
}

const updateTime = () => {
if(timerRunning){
    let date = new Date()
    let currentTime = date.getTime() - startTime
    timerDisplay.innerHTML = timeFormatter(currentTime) 
}
}

const timeFormatter = (time) => {
let h = m = s = ms = 0
let newTime = '';
h = Math.floor(time / (60 * 60 * 1000))
time = time % (60 * 60 * 1000)
m = Math.floor(time / (60 * 1000))
time = time % (60 * 1000)
s = Math.floor(time / 1000)
ms = time % 1000
newTime = h + ":" + m + ":" + s + "." +  ms
return newTime;
}

//changing timer text the color on press
document.body.onkeydown = function (e) {
    if (e.keyCode == 32){
        timerDisplay.innerHTML = timerDisplay.innerHTML.fontcolor("green")
    }
}


