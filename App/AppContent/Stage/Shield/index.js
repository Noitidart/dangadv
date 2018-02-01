// @flow

import React, { Component } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import { randBetween } from 'cmn/lib/all'

import styles from  './styles'

type Props = {|
    dp: number, // defence power
    addDp: void => void
|}

class Shield extends Component<Props> {
    render() {
        const { dp } = this.props;

        return (
            <TouchableWithoutFeedback onPress={this.handlePress}>
                <View style={styles.shield}>
                    <Text style={styles.label}>{dp}%</Text>
                </View>
            </TouchableWithoutFeedback>
        )
    }

    handlePress = () => this.props.addDp()
}

export default Shield
