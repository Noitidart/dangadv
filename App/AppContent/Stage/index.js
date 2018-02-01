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

type Props = {||}

type State= {|
    wave: number, // 0 based
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

function genEnemys(): EnemyType[] {
    return new Array(randBetween(1, 4)).fill(0).map( (): EnemyType => {
        const hpMax = randBetween(50, 50);
        const waitMax = randBetween(0, 2);

        return {
            kind: randBetween(1, 5),
            hpMax,
            hp: hpMax,
            waitMax,
            wait: waitMax,
            ap: randBetween(3, 10)
        }
    } )
}

class Stage extends Component<Props, State> {
    state = {
        wave: 0,
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
        enemys: genEnemys()
    }

    componentDidUpdate() {
        const { action, actionMax } = this.state;

        if (action - 1 === actionMax) {
            this.setState(({ enemys, round, hp, heros, dp }) => {
                let damageToUser = 0;

                const damageToEnemyk = {
                    '1': 0,
                    '2': 0,
                    '3': 0,
                    '4': 0,
                    '5': 0
                }

                const herosNew = heros.map( hero => {
                    const { kind, au, ap } = hero;

                    if (au) {
                        let halfKind0 = kind - 1;
                        let halfKind1 = kind + 1
                        if (halfKind0 === 0) halfKind0 = 5; // MAGIC:
                        if (halfKind1 === 6) halfKind1 = 1 // MAGIC:

                        damageToEnemyk[halfKind0] += (au * ap) / 2;
                        damageToEnemyk[halfKind1] += (au * ap) / 2;
                        damageToEnemyk[kind] += au * ap;
                    }

                    return {
                        ...hero,
                        au: 0
                    }
                })

                console.log('damageToEnemyk:', damageToEnemyk);

                const enemysNew = enemys.map( enemy => {
                    const { wait, waitMax, hp, ap, kind } = enemy;

                    let waitNew = wait - 1;
                    if (waitNew === -1) {
                        damageToUser += ap;
                        waitNew = waitMax;
                    }

                    return {
                        ...enemy,
                        wait: waitNew,
                        hp: Math.max(0, hp - damageToEnemyk[kind])
                    }
                } )

                // damageToUser = Math.round(damageToUser - ((dp / 100) * damageToUser))

                const hpNew = Math.max(0, hp - damageToUser);

                const sumEnemysHp = enemysNew.reduce((sum, { hp }) => sum + hp, 0);
                console.log('sumEnemysHp:', sumEnemysHp);

                const isAllEnemysDead = sumEnemysHp === 0;
                const isUserDead = hpNew === 0;

                if (isAllEnemysDead && isUserDead) {
                    alert('DRAW...');
                } else if (isAllEnemysDead) {
                    alert('You beat this wave! Another wave incoming!');
                    setTimeout(() =>
                        this.setState(({ wave }) => ({
                            wave: wave + 1,
                            round: 0,
                            enemys: genEnemys()
                        }))
                    , 0)
                } else if (isUserDead) {
                    alert('You lose =(');
                }

                return {
                    action: 0,
                    round: round + 1,
                    heros: herosNew,
                    dp: 0,
                    enemys: enemysNew,
                    hp: hpNew
                }
            });
        }
    }

    render() {
        const { heros, dp, hp, hpMax, enemys, round, action, actionMax, wave } = this.state;
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
                    {/* <View style={styles.waveWrap}>
                        <Text style={styles.wave}>{1 + wave}</Text>
                        <Text style={styles.waveTitle}>Wave</Text>
                    </View> */}
                    <View style={styles.roundWrap}>
                        <Text style={styles.round}>{1 + wave}</Text>
                        <Text style={styles.roundTitle}>Wave</Text>
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

    addAu = (kind, units) => this.setState(({ heros, action, actionMax }) => {
        if (action - 1 === actionMax) return null;

        return {
            heros: heros.map(hero => hero.kind !== kind ? hero : { ...hero, au:hero.au+units }),
            action: action + 1
        }
    })

    addDp = () => this.setState(({ dp, action, actionMax }) => {
        if (action - 1 === actionMax) return null;

        return {
            dp: dp + 15,
            action: action + 1
        }
    })
}

export default Stage
