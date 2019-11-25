import { RECEIVE_DECKS, ADD_DECK, REMOVE_DECK, ADD_CARD } from '../actions'

function entries(state = {}, action) {
    switch (action.type) {
        case RECEIVE_DECKS:
            return {
                ...state,
                ...action.decks
            }
        case ADD_DECK:
            const { deck } = action
            return {
                ...state,
                [deck.id]: deck,
            }
        case REMOVE_DECK:
            let newState = state
            delete newState[action.id]
            return newState
        case ADD_CARD:
            const { deckId, question, answer } = action
            const card = { question, answer }
            const questions = state[deckId].questions === undefined ? [card] : state[deckId].questions.concat([card])
            return {
                ...state,
                [deckId]: {
                    ...state[deckId],
                    questions
                }
            }
        default:
            return state
    }
}

export default entries