import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    StyleSheet,
    TouchableOpacity
} from 'react-native'
import { StackActions } from 'react-navigation'
import { connect } from 'react-redux'
import { white, main } from '../utils/colors'

class Quiz extends Component {

    state = {
        index: 0,
        isFront: true,
        correct: 0,
        incorrect: 0
    }

    handleOnPressCorrect = () => {
        const correct = this.state.correct + 1
        const index = this.state.index + 1
        this.setState(() => ({
            index,
            correct,
            isFront: true,
        }))
    }

    handleOnPressInCorrect = () => {
        const incorrect = this.state.incorrect + 1
        const index = this.state.index + 1
        this.setState(() => ({
            index,
            incorrect,
            isFront: true,
        }))
    }

    handleOnPressShowAnswer = () => {
        this.setState(() => ({
            isFront: !this.state.isFront
        }))
    }

    handleOnRestartQuiz = () => {
        this.setState(() => ({
            index: 0,
            isFront: true,
            correct: 0,
            incorrect: 0
        }))
    }

    handleOnBackToDeck = () => {
        this.props.navigation.dispatch(StackActions.pop())
    }

    render() {
        const { isFront, index, correct, incorrect } = this.state
        const { questions } = this.props
        if (index >= questions.length) {
            return (
                < View style={styles.container} >
                    <Text style={styles.title}> Finished! </Text>

                    <Text style={[styles.title, { marginTop: 30 }]}> === Score === </Text>
                    <Text style={[styles.description, { color: 'green', marginTop: 20 }]}> Correct: {correct} </Text>
                    <Text style={[styles.description, { color: 'red', marginTop: 10 }]}> Incorrect: {incorrect} </Text>
                    <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: main, marginTop: 50 }]} onPress={this.handleOnRestartQuiz}>
                        <Text style={styles.buttonText}>Restart Quiz</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: main, marginTop: 20 }]} onPress={this.handleOnBackToDeck}>
                        <Text style={styles.buttonText}>Back to Deck</Text>
                    </TouchableOpacity>
                </View >
            )
        }

        const question = questions[index]

        return (
            <View style={styles.container}>
                <Text style={styles.title}>{isFront ? question.question : question.answer}</Text>
                <Button style={{ marginTop: 50 }} title={isFront ? 'Show Answer' : 'Show Question'} onPress={this.handleOnPressShowAnswer} />
                <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: 'green', marginTop: 50 }]} onPress={this.handleOnPressCorrect}>
                    <Text style={styles.buttonText}>Correct</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonContainer, { backgroundColor: 'red', marginTop: 20 }]} onPress={this.handleOnPressInCorrect}>
                    <Text style={styles.buttonText}>Incorrect</Text>
                </TouchableOpacity>
                <Text style={{ marginTop: 100 }}>{index + 1} / {questions.length}</Text>
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
    },
    buttonContainer: {
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
        dispatch,
        deck,
        questions: deck.questions
    }
}

export default connect(mapStateToProps)(Quiz)