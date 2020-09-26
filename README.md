# ts-walk
Extract all file or directory/folder paths from a specified directory that justify a set of rules (file extension, etc)

## Install
```bash
npm i ts-walk
```

## Walk options

#### Folder/Directory walk options:
| option name | description | type | default value |
| - | - | - | - |
| recursive | walk subfolders or no | boolean | false |
| absolutePaths | return absolute or relative paths | boolean | true (absolute paths) |

#### File walk options:
| option name | description | type | default value |
| - | - | - | - |
| recursive | walk subfolders or no | boolean | false |
| absolutePaths | return absolute or relative paths | boolean | true (absolute paths) |
| fileFilter | filter the returned results | FileFilter | null (no filter) |

#### FileFilter options:
| option name | description | type | default value |
| - | - | - | - |
| allowedExtensions | the allowed extensions of the retrieved files | string[] | null (no filter) |
| sizeBytes | min and max last size (in bytes) of the returned results | FilterMinMax | null (no filter) |
| lastAccessedMs | min and max last access time time of the returned results | FilterMinMax | null (no filter) |
| lastModifiedMs | min and max last modification time time of the returned results | FilterMinMax | null (no filter) |
| createdMs | min and max creation time of the returned results | FilterMinMax | null (no filter) |


## Usage
```typescript
import { Walk } from 'ts-walk'

// all files from current folder with full path (absolute_path)
console.log(Walk.files('./'))
// all files from current folder with relative path
console.log(Walk.files('./', { absolutePaths: false }))
// all files from current folder (recursive) with relative path
console.log(Walk.files('./', { recursive: true, absolutePaths: false }))
// all .js and .ts files from current folder (recursive) with relative path
console.log(Walk.files('./', { recursive: true, absolutePaths: false, fileFilter: { allowedExtensions: ['js', 'ts'] }}))
// all .ts files (smaller, than 2000 bytes) from current folder with absolute path
console.log(Walk.files('./src', {
    fileFilter: {
        allowedExtensions: ['ts'],
        sizeBytes: { min: 0, max: 2000 }
        // lastAccessedMs: null,
        // lastModifiedMs: null,
        // createdMs: null
    }
}))

// all dirs from current folder with full path (absolute_path)
console.log(Walk.dirs('./'))
// all dirs from current folder with relative path
console.log(Walk.dirs('./', { absolutePaths: false }))
// all dirs from current folder (recursive) with relative path
console.log(Walk.dirs('./', { recursive: true, absolutePaths: false }))
```
