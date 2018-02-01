// @flow

import { StyleSheet } from 'react-native'

import CONFIG from '../../config'

const styles = StyleSheet.create({
    stage: {
        flexDirection: 'row',
        flexGrow: 1
    },

    heros: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'skyblue'
    },

    shield: {
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'steelblue'
    },
    actionWrap: {
        // justifyContent: 'flex-start',
        alignItems: 'center'
    },
    actionTitle: {
        fontSize: 13,
        color: CONFIG.grey
    },
    action: {
        fontSize: 20,
        fontWeight: '500',
        color: CONFIG.grey
    },
    roundWrap: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    roundLabel: {
        fontSize: 15,
        color: CONFIG.grey
    },
    waveWrap: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    waveTitle: {
        fontSize: 15,
        color: CONFIG.grey
    },
    wave: {
        fontSize: 22,
        fontWeight: 'bold',
        color: CONFIG.grey
    },

    center: {
        flex: 3,
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'pink'
    },
    centerRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    enemys: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'orange'
    }
})

export default styles
