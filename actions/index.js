import {
    getEntries,
    addEntry,
    removeEntry,
    getEntry,
    changeEntry,
} from '../utils/api'

export const RECEIVE_DECKS = 'RECEIVE_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const RECEIVE_DECK = 'RECEIVE_DECK'
export const REMOVE_DECK = 'REMOVE_DECK'
export const ADD_CARD = 'ADD_CARD'

function receiveDecks(decks) {
    return {
        type: RECEIVE_DECKS,
        decks,
    }
}

export function handleReceiveDecks() {
    return (dispatch) => {
        return getEntries()
            .then((decks) => {
                dispatch(receiveDecks(decks))
            })
    }
}

function addDeck(deck) {
    return {
        type: ADD_DECK,
        deck,
    }
}

export function handleAddDeck(deck) {
    return (dispatch) => {
        return addEntry(deck)
            .then(() => {
                dispatch(addDeck(deck))
            })
    }
}

function removeDeck(id) {
    return {
        type: REMOVE_DECK,
        id
    }
}

export function handleRemoveDeck(id) {
    return (dispatch) => {
        return removeEntry(id)
            .then(() => dispatch(removeDeck(id)))
    }
}

function receiveDeck(deck) {
    return {
        type: RECEIVE_DECK,
        deck
    }
}

export function handleReceiveDeck(id) {
    return (dispatch) => {
        return getEntries(id)
            .then((deck) => {
                dispatch(receiveDeck(deck))
            })
    }
}

function addCard(deckId, question, answer) {
    return {
        type: ADD_CARD,
        deckId,
        question,
        answer,
    }
}

export function handleAddCard(deck, question, answer) {
    const card = { question, answer }
    const questions = deck.questions === undefined ? [card] : deck.questions.concat([card])
    const newEntry = {
        ...deck,
        questions,
    }
    return (dispatch) => {
        return changeEntry(newEntry)
            .then(() => {
                return dispatch(addCard(deck.id, question, answer))
            })
    }
}