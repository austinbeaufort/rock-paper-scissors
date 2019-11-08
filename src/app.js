import h from 'home-on-the-range'
import { score, displayScore } from './score'


const addListenerAndStartGame = () => {
    document
    .querySelector('.buttons-container')
    .addEventListener('click', event => runTheGame(event))
}

const assignDisplayScoreVariables = () => {
    displayScore.user.textContent = score.user
    displayScore.computer.textContent = score.computer
}


// FIRES GAME EVENTS AND LOGIC ON CLICK
const runTheGame = event => {
    let userChoice = ''

    switch (event.target.className) {
        case 'rock':
            userChoice = 'rock'
            break
        case 'paper':
            userChoice = 'paper'
            break
        case 'scissors':
            userChoice = 'scissors'
            break
        default:
            console.log('error...not a valid option')
    }

    pickWinner(userChoice)
}


// GAME LOGIC
const pickWinner = (userChoice) => {
    const computerChoice = h.randomChoice(['rock', 'paper', 'scissors'])
    if (userChoice === computerChoice) {
        displayScore.displayContent.textContent = `(You: ${userChoice}) VS (Computer: ${computerChoice}) >>> It's a tie!!`
    }
    else if (   userChoice === 'rock' && computerChoice === 'paper'
             || userChoice === 'paper' && computerChoice === 'scissors'
             || userChoice === 'scissors' && computerChoice === 'rock') {
        score.computer++
        displayScore.computer.textContent = score.computer
        displayScore.displayContent.textContent = `(You: ${userChoice}) VS (Computer: ${computerChoice}) >>> You lose, try again!`
    }
    else {
        score.user++
        displayScore.user.textContent = score.user
        displayScore.displayContent.textContent = `(You: ${userChoice}) VS (Computer: ${computerChoice}) >>> You won! Best of 3??`
    }
}



export { addListenerAndStartGame, assignDisplayScoreVariables }