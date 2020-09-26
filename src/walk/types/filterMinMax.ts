export class FilterMinMax {
    readonly min: number
    readonly max: number

    isBetween(val: number): boolean { return val >= this.min && val <= this.max }
}