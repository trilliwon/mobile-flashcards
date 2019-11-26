import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions';
import { AsyncStorage } from 'react-native'

const NOTIFICATION_KEY = 'UdaciCards:notifications'

export function generateUID() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
}

export function formatNewDeck(title) {
    const id = generateUID()
    const entry = {
        title,
        timestamp: Date.now(),
        id,
        questions: [],
    }

    return entry
}

export function timeToString(time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
}

export function setDummyData() {
    let dummyData = {}
    const reactDeckId = generateUID()
    const javascriptDeckId = generateUID()

    const reactDummyDeck = {
        title: 'React',
        id: reactDeckId,
        questions: [
            {
                question: 'What is React?',
                answer: 'A library for managing user interfaces'
            },
            {
                question: 'Where do you make Ajax requests in React?',
                answer: 'The componentDidMount lifecycle event'
            }
        ]
    }

    const javascriptDummyDeck = {
        title: 'JavaScript',
        id: javascriptDeckId,
        questions: [
            {
                question: 'What is a closure?',
                answer: 'The combination of a function and the lexical environment within which that function was declared.'
            }
        ]
    }

    dummyData[reactDeckId] = reactDummyDeck
    dummyData[javascriptDeckId] = javascriptDummyDeck

    return dummyData
}

function createNotification() {
    return {
        title: 'Start Quiz!',
        body: "👋 Don't forget to solve quiz!",
        ios: {
            sound: true,
        },
        android: {
            sound: true,
            priority: 'high',
            sticky: false,
            vibrate: true,
        }
    }
}

export function clearLocalNotification() {
    return AsyncStorage.removeItem(NOTIFICATION_KEY)
        .then(Notifications.cancelAllScheduledNotificationsAsync)
}

export function setLocalNotification() {
    AsyncStorage.getItem(NOTIFICATION_KEY)
        .then(JSON.parse)
        .then((data) => {
            if (data === null) {
                Permissions.askAsync(Permissions.NOTIFICATIONS)
                    .then(({ status }) => {
                        if (status === 'granted') {
                            Notifications.cancelAllScheduledNotificationsAsync()

                            let today = new Date()
                            today.setDate(today.getDate())
                            today.setHours(10)
                            today.setMinutes(0)

                            Notifications.scheduleLocalNotificationAsync(
                                createNotification(),
                                {
                                    time: today,
                                    repeat: 'day',
                                }
                            )

                            AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
                        }
                    })
            }
        })
}