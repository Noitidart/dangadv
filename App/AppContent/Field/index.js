// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { randBetween } from 'cmn/lib/all'

import Stone from '../Stone'

import styles from  './styles'

import type { StoneKind } from './Stone'

type Props = {|

|}

type State = {
    stones: StoneKind[] // [StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind, StoneKind]
}

const getRow = index => Math.floor(index / 64);
const getCol = index => index % 64;

class Field extends Component<Props> {
    state = {
        stones: new Array(36).fill(0).map(() => randBetween(1, 5))
    }

    render() {
        const { stones } = this.state;

        return (
            <View style={styles.field}>
                { stones.map( (kind, i) => <Stone kind={kind} key={`${getRow(i)}${getCol(i)}`} /> ) }
            </View>
        )
    }
}

export default Field
