let timerDisplay = document.querySelector("#timer")
let result = document.querySelector("#result")
let totalTime = 0;
let scramble = document.querySelector("#scramble")
let moveList3x3 = ["R","L","U","D","F","B"]
let moveModifierList3x3 = ["\'","2",""]
let solves = []

const createNewScramble = () => {
    scramble.innerHTML = scrambleGenerator(moveList3x3, moveModifierList3x3)
}

$(document).ready(function (){
    $('#plusTwo').on('click', function(){
        totalTimePlusTwo()
    })
})

$(document).ready(function (){
    $('#newScramble').on('click', function(){
        createNewScramble()
    })
})

$(document).ready(function (){
    $('#dnf').on('click', function(){
        timerDisplay.innerHTML = "DNF"
        solves.push("DNF")
        updateSolveList(solves)
    })
})

const scrambleGenerator = (moveList, moveModifierList) => {
    let scrambleLength = 25
    let generatedScramble = ""
    let lastUsedMove = ""

    for(i = 0; i <= scrambleLength; i++){
        if(i != 0){
            moveList.splice(moveList.indexOf(lastUsedMove),1)
        }
        generatedScramble += moveList[Math.floor(Math.random() * moveList.length)]
        if(i != 0){
        moveList.push(lastUsedMove)
        }
        lastUsedMove = generatedScramble.charAt(generatedScramble.length - 1)
        generatedScramble += moveModifierList[Math.floor(Math.random() * moveModifierList.length)]
        generatedScramble += " "
    }
    
    return generatedScramble
}

//setting the initial scramble
createNewScramble(moveList3x3, moveModifierList3x3)
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
    saveTimes(timerDisplay.innerHTML)
    scramble.innerHTML = scrambleGenerator(moveList3x3,moveModifierList3x3) 
}

const updateTime = () => {
    if(timerRunning){
        let date = new Date()
        let currentTime = date.getTime() - startTime
        timerDisplay.innerHTML = timeFormatter(currentTime) 
    }
}

const timeFormatter = (time) => {
    totalTime = time
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

const totalTimePlusTwo = () => {
    let solveList = document.querySelector("#solveList")
    if(checkDNF()){  
        totalTime += 2000
        timerDisplay.innerHTML = timeFormatter(totalTime)
        solves[solves.length - 1] = timeFormatter(totalTime)
        updateSolveList(solves)
    }
}

const saveTimes = (time) => {
    solves.push(time)
    updateSolveList(solves)
}

const updateSolveList = (times) => {
    let ul = document.querySelector("#solveList")
    
    ul.innerHTML = " "
    for(i=0; i<times.length;i++){  
        addItemtoSolvesList(ul,times)
    }
}

const addItemtoSolvesList = (ul,times) => {
    let li = document.createElement('li')
    li.innerHTML = times[i]
    ul.appendChild(li)
}

const checkDNF = () => {
    if(solves[solves.length - 1] === "DNF"){
        return false
    }else{
        return true
    }
}
