// @flow

import { StyleSheet } from 'react-native'

import CONFIG from '../../../config'

const styles = StyleSheet.create({
    hero: {
        width: 40,
        height: 40,
        borderRadius: 40 / 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    hero1: {
        backgroundColor: CONFIG.purple
    },
    hero2: {
        backgroundColor: CONFIG.green
    },
    hero3: {
        backgroundColor: CONFIG.blue
    },
    hero4: {
        backgroundColor: CONFIG.yellow
    },
    hero5: {
        backgroundColor: CONFIG.red
    },
    au: {
        fontWeight: '500',
        fontSize: 18,
        color: '#000000'
    }
})

export default styles
