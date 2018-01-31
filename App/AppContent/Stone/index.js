// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { randBetween } from 'cmn/lib/all'

import styles from  './styles'

type Props = {|

|}

type State = {
    isPressed: boolean,
    isHighlighted: boolean
}

type StoneKind = 0 | 1 | 2 | 3 | 4 | 5;

class Stone extends Component<Props> {
    state = {
        isPressed: false,
        isHighlighted: false
    }

    render() {
        const { kind } = this.props;

        return (
            <View style={styles.stone}>
                <View style={[styles.stoneInner, styles[`stone${kind}`]]} />
            </View>
        )
    }
}

export type { StoneKind }
export default Stone
