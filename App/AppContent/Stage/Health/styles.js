// @flow

import { StyleSheet } from 'react-native'

import CONFIG from '../../../config'

const styles = StyleSheet.create({
    health: {
        width: '100%',
        backgroundColor: 'pink'
    },
    fill: {
        backgroundColor: CONFIG.red,
        alignItems: 'center'
    },
    label: {
        fontWeight: '500',
        fontSize: 20,
        color: '#000000'
    }
})

export default styles
