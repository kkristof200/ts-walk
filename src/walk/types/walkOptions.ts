import { FileFilter, solveFileFilter, defaultFileFilter } from './fileFilter';
import { PathType } from "./pathType";

export type WalkOptions = {
    type?: PathType
    recursive?: boolean
    absolutePaths?: boolean
    fileFilter?: FileFilter
}

export function solveOptions(options?: WalkOptions, type = PathType.Both): WalkOptions {
    type = (type != null) ? type : PathType.Both

    if (!options) return defaultOptions(type)

    return {
        type: (options.type != null) ? options.type : type,
        fileFilter: solveFileFilter(options.fileFilter),
        recursive: (options.recursive != null) ? options.recursive : false,
        absolutePaths: (options.absolutePaths != null) ? options.absolutePaths : true
    }
}

function defaultOptions(type = PathType.Both) {
    return {
        type: type,
        fileFilter: defaultFileFilter(),
        recursive: false,
        absolutePaths: true
    }
}