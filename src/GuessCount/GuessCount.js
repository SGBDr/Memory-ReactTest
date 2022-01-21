import './GuessCount.css'
import {PropTypes} from 'prop-types'

export const GuessCount = ({ guesses }) => (
    <div className="guesses">
        {guesses}
    </div>
)

GuessCount.propTypes = {
    guesses : PropTypes.number
}