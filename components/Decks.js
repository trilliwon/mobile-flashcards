import React, { Component } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    SafeAreaView,
    StyleSheet
} from 'react-native'
import Constants from 'expo-constants';
import { connect } from 'react-redux'
import { getDesks } from '../utils/api'
import { receiveEntries } from '../actions'

function Deck({ deck }) {

    return (
        <View style={styles.item}>
            <Text style={styles.title}>{deck.title}</Text>
            <Text style={styles.description}> {deck.questions.length} cards </Text>
        </View>
    );
}

class Decks extends Component {

    componentDidMount() {
        const { dispatch } = this.props
        getDesks()
            .then((entries) => dispatch(receiveEntries(entries)))
            .catch(() => {
                // Alert or chagne            
            })
    }

    renderItem = ({ item, index, separators }) => {
        return (
            <TouchableOpacity
                onPress={() => this.onPress(item)}
                onShowUnderlay={separators.highlight}
                onHideUnderlay={separators.unhighlight}>
                <Deck deck={item} />
            </TouchableOpacity>
        )
    }

    renderSeparator = () => {
        return <View style={styles.separator} />
    }

    onPress = (item) => {
        console.log(item.title)
    }

    render() {
        const { decks } = this.props

        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    ItemSeparatorComponent={this.renderSeparator}
                    data={decks}
                    renderItem={this.renderItem}
                    keyExtractor={item => item.title}
                />
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecf0f1',
        marginTop: Constants.statusBarHeight,
    },
    item: {
        backgroundColor: 'white',
        height: 120,
        padding: 20,
        margin: 20,
        flex: 1,
        justifyContent: 'space-between'
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


function mapStateToProps(entries) {
    const decks = Object.keys(entries).map((key) => entries[key])
    return {
        decks
    }
}

export default connect(mapStateToProps)(Decks)