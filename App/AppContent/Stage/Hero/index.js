// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import styles from  './styles'

type Props = {|
    au: number,
    kind: 1 | 2 | 3 | 4 | 5
|}

class Hero extends Component<Props> {
    render() {
        const { kind, au } = this.props;
        return (
            <View style={[styles.hero, styles[`hero${kind}`]]}>
                <Text style={styles.au}>{au}</Text>
            </View>
        )
    }

}

export default Hero
