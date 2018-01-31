// @flow

import { take, select } from 'redux-saga/effects'
import { REHYDRATE } from 'redux-persist/lib/constants'

// getId
type ReducerKey = string;
const NEXT_ID: { [ReducerKey]: Id } = {};
export function getId(key: ReducerKey, state?: {}): Id {
    if (!state) {
        if (!(key in NEXT_ID)) NEXT_ID[key] = -1;
    } else {
        if (!(key in NEXT_ID)) {
            const ids = Object.keys(state);
            NEXT_ID[key] = ids.length ? Math.max(...ids) : -1;
        }
    }
    return ++NEXT_ID[key];
}
export function* getIdSaga(key: ReducerKey): Generator<void, number, void> {
    // reducer must have shape { [Id]: { id } }
    if (!(key in NEXT_ID)) {
        const { [key]:entrys } = yield select();
        const ids = Object.keys(entrys);
        NEXT_ID[key] = ids.length ? Math.max(...ids) : -1;
    }
    return ++NEXT_ID[key];
}

// waitRehydrate
export function* waitRehydrate(): Generator<any, any, any> {
    // wait for redux-persist rehydration

    let {_persist:{ rehydrated }} = yield select();

    while (!rehydrated) {
        yield take(REHYDRATE);
        ({_persist:{ rehydrated }} = yield select());
    }
}

// withPromise
export type PromiseAction = { promise:Promise<any>, resolve:any=>void }
export function withPromise<T: Action>(action: T): T {
    // adds action.promise and action.resolve to T
    action.promise = new Promise(resolve => action.resolve = resolve);
    return action;
}
