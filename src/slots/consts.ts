export const REEL_WIDTH = 160;
export const SYMBOL_SIZE = 150;

export function backout(amount: number){
    return (t: number) => (--t * t * ((amount + 1) * t + amount) + 1);
}