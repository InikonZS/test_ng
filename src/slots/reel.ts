import * as PIXI from 'pixi.js';
import gsap from 'gsap';
import { REEL_WIDTH, SYMBOL_SIZE, backout } from './consts';

export class Reel {
    container: PIXI.Container;
    symbols: Array<PIXI.Sprite>;
    position = 0;
    previousPosition = 0;
    blur: PIXI.BlurFilter;
    i: number;

    slotTextures: Array<PIXI.Texture>;

    constructor(reelContainer: PIXI.Container, slotTextures: Array<PIXI.Texture>, i: number, ){
        const rc = new PIXI.Container();
        this.slotTextures = slotTextures;
        this.i = i;

        rc.x = i * REEL_WIDTH;
        reelContainer.addChild(rc);
        this.container = rc;
        this.symbols = [];
        this.blur = new PIXI.filters.BlurFilter();

        this.blur.blurX = 0;
        this.blur.blurY = 0;
        rc.filters = [this.blur];

        // Build the symbols
        for (let j = 0; j < 4; j++)
        {
            const symbol = new PIXI.Sprite(slotTextures[Math.floor(Math.random() * slotTextures.length)]);
            // Scale the symbol to fit symbol area.

            symbol.y = j * SYMBOL_SIZE;
            symbol.scale.x = symbol.scale.y = Math.min(SYMBOL_SIZE / symbol.width, SYMBOL_SIZE / symbol.height);
            symbol.x = Math.round((SYMBOL_SIZE - symbol.width) / 2);
            this.symbols.push(symbol);
            rc.addChild(symbol);
        }
    }

    startPlay(){
        const i = this.i;
        const extra = Math.floor(Math.random() * 3);
        const target = this.position + 10 + i * 5 + extra;
        const time = 2500 + i * 600 + extra * 600;
        return gsap.to(this, {
            position: target,
            duration:  time / 1000,
            ease: backout(0.5)
        })
    }

    render(delta: number){
        const r = this
        // Update blur filter y amount based on speed.
        // This would be better if calculated with time in mind also. Now blur depends on frame rate.

        r.blur.blurY = (r.position - r.previousPosition) * 8 / delta;
        r.previousPosition = r.position;

        // Update symbol positions on reel.
        for (let j = 0; j < r.symbols.length; j++)
        {
            const s = r.symbols[j];
            const prevy = s.y;

            s.y = ((r.position + j) % r.symbols.length) * SYMBOL_SIZE - SYMBOL_SIZE;
            if (s.y < 0 && prevy > SYMBOL_SIZE)
            {
                // Detect going over and swap a texture.
                // This should in proper product be determined from some logical reel.
                s.texture = this.slotTextures[Math.floor(Math.random() * this.slotTextures.length)];
                s.scale.x = s.scale.y = Math.min(SYMBOL_SIZE / s.texture.width, SYMBOL_SIZE / s.texture.height);
                s.x = Math.round((SYMBOL_SIZE - s.width) / 2);
            }
        }
    }
}