// @flow

import { StyleSheet } from 'react-native'

import CONFIG from '../../../config'

const styles = StyleSheet.create({
    health: {
        width: '100%',
        backgroundColor: 'pink',
        alignItems: 'center'
    },
    fill: {
        backgroundColor: CONFIG.red,
        alignItems: 'center',
        position: 'absolute',
        height: '100%',
        left: 0
    },
    label: {
        fontWeight: '500',
        fontSize: 20,
        color: '#000000'
    }
})

export default styles
