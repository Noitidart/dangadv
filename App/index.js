// @flow

import './boot'

import React, { Component } from 'react'
import { AppRegistry, ScrollView, StatusBar, View } from 'react-native'
import { Provider } from 'react-redux'

import store from './flow-control'

import AppBackground from './AppBackground'
import AppContent from './AppContent'

import styles from './styles'

// StatusBar.setTranslucent(true);
// StatusBar.setBackgroundColor('rgba(0, 0, 0, .7)', false);

class App extends Component<{||}> {
    render() {
        return (
            <Provider store={store}>
                <View style={styles.app}>
                    <AppBackground ref={this.refBackground} />
                    <ScrollView style={styles.appContentView} contentContainerStyle={styles.appContentContainer} keyboardShouldPersistTaps="handled" scrollEnabled={false}>
                        <AppContent setBackgroundOpaque={this.setBackgroundOpaque} />
                    </ScrollView>
                </View>
            </Provider>
        )
    }

    refBackground = el => this.background = el
    setBackgroundOpaque = () => this.background.setOpaque()
}

export default App
