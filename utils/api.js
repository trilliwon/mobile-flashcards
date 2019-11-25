import { AsyncStorage } from 'react-native'
import { setDummyData } from './helpers'

const DECKS_STORAGE_KEY = 'UdaciCards:decks'

export function getEntries() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((result) => JSON.parse(result))
}

export function getEntry(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((result) => JSON.parse(result)[id])
}

export function addEntry(entry) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [entry.id]: entry,
  }))
}

export function changeEntry(newEntry) {
  return removeEntry(newEntry.id)
    .then(() => {
      return addEntry(newEntry)
    })
}

export function removeEntry(id) {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[id] = undefined
      delete data[id]
      AsyncStorage.setItem(DECKS_STORAGE_KEY, JSON.stringify(data))
    })
}

/**
decks : {
  'asdjjvkashdfhenaksff2': {
    title: 'React',
    id: 'asdjjvkashdfhenaksff2',
    timestamp: 123714516419723
    questions: [
      {
        question: '',
        answer: ''
      }
    ]
  }
}
*/