import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet
} from 'react-native'
import DeckDetail from './DeckDetail'
import AddCard from './AddCard'
import Quiz from './Quiz'
import { connect } from 'react-redux'
import { handleReceiveDecks } from '../actions'
import { createAppContainer, NavigationEvents } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { main } from '../utils/colors'

function Deck({ deck }) {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.description}> {deck.questions && deck.questions.length} cards </Text>
        </View>
    );
}

class Decks extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        dispatch(handleReceiveDecks())
    }

    renderItem = ({ item, index, separators }) => {
        return (
            <TouchableOpacity
                onPress={() => this.onPress(item)}>
                <Deck deck={item} />
            </TouchableOpacity>
        )
    }

    renderSeparator = () => {
        return <View style={styles.separator} />
    }

    onPress = (item) => {
        this.props.navigation.navigate('DeckDetail', {
            id: item.id,
        })
    }

    render() {
        const { decks } = this.props

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    data={decks}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
    },

    item: {
        backgroundColor: 'white',
        height: 120,
        padding: 20,
        margin: 10,
        flex: 1,
        justifyContent: 'space-between',
        borderRadius: 7,
        shadowRadius: 7,
        shadowOffset: { width: 0, height: 3 },
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOpacity: 0.8,
    },
    title: {
        fontSize: 30,
    },
    description: {
        fontSize: 17,
        color: 'gray',
    },
    separator: {
        height: 10,
    },
});


function mapStateToProps({ ...props }) {

    const decks = Object.keys(props)
        .sort((a, b) => props[b].timestamp - props[a].timestamp)
        .map((key) => props[key])

    return {
        decks
    }
}

const DecksContainer = connect(mapStateToProps)(Decks)

const RootStack = createStackNavigator({
    Decks: {
        screen: DecksContainer,
        navigationOptions: {
            title: 'Decks',
            headerStyle: {
                height: 35,
                backgroundColor: main,
                shadowColor: 'black',
                shadowRadius: 5,
                shadowOpacity: 0.1,
                shadowOffset: {
                    height: 3,
                    width: 0,
                },
            },
            headerTintColor: '#fff',
        }
    },
    DeckDetail: {
        screen: DeckDetail,
        navigationOptions: {
            title: 'Deck Detail',
            headerBackTitle: null,
            headerStyle: {
                height: 35,
                backgroundColor: main,
                shadowColor: 'black',
                shadowRadius: 5,
                shadowOpacity: 0.1,
                shadowOffset: {
                    height: 3,
                    width: 0,
                },
            },
            headerTintColor: '#fff',
        }
    },
    AddCard: {
        screen: AddCard,
        navigationOptions: {
            title: 'Add Card',
            headerBackTitle: null,
            headerStyle: {
                height: 35,
                backgroundColor: main,
                shadowColor: 'black',
                shadowRadius: 5,
                shadowOpacity: 0.1,
                shadowOffset: {
                    height: 3,
                    width: 0,
                },
            },
            headerTintColor: '#fff',
        }
    },
    Quiz: {
        screen: Quiz,
        navigationOptions: {
            title: 'Quiz',
            headerBackTitle: null,
            headerStyle: {
                height: 35,
                backgroundColor: main,
                shadowColor: 'black',
                shadowRadius: 5,
                shadowOpacity: 0.1,
                shadowOffset: {
                    height: 3,
                    width: 0,
                },
            },
            headerTintColor: '#fff',
        }
    }
})

export default createAppContainer(RootStack)