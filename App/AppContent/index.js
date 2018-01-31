// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import Field from './Field'

import styles from  './styles'

type Props = {|
    setBackgroundOpaque: () => void
|}

class AppContent extends Component<Props> {
    render() {
        return (
            <View style={styles.screen}>
                <Field />
            </View>
        )
    }
}

export default AppContent
