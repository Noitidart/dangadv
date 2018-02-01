// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Button from 'react-native-buttonex'

import Stage from './Stage'

import styles from  './styles'

type Props = {|
    setBackgroundOpaque: () => void
|}

class AppContent extends Component<Props> {
    render() {
        return (
            <View style={styles.screen}>
                <Stage key={Date.now()} />
                {/* <Button title="Restart Stage" onPress={()=>this.forceUpdate()} /> */}
            </View>
        )
    }
}

export default AppContent
