export function range(min: number, max: number) {
    return Array.from({length: max - min +1}, (_,i) => min + i);
}

//min & max included
export function getRandomInt(min: number, max: number) {
    return min + Math.floor(Math.random() * (max - min + 1));
}

export enum PointAttribution {
    Tie,
    PlayerX,
    PlayerO
}

export const X_COLOR: string = "#daedf0"
export const O_COLOR: string = "#e6c138"