import './Card.css'

const HIDDEN_SYMBOL = '❓'
export const Card = ({card, feedback, index, onclick}) => (
    <div className={`card ${feedback}`} index={index} onClick={onclick}>
        <span className="symbol">
            {feedback === 'hidden' ? HIDDEN_SYMBOL : card}
        </span>
    </div>
)