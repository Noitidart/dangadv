// @flow

import { StyleSheet } from 'react-native'

import CONFIG from '../../../config'

const styles = StyleSheet.create({
    health: {
        width: '100%',
        alignItems: 'center'
    },
    fill: {
        backgroundColor: CONFIG.red,
        height: '100%',
        position: 'absolute'
    },
    label: {
        fontWeight: '500',
        fontSize: 20,
        color: '#000000'
    }
})

export default styles
