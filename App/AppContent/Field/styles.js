// @flow

import { StyleSheet } from 'react-native'

const COL_SIZE = 6;
const ROW_SIZE = 6;
const FIELD_SIZE = ROW_SIZE * COL_SIZE;

import { STONE_SIZE } from '../Stone/styles'

const styles = StyleSheet.create({
    field: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: STONE_SIZE * ROW_SIZE
    },
    row: {
        flexDirection: 'row'
    }
})

export { COL_SIZE, FIELD_SIZE, ROW_SIZE }
export default styles
