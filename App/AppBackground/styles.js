// @flow

import { StyleSheet } from 'react-native'

import CONFIG from '../config'

const styles = StyleSheet.create({
    transparent: {
        width: '100%',
        height: '100%',
        position: 'absolute'
    },
    opaque: {
        width: '100%',
        height: '100%',
        position: 'absolute',
        backgroundColor: CONFIG.background // to hide splash in background - not working when keyboard view pushes it away though
    }
})

export default styles
