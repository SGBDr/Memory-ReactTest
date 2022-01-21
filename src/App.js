import './App.css';
import {Card} from "./Card/Card";
import {GuessCount} from "./GuessCount/GuessCount";
import {Component} from "react";


class App extends Component{
    tab = ["😀","🎉","💖","🎩","🐶","🐱","😀","🎉","💖","🎩","🐶","🐱"]
    VISUAL_PAUSE_MSECS = 500;
    state = {
        app : "",
        currentPair: [],
        guesses: 0,
        matchedCardIndices: [],
        cards: this.tab.map((x, index) => (
            {
                card : x,
                index : index,
                feedback : 'hidden',
            }
        )),
    }
    constructor(props) {
        super(props);
        this.setState({app : props.app})
    }

    getFeedbackForCard(index) {
        let { currentPair, matchedCardIndices } = this.state
        let indexMatched = false;
        for(let i = 0; i < matchedCardIndices.length; i++)
            if(matchedCardIndices[i] === index)
                indexMatched = true;


        if (currentPair.length < 2) {
            return indexMatched || index === currentPair[0] ? 'visible' : 'hidden'
        }

        if (currentPair[0] === index || currentPair[1] === index) {
            return indexMatched ? 'justMatched' : 'justMismatched'
        }

        return indexMatched ? 'visible' : 'hidden';
    }

    touch = (index) => {
        let {currentPair, cards} = this.state;
        console.log(this.state)
        if(currentPair.length == 0){
            this.setState({currentPair : [index]});
            return
        }

        if(currentPair.length == 2)
            return

        this.verifyPair(index)
    }

    verifyPair(index) {
        const { cards, currentPair, matchedCardIndices, guesses } = this.state

        const newPair = [currentPair[0], index]
        const matched = cards[newPair[0]].card === cards[newPair[1]].card && newPair[0] != newPair[1]
        const newGuesses = guesses + 2;
        console.log(cards[newPair[0]].card, cards[newPair[1]].card)
        this.setState({ currentPair: newPair })
        if (matched) {
            this.setState({ matchedCardIndices: [...matchedCardIndices, ...newPair], guesses: newGuesses })
        }
        setTimeout(() => this.setState({ currentPair: [] }), this.VISUAL_PAUSE_MSECS)
    }

    render() {
        const {cards, matchedCardIndices} = this.state
        return (
            <div className="memory">
                <GuessCount guesses={this.state.guesses} />
                {
                    cards.map(card =>
                        <Card
                            card={card.card}
                            index={card.index}
                            feedback={this.getFeedbackForCard(card.index)}
                            onclick={() => this.touch(card.index)}
                            key={card.index}
                        />
                    )
                }
                <h1>
                    <p>{this.state.app} Best Game</p>
                </h1>
            </div>
        )
    }
}

export default App;
