// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Counter from './Counter'

import styles from  './styles'

type Props = {
    setBackgroundOpaque: () => void
}

class AppContent extends Component<Props> {
    render() {
        return (
            <View style={styles.screen}>
                <Text style={styles.text}>
                    AppContent
                </Text>
                <Counter />
            </View>
        )
    }
}

export default AppContent
