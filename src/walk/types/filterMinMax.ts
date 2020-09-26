export type FilterMinMax = {
    min: number
    max: number
}

export function evaluateMinMax(val: number, filter: FilterMinMax) {
    return filter ? val >= filter.min && val <= filter.max : true
}