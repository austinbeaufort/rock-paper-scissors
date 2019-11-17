import { score, display_content } from './model'

class Display {
    assign_display_score_variables() {
        display_content.user.textContent = score.user
        display_content.computer.textContent = score.computer
    }

    update_computer_score() {
        score.computer++
        display_content.computer.textContent = score.computer
    }

    update_user_score() {
        score.user++
        display_content.user.textContent = score.user
    }

    set_board_display_to_tie(user_choice, computer_choice) {
        display_content.board_display.textContent = `(You: ${user_choice}) VS (Computer: ${computer_choice}) >>> It's a tie!!`
    }
    
    set_board_display_to_loss(user_choice, computer_choice) {
        display_content.board_display.textContent = `(You: ${user_choice}) VS (Computer: ${computer_choice}) >>> You lose, try again!`
    }
    
    set_board_display_to_win(user_choice, computer_choice) {
        display_content.board_display.textContent = `(You: ${user_choice}) VS (Computer: ${computer_choice}) >>> You won! Best of 3??`
    }
}

const display = new Display()

export default display