export type FilterMinMax = {
    min?: number
    max?: number
}

export function evaluateMinMax(val: number, filter: FilterMinMax) {
    return filter ? val >= (filter.min ?? 0) && val <= (filter.max ?? Number.MAX_SAFE_INTEGER) : true
}