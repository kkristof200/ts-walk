import { PathType } from "./pathType";

export type WalkOptions = {
    type?: PathType
    allowedExtensions?: string[]
    recursive?: boolean
    absolutePaths?: boolean
}

export function solveOptions(options?: WalkOptions, type = PathType.Both): WalkOptions {
    type = (type != null) ? type : PathType.Both

    if (!options) {
        return {
            type: type,
            allowedExtensions: [],
            recursive: false,
            absolutePaths: true
        }
    }

    return {
        type: (options.type != null) ? options.type : type,
        allowedExtensions: options.allowedExtensions ?? [],
        recursive: (options.recursive != null) ? options.recursive : false,
        absolutePaths: (options.absolutePaths != null) ? options.absolutePaths : true
    }
}