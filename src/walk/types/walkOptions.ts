import { FilterMinMax } from './filterMinMax';
import { PathType } from "./pathType";

export type WalkOptions = {
    type?: PathType
    recursive?: boolean
    absolutePaths?: boolean
    fileFilter?: {
        allowedExtensions?: string[],
        sizeBytes?: FilterMinMax,
        lastAccessedMs?: FilterMinMax,
        lastModifiedMs?: FilterMinMax,
        createdMs?: FilterMinMax,
    }
}

export function solveOptions(options?: WalkOptions, type = PathType.Both): WalkOptions {
    type = (type != null) ? type : PathType.Both

    if (!options) {
        return {
            type: type,
            fileFilter: {
                allowedExtensions: null,
                sizeBytes: null,
                lastAccessedMs: null,
                lastModifiedMs: null,
                createdMs: null
            },
            recursive: false,
            absolutePaths: true
        }
    }

    return {
        type: (options.type != null) ? options.type : type,
        fileFilter: options.fileFilter ?? {
            allowedExtensions: null,
            sizeBytes: null,
            lastAccessedMs: null,
            lastModifiedMs: null,
            createdMs: null
        },
        recursive: (options.recursive != null) ? options.recursive : false,
        absolutePaths: (options.absolutePaths != null) ? options.absolutePaths : true
    }
}