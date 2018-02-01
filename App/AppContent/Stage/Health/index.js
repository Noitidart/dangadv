// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'

import styles from  './styles'

type Props = {|
    hpMax: number,
    hp: number
|}

class Health extends Component<Props> {
    render() {
        const { hp, hpMax } = this.props;

        const width = Math.round((hp / hpMax) * 100) + '%';

        return (
            <View style={styles.health}>
                <View style={[styles.fill, { width }]} />
                <Text style={styles.label}>{hp} / {hpMax}</Text>
            </View>
        )
    }

}

export default Health
