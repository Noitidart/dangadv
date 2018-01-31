// @flow

import React, { Component } from 'react'
import { Button, View, Text } from 'react-native'

import styles from  './styles'

type Props = {||}

type State = {|
    isOpaque: boolean
|}

class AppContent extends Component<Props, State> {
    state = {
        isOpaque: false
    }

    render() {
        return <View style={this.state.isOpaque ? styles.opaque : styles.transparent} />
    }

    setOpaque = () => this.setState(() => ({ isOpaque:true }))
}

export default AppContent
