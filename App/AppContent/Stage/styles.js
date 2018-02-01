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
    actionPrefix: {
        fontSize: 15,
        fontWeight: '500',
        color: CONFIG.grey
    },
    action: {
        fontSize: 20,
        fontWeight: '500',
        color: CONFIG.grey
    },
    roundWrap: {
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    roundPrefix: {
        fontSize: 15,
        fontWeight: '500',
        color: CONFIG.grey
    },
    round: {
        fontSize: 24,
        fontWeight: 'bold',
        color: CONFIG.grey
    },

    center: {
        flex: 3,
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'pink'
    },

    enemys: {
        flex: 2,
        justifyContent: 'space-around',
        alignItems: 'center',
        // backgroundColor: 'orange'
    }
})

export default styles
