import { run_game_logic } from './src/app'
import  display  from './src/display';
const main = () => {
    add_listener_and_start_game()
    display.assign_initial_display_score_variables()
}

main()

// ------------------------------------------------------------------------
function add_listener_and_start_game() {
    document
    .querySelector('.buttons-container')
    .addEventListener('click', event => run_game_logic(event))
}


