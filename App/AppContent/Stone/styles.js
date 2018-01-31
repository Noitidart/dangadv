// @flow

import { StyleSheet } from 'react-native'

import CONFIG from '../../config'

const styles = StyleSheet.create({
    stone: {
        width: 48,
        height: 48,
        padding: 1
    },
    stoneInner: {
        elevation: 2,
        flexGrow: 1
    },
    stone0: {

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

export default styles
