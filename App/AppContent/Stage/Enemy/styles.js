// @flow

import { StyleSheet } from 'react-native'

import CONFIG from '../../../config'

const styles = StyleSheet.create({
    enemy: {
        height: 56,
        width: 60,
        // justifyContent: 'center',
        alignItems: 'center'
    },

    absolute: {
        position: 'absolute'
    },
    ap: {
        marginTop: 13,
        fontWeight: '500',
        fontSize: 18,
        color: '#000000'
    },

    health: {
        width: '100%',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        left: 0
    },
    fill: {
        backgroundColor: CONFIG.red,
        height: '10%',
        top: 0,
        left: 0,
        position: 'absolute'
    },
    label: {
        // fontWeight: '500',
        fontSize: 10,
        color: '#000000'
    },

    waitWrap: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    wait: {
        fontWeight: '500',
        fontSize: 14,
        color: CONFIG.grey
    }
})

export default styles
