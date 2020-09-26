export type FilterMinMax = {
    min?: number
    max?: number
}

export function evaluateMinMax(val: number, filter: FilterMinMax) {
    return filter ? (!filter.min || val >= filter.min) && (!filter.max || val <= filter.max) : true
}