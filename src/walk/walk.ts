import { WalkOptions, solveOptions } from './types/walkOptions';
import { PathType } from './types/pathType';
import { join, resolve, isAbsolute } from 'path'
import { readdirSync, statSync } from 'fs'

export class Walk {
    static dirs(
        root: string,
        options?: {
            recursive?: boolean,
            absolutePaths?: boolean
        }
    ) {
        return this.walk(root, solveOptions(options, PathType.Directory))
    }
    
    static files(
        root: string,
        options?: {
            fileFilter: {
                allowedExtensions: null,
                size: null,
                lastAccessedMs: null,
                lastModifiedMs: null,
                createdMs: null
            },
            recursive?: boolean,
            absolutePaths?: boolean
        }
    ) {
        return this.walk(root, solveOptions(options, PathType.File))
    }
    
    static walk(
        root: string,
        options?: WalkOptions
    ): string[] {
        options = solveOptions(options)
    
        if (options.absolutePaths && !isAbsolute(root)) root = resolve(root)
    
        if (options.fileFilter.allowedExtensions) {
            if (options.fileFilter.allowedExtensions.length > 0) {
                var _allowedExtensions: string[] = []
    
                for (var ext of options.fileFilter.allowedExtensions) {
                    _allowedExtensions.push(ext.startsWith('.') || ext.length == 0 ? ext : '.' + ext)
                }
    
                options.fileFilter.allowedExtensions = _allowedExtensions
            } else { options.fileFilter.allowedExtensions = null }
        }
    
        var paths: string[] = []
    
        for (const dirent of readdirSync(root, { withFileTypes: true })) {
            const name = dirent.name
            const path = join(root, name)
    
            if (dirent.isFile()) {
                if (options.type != PathType.Directory) {
                    var shouldAdd = false
    
                    if (options.fileFilter.allowedExtensions) {
                        for (const ext of options.fileFilter.allowedExtensions) {    
                            if (name.endsWith(ext)) {
                                shouldAdd = true
    
                                break
                            }
                        }
                    } else { shouldAdd = true }

                    if (shouldAdd
                        && (
                            options.fileFilter.sizeBytes
                            ||
                            options.fileFilter.lastAccessedMs
                            ||
                            options.fileFilter.lastModifiedMs
                            ||
                            options.fileFilter.createdMs
                        )
                    ) {
                        const stats = statSync(path)

                        if (
                            (options.fileFilter.sizeBytes && !options.fileFilter.sizeBytes.isBetween(stats.size))
                            ||
                            (options.fileFilter.lastAccessedMs && !options.fileFilter.sizeBytes.isBetween(stats.atimeMs))
                            ||
                            (options.fileFilter.lastModifiedMs && !options.fileFilter.sizeBytes.isBetween(stats.mtimeMs))
                            ||
                            (options.fileFilter.createdMs && !options.fileFilter.sizeBytes.isBetween(stats.birthtimeMs))
                        ) {
                            shouldAdd = false
                        }
                    }
    
                    if (shouldAdd) paths.push(path)
                }
            } if (dirent.isDirectory()) {
                if (options.type != PathType.File) paths.push(path)
    
                if (options.recursive) {
                    for (const _path of this.walk(path, options)) {
                        paths.push(_path)
                    }
                }
            }
        }
    
        return paths
    }
}