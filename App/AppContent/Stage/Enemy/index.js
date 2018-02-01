// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import Triangle from 'react-native-triangle'

import CONFIG from '../../../config'

import styles from  './styles'

type Props = {|
    kind: 1 | 2 | 3 | 4 | 5,
    ap: number,
    hp: number,
    hpMax: number,
    wait: number,
    waitMax: number
|}

class Enemy extends Component<Props> {
    render() {
        const { kind, ap, hp, hpMax, wait } = this.props;

        const color = (function() {
            switch (kind) {
                case 1: return CONFIG.purple;
                case 2: return CONFIG.green;
                case 3: return CONFIG.blue;
                case 4: return CONFIG.yellow;
                case 5: return CONFIG.red;
            }
        })()

        const width = Math.round((hp / hpMax) * 100) + '%';

        return (
            <View style={styles.enemy}>
                <View style={styles.waitWrap}>
                    <Text style={styles.wait}>{1 + wait}</Text>
                </View>
                <View style={styles.absolute}>
                    <Triangle color={color} direction="up" height={40} width={50} />
                </View>
                <Text style={styles.ap}>{ap}</Text>

                <View style={styles.health}>
                    <View style={[styles.fill, { width }]} />
                    <Text style={styles.label}>{hp} / {hpMax}</Text>
                </View>
            </View>
        )
    }

}

export default Enemy
