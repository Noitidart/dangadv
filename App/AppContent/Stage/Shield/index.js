// @flow

import React, { Component } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import { randBetween } from 'cmn/lib/all'

import styles from  './styles'

type Props = {|
    dp: 0 | 15 | 30 | 45 | 60 // defence power
|}

class Shield extends Component<Props> {
    render() {
        const { dp } = this.props;

        return (
            <View style={styles.shield}>
                <Text style={styles.label}>{dp}%</Text>
            </View>
        )
    }

}

export default Shield
