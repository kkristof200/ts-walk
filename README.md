# ts-walk

extract all file or directory/folder paths from a specified directory that justify a set of rules (file extension, recursive)

## Install

```bash
npm i ts-walk
```

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
console.log(Walk.files('./', { recursive: true, absolutePaths: false, allowedExtensions: ['js', 'ts'] }))

// all dirs from current folder with full path (absolute_path)
console.log(Walk.dirs('./'))
// all dirs from current folder with relative path
console.log(Walk.dirs('./', { absolutePaths: false }))
// all dirs from current folder (recursive) with relative path
console.log(Walk.dirs('./', { recursive: true, absolutePaths: false }))
```
