import React, { Component } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { white, main } from '../utils/colors'

class DeckDetail extends Component {

    handleOnPressAddCard = () => {
        const { deck } = this.props
        this.props.navigation.navigate('AddCard', {
            id: deck.id,
        })
    }

    handleOnPressStartQuiz = () => {
        const { deck } = this.props
        this.props.navigation.navigate('Quiz', {
            id: deck.id,
        })
    }

    render() {
        const { deck } = this.props
        const quizDisabled = deck.questions.length === 0

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{deck.title} </Text>
                <Text style={styles.description}>{deck.questions && deck.questions.length} of cards </Text>

                <TouchableOpacity
                    style={[styles.buttonContainer, { backgroundColor: main }]}
                    onPress={this.handleOnPressAddCard}>
                    <Text style={styles.buttonText}>Add Card</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.buttonContainer, { backgroundColor: quizDisabled ? 'lightgray' : main }]}
                    onPress={this.handleOnPressStartQuiz}
                    disabled={quizDisabled}>
                    <Text style={styles.buttonText}>Start Quiz</Text>
                </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 30,
    },
    description: {
        fontSize: 17,
        color: 'gray',
        marginBottom: 100,
    },
    buttonContainer: {
        marginTop: 20,
        height: 50,
        width: 200,
        justifyContent: 'center',
        borderRadius: 7,
        shadowRadius: 7,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOpacity: 0.8,
    },
    buttonText: {
        color: white,
        fontSize: 20,
        textAlign: 'center'
    }
})

function mapStateToProps({ dispatch, ...props }, { navigation }) {
    const id = navigation.getParam('id')
    const deck = props[id]
    return {
        deck,
        dispatch
    }
}

export default connect(mapStateToProps)(DeckDetail)