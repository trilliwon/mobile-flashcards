import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
} from 'react-native'
import { connect } from 'react-redux'
import { handleAddDeck } from '../actions'
import { main, white } from '../utils/colors'
import { formatNewDeck } from '../utils/helpers'

class AddDeck extends Component {

    state = {
        input: '',
    }

    onChangeText = (text) => {
        this.setState(() => ({
            input: text
        }))
    }

    onPressSubmit = () => {
        const { dispatch } = this.props
        const { input } = this.state
        const newDeck = formatNewDeck(input)
        dispatch(handleAddDeck(newDeck))
        this.setState(() => ({
            input: '',
        }))
        this.toHome(newDeck)
    }

    toHome = (deck) => {
        this.props.navigation.navigate('Decks', { deck })
    }

    render() {
        const { input } = this.state
        const submitDisabled = input === ''
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding" enabled>
                <Text style={styles.title}> What is the title of your new deck? </Text>
                <TextInput
                    style={styles.input}
                    placeholder='Enter New Deck Title'
                    onChangeText={this.onChangeText}
                    value={input}>
                </TextInput>

                <TouchableOpacity
                    style={[styles.submitContainer, { backgroundColor: submitDisabled ? 'lightgray' : main }]}
                    disabled={submitDisabled}
                    onPress={this.onPressSubmit} >
                    <Text style={[styles.submitText, { color: submitDisabled ? 'darkgray' : white }]}>Submit</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView >
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
        fontSize: 35,
        textAlign: 'center',
    },

    input: {
        height: 70,
        fontSize: 25,
        backgroundColor: 'white',
        marginTop: 50,
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

function mapStateToProps({ dispatch }) {
    return {
        dispatch
    }
}

export default connect(mapStateToProps)(AddDeck)