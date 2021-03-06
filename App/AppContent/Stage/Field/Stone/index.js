// @flow

import React, { Component } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import { randBetween } from 'cmn/lib/all'

import styles from  './styles'

type Props = {|
    index: number,
    kind: StoneKind,
    clearStonesAt: number => void,
    action: number,
    actionMax: number
|}

type StoneKind = 0 | 1 | 2 | 3 | 4 | 5;

class Stone extends Component<Props> {
    render() {
        const { kind, index, action, actionMax } = this.props;

        const isActionsDone = action - 1 === actionMax;

        return (
            <TouchableWithoutFeedback onPressIn={this.handlePress} disabled={isActionsDone}>
                <View style={styles.stone}>
                    <View style={[styles.stoneInner, styles[`stone${kind}`]]} />
                    {/* { kind !== 0 && <Text style={{position:'absolute', elevation:2}}>{this.props.contig}</Text> } */}
                </View>
            </TouchableWithoutFeedback>
        )
    }

    handlePress = () => this.props.clearStonesAt(this.props.index)
}

export type { StoneKind }
export default Stone
