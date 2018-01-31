// @flow

import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { randBetween } from 'cmn/lib/all'

import Stone from '../Stone'

import styles, { COL_SIZE, FIELD_SIZE, ROW_SIZE } from  './styles'

import type { StoneKind } from './Stone'

type Props = {|

|}

type State = {
    stones: StoneKind[],
    contigs: Contig[]
}

type Contig = number;

const getRow = index => Math.floor(index / FIELD_SIZE);
const getCol = index => index % FIELD_SIZE;
const getIndex = (row, col) => row * ROW_SIZE + col;

class Field extends Component<Props> {
    state = {
        ...this.buildField()
    }

    render() {
        const { stones } = this.state;

        return (
            <View style={styles.field}>
                { stones.map( (kind, i) => <Stone kind={kind} index={i} clearStonesAt={this.clearStonesAt} key={`${getRow(i)}${getCol(i)}`} contig={this.state.contigs[i]} /> ) }
            </View>
        )
    }

    clearStonesAt = (index: number) => {
        const { contigs, stones } = this.state;
        const contig = contigs[index];

        const isMultiStones = contigs.some((aContig, aIndex) => aIndex !== index && aContig === contig);

        if (isMultiStones) {
            const stonesNew = stones.map((stone, index) => contigs[index] === contig ? 0 : stone); // 0 is StoneKind for no stone
            this.setState(() => ({ stones:stonesNew }));
        } // else nothing contiguous to this
    }

    buildField(): {| stones:$PropertyType<State, 'stones'>, contigs:$PropertyType<State, 'contigs'> |} {
        const stones = new Array(FIELD_SIZE).fill(0).map(() => randBetween(1, 5));
        // const stones = [
        //     1, 1, 1, 1, 2, 1,
        //     2, 2, 2, 2, 2, 2,
        //     3, 3, 3, 3, 3, 3,
        //     4, 4, 4, 4, 5, 4,
        //     5, 5, 5, 5, 5, 5,
        //     5, 5, 5, 5, 5, 5
        // ]
        const contigs = this.buildContigs(stones);

        return { stones, contigs };
    }
    buildContigs(stones=this.state.stones) {
        const contigs = new Array(FIELD_SIZE);

        let nextContig: Contig = 0;

        const getNextContig = (): Contig => nextContig++;

        const getStone = (row, col): null | StoneKind => {
            if (row < 0 || row >= ROW_SIZE || col < 0 || col >= COL_SIZE) return null;
            return stones[getIndex(row, col)];
        }
        const getContig = (row, col): Contig => {
            if (row < 0 || row >= ROW_SIZE || col < 0 || col >= COL_SIZE) throw new Error('out of bounds');
            return contigs[getIndex(row, col)];
        }
        const setContig = (row, col, contig): void => {
            if (row < 0 || row >= ROW_SIZE || col < 0 || col >= COL_SIZE) throw new Error('out of bounds');
            contigs[getIndex(row, col)] = contig;
        }

        for (let col=0; col<COL_SIZE; col++) {
            for (let row=0; row<ROW_SIZE; row++) {

                const coords = [row, col];
                const coordsTop = [row-1, col];
                const coordsBot = [row+1, col];
                const coordsRit = [row, col+1];
                const coordsLef = [row, col-1];

                const stone = getStone(...coords);
                const stoneTop: null | StoneKind = getStone(...coordsTop);
                const stoneBot: null | StoneKind = getStone(...coordsBot);
                const stoneRit: null | StoneKind = getStone(...coordsRit);
                const stoneLef: null | StoneKind = getStone(...coordsLef);

                // console.log(`${row}, ${col}: ${stone}`);
                if (getContig(...coords) === undefined) {
                    const contigBot = stoneBot !== null ? getContig(...coordsBot) : undefined;
                    if (stone === stoneTop) {
                        setContig(...coords, getContig(...coordsTop));
                    } else if (stone === stoneBot && contigBot !== undefined) {
                        setContig(...coords, contigBot);
                    } else {
                        setContig(...coords, getNextContig());
                    }
                }

                if (stone === stoneRit) {
                    setContig(...coordsRit, getContig(...coords));
                }
            }
        }

        return contigs;
    }
}

export default Field
