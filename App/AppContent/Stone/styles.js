// @flow

import { StyleSheet } from 'react-native'

import CONFIG from '../../config'

const STONE_SIZE = 48;

const styles = StyleSheet.create({
    stone: {
        width: STONE_SIZE,
        height: STONE_SIZE,
        padding: 1
    },
    stoneInner: {
        elevation: 2,
        flexGrow: 1
    },
    stone0: {
        elevation: 0
    },
    stone1: {
        backgroundColor: CONFIG.purple
    },
    stone2: {
        backgroundColor: CONFIG.green
    },
    stone3: {
        backgroundColor: CONFIG.blue
    },
    stone4: {
        backgroundColor: CONFIG.yellow
    },
    stone5: {
        backgroundColor: CONFIG.red
    }
})

export { STONE_SIZE }
export default styles
