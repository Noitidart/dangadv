// @flow

import React, { Component } from 'react'
import { Text, TouchableWithoutFeedback, View, Alert } from 'react-native'
import withMonitor from 'react-with-monitor'
import { randBetween } from 'cmn/lib/all'
import { delay } from 'redux-saga'

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

const KIND_MAX = 5;
const KIND_MIN = 1;

function genEnemys(): EnemyType[] {
    return new Array(randBetween(1, 4)).fill(0).map( (): EnemyType => {
        const hpMax = randBetween(50, 50);
        const waitMax = randBetween(0, 2);

        return {
            kind: randBetween(KIND_MIN, KIND_MAX),
            hpMax,
            hp: hpMax,
            waitMax,
            wait: waitMax,
            ap: randBetween(3, 10)
        }
    } )
}

class StageDumb extends Component<Props, State> {
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

    componentDidUpdate(propsOld, stateOld) {
        const { action, actionMax } = this.state;
        const { action:actionOld } = stateOld;

        if (action !== actionOld && action - 1 === actionMax) {
            this.sequenceFight();
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
                    <View style={styles.roundWrap}>
                        <Text style={styles.roundLabel}>Round {1 + round}</Text>
                    </View>
                    <View style={styles.waveWrap}>
                        <Text style={styles.wave}>{1 + wave}</Text>
                        <Text style={styles.waveTitle}>Wave</Text>
                    </View>
                </View>
                <View style={styles.center}>
                    <Field addAu={this.addAu} action={action} actionMax={actionMax} />
                    <View style={styles.centerRow}>
                        <Health hp={hp} hpMax={hpMax} />
                        <Shield dp={dp} addDp={this.addDp} />
                    </View>
                </View>
                <View style={styles.enemys}>
                    { enemys.map( (props, index) => <Enemy {...props} key={`${wave}_${index}`} /> )}
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

    sequenceFight = async () => {
        console.log('sequenceFight start');

        // heros attack if have au && reset au
        {
            const { heros } = this.state;
            for (const hero of heros) {
                const { au, ap, kind } = hero;

                if (au) {
                    await delay(1000);
                    console.log(`hero${kind} is attacking`);

                    const kindDamage = {
                        [kind]: au * ap,
                        [kind - 1 < KIND_MIN ? KIND_MAX : kind - 1]: (au * ap) / 2,
                        [kind + 1 > KIND_MAX ? KIND_MIN : kind + 1]: (au * ap) / 2
                    };

                    this.setState( ({ heros, enemys }) => {

                        // attack enemys that are alive
                        const enemysNew = enemys.map(enemy => !(enemy.kind in kindDamage) || enemy.hp === 0 ? enemy : {
                            ...enemy,
                            hp: Math.max(0, enemy.hp - kindDamage[enemy.kind])
                        });
                        const herosNew = heros.map(hero => hero.kind !== kind ? hero : {
                            ...hero,
                            au: 0
                        });

                        return {
                            heros: herosNew,
                            enemys: enemysNew
                        }
                    } );

                    await this.monitor( (props, state) => state.heros.find(hero => hero.kind === kind).au === 0 );
                    // TODO: testWaveWon()
                }
            }
        }

        // enemys attack if alive and if user alive
        {
            const { enemys } = this.state;
            let i = -1;
            for (const enemy of enemys) {
                const { hp:userHp } = this.state;
                i++;
                const isAlive = enemy.hp > 0;
                const isNotWaiting = enemy.wait === 0;
                if (isAlive && isNotWaiting) {
                    await delay(1000);
                    console.log(`enemy at index ${i} is attacking`);

                    const userHpNew = userHp - enemy.ap;
                    this.setState( () => ({ hp:userHpNew }) );

                    await this.monitor( (props, state) => state.hp === userHpNew );
                }
            }
        }

        console.log('sequenceFight done - will now do next round, next wave, or game over');

        // if user is alive
            // if enemys alive, start next round && reset action && reset dp && decrement wait of enemys that are alive
            // else no enemys alive, start next wave & reset round & reset action & reset dp & generate new enemys
        // if user is dead
            // show scoreboard and persist high scores

        {
            const { hp:userHp } = this.state;

            if (userHp === 0) {
                // user is dead
                alert('Game over you died!');
            } else {
                const { enemys, round } = this.state;
                const isAnyEnemyAlive = enemys.some(enemy => enemy.hp > 0);
                const roundNew = round + 1;
                if (isAnyEnemyAlive) {
                    console.log('starting next round');
                    await delay(1000);

                    const enemysNew = enemys.map(enemy => ({
                        ...enemy,
                        wait: enemy.wait - 1 > -1 ? enemy.wait - 1 : enemy.waitMax
                    }));

                    this.setState(() => ({
                        round: roundNew,
                        action: 0,
                        dp: 0,
                        enemys: enemysNew
                    }));
                    await this.monitor( (props, state) => state.round === roundNew );
                } else {
                    await new Promise( resolve => Alert.alert('Wave Defeated', 'You beat this wave! But watchout, another wave is coming...', [{ text:'Bring it on!', onPress:resolve }], { cancelable:false }) );
                    await delay(1000);

                    const { wave } = this.state;
                    const waveNew = wave + 1;
                    this.setState(() => ({
                        round: roundNew,
                        wave: waveNew,
                        action: 0,
                        dp: 0,
                        enemys: genEnemys()
                    }));
                }
            }
        }
    }
}

const Stage = withMonitor(StageDumb)

export default Stage
