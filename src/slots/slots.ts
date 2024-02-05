import * as PIXI from 'pixi.js';
import { Reel } from './reel';
import { REEL_WIDTH, SYMBOL_SIZE } from './consts';

export class Slots{
    running = false;
    reels: Reel[] = [];

    constructor(app: PIXI.Application){
        // Create different slot symbols.
        const slotTextures = [
            PIXI.Texture.from('https://pixijs.com/assets/eggHead.png'),
            PIXI.Texture.from('https://pixijs.com/assets/flowerTop.png'),
            PIXI.Texture.from('https://pixijs.com/assets/helmlok.png'),
            PIXI.Texture.from('https://pixijs.com/assets/skully.png'),
        ];

        const reelContainer = new PIXI.Container();

        for (let i = 0; i < 5; i++){
            const reel = new Reel(reelContainer, slotTextures, i);
            this.reels.push(reel);
        }
        app.stage.addChild(reelContainer);

        // Build top & bottom covers and position reelContainer
        const margin = (app.screen.height - SYMBOL_SIZE * 3) / 2;

        reelContainer.y = margin;
        reelContainer.x = Math.round(app.screen.width - REEL_WIDTH * 5);
        const top = new PIXI.Graphics();

        top.beginFill(0, 1);
        top.drawRect(0, 0, app.screen.width, margin);
        const bottom = new PIXI.Graphics();

        bottom.beginFill(0, 1);
        bottom.drawRect(0, SYMBOL_SIZE * 3 + margin, app.screen.width, margin);

        // Add play text
        const style = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 36,
            fontStyle: 'italic',
            fontWeight: 'bold',
            fill: ['#ffffff', '#00ff99'], // gradient
            stroke: '#4a1850',
            strokeThickness: 5,
            dropShadow: true,
            dropShadowColor: '#000000',
            dropShadowBlur: 4,
            dropShadowAngle: Math.PI / 6,
            dropShadowDistance: 6,
            wordWrap: true,
            wordWrapWidth: 440,
        });

        // const playText = new PIXI.Text('Spin the wheels!', style);

        // playText.x = Math.round((bottom.width - playText.width) / 2);
        // playText.y = app.screen.height - margin + Math.round((margin - playText.height) / 2);
        // bottom.addChild(playText);

        // Add header text
        const headerText = new PIXI.Text('PIXI MONSTER SLOTS!', style);

        headerText.x = Math.round((top.width - headerText.width) / 2);
        headerText.y = Math.round((margin - headerText.height) / 2);
        top.addChild(headerText);

        app.stage.addChild(top);
        app.stage.addChild(bottom);

        // Set the interactivity.
        // bottom.eventMode = 'static';
        // bottom.cursor = 'pointer';
        // bottom.addListener('pointerdown', () => {
        //    this.startPlay();
        // });

        // Listen for animate update.
        app.ticker.add((delta) => {
        // Update the slots.
            for (let i = 0; i < this.reels.length; i++){
                this.reels[i].render(delta);
            }
        });
    }

    reelsComplete(){
        this.running = false;
    }

    startPlay(onComplete?: ()=>void){
        if (this.running) return;
        this.running = true;

        for (let i = 0; i < this.reels.length; i++){
            const r = this.reels[i];
            r.startPlay().then(()=>{
                if (i ==this.reels.length -1){
                    this.reelsComplete();
                    onComplete?.();
                }
            });
        }
    }

}