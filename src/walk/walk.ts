import { FileFilter, evaluateFilePath } from './types/fileFilter';
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
            fileFilter?: FileFilter,
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
    
        var paths: string[] = []
    
        for (const dirent of readdirSync(root, { withFileTypes: true })) {
            const name = dirent.name
            const path = join(root, name)
    
            if (dirent.isFile()) {
                if (options.type != PathType.Directory && evaluateFilePath(path, options.fileFilter)) paths.push(path)
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