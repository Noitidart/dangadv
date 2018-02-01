// @flow

import React, { Component } from 'react'
import { Text, TouchableWithoutFeedback, View } from 'react-native'
import { randBetween } from 'cmn/lib/all'

import Enemy from './Enemy'
import Field from './Field'
import Health from './Health'
import Hero from './Hero'
import Shield from './Shield'

import styles from  './styles'

type Props = {|
    level: number
|}

type State= {|
    hpMax: number,
    hp: number, // sum of heros hpMax
    round: number,
    actionMax: 3,
    action: number, // 0 based
    dp: number, // defence power, but percent
    heros: Array<{
        kind: number,
        hpMax: number,
        ap: number,
        au: number // attack units (number color collected)
    }>,
    enemys: Array<EnemyType>
|}

type EnemyType = {
    kind: number,
    hpMax: number,
    hp: number,
    waitMax: number,
    wait: number, // rounds left till can attack // 0 based
    ap: number // attack power
}

class Stage extends Component<Props, State> {
    state = {
        hpMax: 100,
        hp: 100,
        round: 0,
        actionMax: 3,
        action: 0,
        dp: 0,
        heros: [
            {
                kind: 1,
                hpMax: 20,
                ap: 10,
                au: 0
            },
            {
                kind: 2,
                hpMax: 20,
                ap: 10,
                au: 0
            },
            {
                kind: 3,
                hpMax: 20,
                ap: 10,
                au: 0
            },
            {
                kind: 4,
                hpMax: 20,
                ap: 10,
                au: 0
            },
            {
                kind: 5,
                hpMax: 20,
                ap: 10,
                au: 0
            }
        ],
        enemys: new Array(randBetween(1, 4)).fill(0).map( (): EnemyType => {
            const hpMax = randBetween(50, 200);
            const waitMax = randBetween(0, 2);

            return {
                key: randBetween(0, Date.now()),
                kind: randBetween(1, 5),
                hpMax,
                hp: hpMax,
                waitMax,
                wait: waitMax,
                ap: randBetween(3, 10)
            }
        } )
    }
    render() {
        const { heros, dp, hp, hpMax, enemys, round, action, actionMax } = this.state;
        return (
            <View style={styles.stage}>
                <View style={styles.heros}>
                    { heros.map( ({ kind, au }) => <Hero kind={kind} au={au} key={kind} /> )}
                </View>
                <View style={styles.shield}>
                    <View style={styles.actionWrap}>
                        <Text style={styles.actionTitle}>Action</Text>
                        <Text style={styles.action}>{1 + actionMax - action}</Text>
                    </View>
                    <Shield dp={dp} addDp={this.addDp} />
                    <View style={styles.roundWrap}>
                        <Text style={styles.round}>{1 + round}</Text>
                        <Text style={styles.roundTitle}>Round</Text>
                    </View>
                </View>
                <View style={styles.center}>
                    <Field addAu={this.addAu} />
                    <Health hp={hp} hpMax={hpMax} />
                </View>
                <View style={styles.enemys}>
                    { enemys.map( (props, index) => <Enemy {...props} key={index} /> )}
                </View>
            </View>
        )
    }

    addAu = (kind, units) => this.setState(({ heros, action }) => ({
        heros: heros.map(hero => hero.kind !== kind ? hero : { ...hero, au:hero.au+units }),
        action: action + 1
    }) )

    addDp = () => this.setState(({ dp, action }) => ({
        dp: dp + 15,
        action: action + 1
    }))
}

export default Stage
