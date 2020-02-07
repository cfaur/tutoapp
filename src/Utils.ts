export function range(min: number, max: number) {
    return Array.from({length: max - min +1}, (_,i) => min + i);
}