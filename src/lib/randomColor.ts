'use client'

import {randomNumber} from './randomNumber'

export const randomColor = (alpha = 1) => {
    const color = `hsla(${randomNumber(28,255)+50},50%,46%,${alpha})`;
    // console.log({color})
    return (color);
}