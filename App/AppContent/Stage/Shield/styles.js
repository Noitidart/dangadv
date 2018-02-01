// @flow

import { StyleSheet } from 'react-native'

import CONFIG from '../../../config'

const styles = StyleSheet.create({
    shield: {
        width: 48,
        height: 48,
        borderRadius: 16,
        backgroundColor: CONFIG.orange,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontWeight: '500',
        fontSize: 24,
        color: '#000000'
    }
})

export default styles
