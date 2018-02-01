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
            const contigsNew = this.buildContigs(stonesNew);
            this.setState(() => ({ stones:stonesNew, contigs:contigsNew }));
        } // else nothing contiguous to this
    }

    buildField(): {| stones:$PropertyType<State, 'stones'>, contigs:$PropertyType<State, 'contigs'> |} {
        const stones = new Array(FIELD_SIZE).fill(0).map(() => randBetween(1, 5));
        // const stones = [
        //     1, 1, 1, 1, 2, 1,
        //     3, 3, 3, 3, 2, 3,
        //     3, 3, 3, 2, 2, 3,
        //     4, 4, 4, 4, 4, 4,
        //     5, 5, 5, 5, 5, 5,
        //     5, 5, 5, 5, 5, 5
        // ]
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
    buildContigs(stones: StoneKind[]) {
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

        const setContigAndExplore = (row, col, contig: Contig, stone: StoneKind): void => {
            setContig(row, col, contig);
            const coordsTop = [row-1, col];
            const coordsBot = [row+1, col];
            const coordsRit = [row, col+1];
            const coordsLef = [row, col-1];

            const stoneTop = getStone(...coordsTop);
            const stoneBot = getStone(...coordsBot);
            const stoneRit = getStone(...coordsRit);
            const stoneLef = getStone(...coordsLef);

            if (stoneTop === stone && getContig(...coordsTop) === undefined) setContigAndExplore(...coordsTop, contig, stone);
            if (stoneBot === stone && getContig(...coordsBot) === undefined) setContigAndExplore(...coordsBot, contig, stone);
            if (stoneRit === stone && getContig(...coordsRit) === undefined) setContigAndExplore(...coordsRit, contig, stone);
            if (stoneLef === stone && getContig(...coordsLef) === undefined) setContigAndExplore(...coordsLef, contig, stone);
        }

        for (let col=0; col<COL_SIZE; col++) {
            for (let row=0; row<ROW_SIZE; row++) {
                if (getContig(row, col) === undefined) {
                    const contig = getNextContig();
                    const stone = getStone(row, col);
                    setContigAndExplore(row, col, contig, stone);
                }
            }
        }

        return contigs;
    }
}

export default Field
