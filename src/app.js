import { randomChoice } from 'home-on-the-range'
import display from './display';

// FIRES GAME EVENTS AND LOGIC ON CLICK
function run_game_logic(event) {
    const user_choice = assign_user_choice(event.target.className)
    const computer_choice = randomChoice(['rock', 'paper', 'scissors'])

    const computer_wins = check_if_computer_wins(user_choice, computer_choice);
    const tie = check_if_tie(user_choice, computer_choice);

    update_score_and_display(user_choice, computer_choice, tie, computer_wins)
}

// ----------------------------------------------------------------------------------------

function assign_user_choice(button_clicked) {
    let user_choice = ''
    if (button_clicked === 'rock') user_choice = 'rock'
    if (button_clicked === 'paper') user_choice = 'paper'
    if (button_clicked === 'scissors') user_choice = 'scissors'
    return user_choice
}


function check_if_computer_wins(user_choice, computer_choice) {
    let computer_wins = false
    if(
    user_choice === 'rock' && computer_choice === 'paper'
    || user_choice === 'paper' && computer_choice === 'scissors'
    || user_choice === 'scissors' && computer_choice === 'rock'
    ) {
        computer_wins = true
    }
    return computer_wins
}


function check_if_tie(user_choice, computer_choice) {
    let tie = false
    if (user_choice === computer_choice) tie = true
    return tie
}


function update_score_and_display(user_choice, computer_choice, tie, computer_wins) {
    if (tie) {
        display.set_board_display_to_tie(user_choice, computer_choice);
    } else if (computer_wins) {
        display.update_computer_score()
        display.set_board_display_to_loss(user_choice, computer_choice);
    } else {
        display.update_user_score()
        display.set_board_display_to_win(user_choice, computer_choice);
    }
}


export { run_game_logic }