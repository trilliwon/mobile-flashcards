import React, { Component } from 'react'
import { KeyboardAvoidingView, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import { main, white } from '../utils/colors'
import { connect } from 'react-redux'
import { handleAddCard } from '../actions'
import { NavigationActions } from 'react-navigation'

class AddCard extends Component {

    state = {
        question: '',
        answer: '',
    }

    onChangeQuestionText = (text) => {
        this.setState(() => ({
            question: text,
        }))
    }

    onChangeAnswerText = (text) => {
        this.setState(() => ({
            answer: text,
        }))
    }

    onPressSubmit = () => {
        const { dispatch, deck } = this.props
        const { question, answer } = this.state
        dispatch(handleAddCard(deck, question, answer))
        this.toDeckDetail()
    }

    toDeckDetail = () => {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    render() {
        const { question, answer } = this.state
        const submitDisabled = question === '' || answer === ''

        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Question'
                    onChangeText={this.onChangeQuestionText}
                    value={question}>
                </TextInput>
                <TextInput
                    style={styles.input}
                    placeholder='Enter Answer'
                    onChangeText={this.onChangeAnswerText}
                    value={answer}>
                </TextInput>
                <TouchableOpacity
                    style={[styles.submitContainer, { backgroundColor: submitDisabled ? 'lightgray' : main }]}
                    disabled={submitDisabled}
                    onPress={this.onPressSubmit} >
                    <Text style={[styles.submitText, { color: submitDisabled ? 'darkgray' : white }]}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        height: 70,
        fontSize: 25,
        backgroundColor: 'white',
        marginTop: 20,
        padding: 20,
        width: '80%',
        borderRadius: 7,
        shadowRadius: 7,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOpacity: 0.8,
    },
    submitContainer: {
        marginTop: 20,
        height: 50,
        width: 120,
        justifyContent: 'center',
        borderRadius: 7,
        shadowRadius: 7,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOpacity: 0.8,
    },
    submitText: {
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
        deck
    }
}

export default connect(mapStateToProps)(AddCard)