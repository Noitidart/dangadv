// @flow

import { Platform, TouchableNativeFeedback } from 'react-native'

const CONFIG = {
    // platform colors
    text: Platform.select({ // default text color
        android: '#808080', // color picked default app text color
        ios: '#000000'
    }),
    selectedText: Platform.select({ // default text color
        android: '#202020', // color picker on wheel selected text
        ios: '#000000'
    }),
    header: Platform.select({ // default header text color
        android: '#191919', // react-navigation
        ios: '#000000' // react-navigation
    }),
    grey: Platform.select({
        android: '#9E9E9E',
        ios: '#C7C7CC' // color picked settings page
    }),
    red: Platform.select({
        android: '#E51C23',
        ios: 'rgb(255, 59, 48)'
    }),
    green: Platform.select({
        android: '#5DDA5B', // material green is "#4CAF50" but i dont like it
        ios: 'rgb(76, 217, 100)'
    }),
    blue: Platform.select({
        android: '#2196F3',
        ios: '#007AFF'
    }),
    orange: Platform.select({
        android: '#FF9800',
        ios: 'rgb(255, 149, 0)'
    }),
    teal: Platform.select({
        android: '#009688'
    }),
    wheelIndicatorLineAndroid: '#838486',
    wheelArrowColorOldAndroid: '#999999', // new android does not have arrows
    wheelIndicatorLineOldAndroid: '#6bc7ef', // blueish
    wheelUnselectedTextAndroid: '#949597', //
    alertTextHeaderOldAndroid: '#31b6e7', // bluish - same for alertLineHeaderOldAndroid (the alert line splitter in header) - color picked on https://i.stack.imgur.com/2A3kx.png // can also be #33b5e5 as picked from - http://3.bp.blogspot.com/-ZSw9rNO49ss/Uankm5b1F7I/AAAAAAAAAl0/OZH2YasvGDI/s1600/date_picker.png
    ripple: Platform.OS === 'android' ? TouchableNativeFeedback.Ripple(undefined, true) : undefined,

    // my custom keys
    background: '#ECEFF1'
}

export default CONFIG
