# ts-walk

extract all file or directory/folder paths from a specified directory that justify a set of rules (file extension, etc)

## Walk options

Folder/Directory walk options:


| option-name | description | Default value |
| - | - | - |
| recursive | walk subfolders or no | false |
| absolutePaths | return absolute or relative paths | true (absolute paths) |

File walk options:


| option-name | description | Default value |
| - | - | - |
| recursive | walk subfolders or no | false |
| absolutePaths | return absolute or relative paths | true (absolute paths) |



## Usagebash

npm i ts-walk

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

// all dirs from current folder with full path (absolute_path)
console.log(Walk.dirs('./'))
// all dirs from current folder with relative path
console.log(Walk.dirs('./', { absolutePaths: false }))
// all dirs from current folder (recursive) with relative path
console.log(Walk.dirs('./', { recursive: true, absolutePaths: false }))
```
