import * as PIXI from 'pixi.js';
import { Slots } from './slots';

export function initApp(canvas?: HTMLCanvasElement){
    const app = new PIXI.Application({ background: '#1099bb', width: 820, height: 600, view: canvas});
    console.log('loading')
    return PIXI.Assets.load([
        'https://pixijs.com/assets/eggHead.png',
        'https://pixijs.com/assets/flowerTop.png',
        'https://pixijs.com/assets/helmlok.png',
        'https://pixijs.com/assets/skully.png',
    ]).then(()=>{
        const slots = new Slots(app);
        return slots;
    });
}