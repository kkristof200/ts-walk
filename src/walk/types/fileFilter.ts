import { FilterMinMax, evaluateMinMax } from './filterMinMax';
import { statSync } from 'fs'

export type FileFilter = {
    allowedExtensions?: string[]
    sizeBytes?: FilterMinMax
    lastAccessedMs?: FilterMinMax
    lastModifiedMs?: FilterMinMax
    createdMs?: FilterMinMax
}

export function evaluateFilePath(filePath: string, filter: FileFilter): boolean {
    if (!filter) return true

    var shouldAdd = false

    if (filter.allowedExtensions) {
        for (const ext of filter.allowedExtensions) {    
            if (filePath.endsWith(ext)) {
                shouldAdd = true

                break
            }
        }
    } else { shouldAdd = true }

    if (shouldAdd && (filter.sizeBytes || filter.lastAccessedMs || filter.lastModifiedMs || filter.createdMs)) {
        const stats = statSync(filePath)

        if (
            (!evaluateMinMax(stats.size, filter.sizeBytes))
            ||
            (!evaluateMinMax(stats.atimeMs, filter.lastAccessedMs))
            ||
            (!evaluateMinMax(stats.mtimeMs, filter.lastModifiedMs))
            ||
            (!evaluateMinMax(stats.birthtimeMs, filter.createdMs))
        ) {
            shouldAdd = false
        }
    }

    return shouldAdd
}

export function solveFileFilter(filter?: FileFilter) {
    if (!filter) return defaultFileFilter()
    
    return {
        allowedExtensions: normalizedExtensions(filter.allowedExtensions),
        sizeBytes: filter.sizeBytes ?? null,
        lastAccessedMs: filter.lastAccessedMs ?? null,
        lastModifiedMs: filter.lastModifiedMs ?? null,
        createdMs: filter.createdMs ?? null
    }
}

export function defaultFileFilter(): FileFilter {
    return {
        allowedExtensions: null,
        sizeBytes: null,
        lastAccessedMs: null,
        lastModifiedMs: null,
        createdMs: null
    }
}

function normalizedExtensions(extensions: string[]) {
    if (!extensions || extensions.length == 0) return null

    var _extensions: string[] = []
    
    for (var ext of extensions) {
        _extensions.push(ext.startsWith('.') || ext.length == 0 ? ext : '.' + ext)
    }

    return _extensions
}