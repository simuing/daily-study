# Monorepos - A Beginner's Guide
https://www.udemy.com/course/monorepos-a-beginners-guide/

## Monorepo
- An architectual solution for managing multiple applications and libraries
- Used by Google and Facebook
- Open Source projects like Babel, React and Jest

#### Mono Repository
```
Repository
  \_ Application-a
  \_ Application-b
  \_ Library-a
  \_ Library-b
```
<br/>

## The node_modules trick

#### Before use node_modules folder name

root
```
packages
  \_ module-a
    \_ index.js
    \_ package.json
  \_ module-b
    \_ index.js
    \_ package.json
```

packages/module-a
```javascript
console.log('I am module-a');

require('../module-b');
```

packages/module-b
```javascript
console.log('I am module-b');
```

node run
```
$ node packages/module-a
I am module a
I am module b
```
<br/>

#### After use node_modules name

rename
```
$ rename packages node_modules
```

update module-a's import path
```javascript
console.log('I am module-a');

require('module-b'); // update '../module-b' to 'module-b'
```

node run
```
$ node packages/module-a
I am module a
I am module b
```

<br/>

## Linking
https://classic.yarnpkg.com/en/docs/cli/link

### Symlink (Symbolic Link)
- A system shortcut to a file or directory
- MacOS, Linux and Windows support
- Available through NPM and Yarn

### Linking packages

link module-b
```
$ cd node_modules/module-b
$ yarn link
yarn link v1.22.19
success Registered "module-b".
info You can now run `yarn link "module-b"` in the projects where you want to use this package and it will be used instead.
✨  Done in 0.02s.
```

link module-a
```
$ cd node_modules/module-a
$ yarn link module-b
yarn link v1.22.19
success Using linked package for "module-b".
✨  Done in 0.02s.
```

If I refresh my direct review, I'll now see module-a folder has been created inside the module a directory and inside that node_modules is a folder called Module B, which has the same files.

```
packages
\_ module-a
  \_ node_modules    (new)
    \_ index.js      (new)
    \_ package.json  (new)
  \_ index.js
  \_ package.json
\_ module-b
  \_ index.js
  \_ package.json
```
<br/>

## Workspaces
- Monorepo package organisation System
- Automatic Symlinking and availability
- Optimised dependencies with hoisting

yarn install
```
$ cd monorepo-beginners
$ yarn init -y
```

```
monorepo-beginners
\_ packages
  \_ module-a
  \_ module-b
\_ package.json (new)
```

update package.json
```json
{
  "name": "monorepo-beginners",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "private": true,
  "workspaces": {
    "packages": [
      "packages/*"
    ]
  }
}
```

add .gitignore
```
/node_modules
```

yarn install
```
$ yarn install
```

```
monorepo-beginners
\_ node_modules (new)
  \_ module-a   (new)
  \_ module-b   (new)
\_ packages
  \_ module-a
  \_ module-b
\_ .gitignore
\_ package.json
```

node run
```
$ node packages/module-a
I am module a
I am module b
```

<br/>

## Hoisting

add lodash library
```
$ cd node_modules/module-b
$ yarn add lodash
```

```
monorepo-beginners
\_ node_modules
  \_ lodash     (new)
  \_ module-a
  \_ module-b
\_ packages
  \_ module-a
  \_ module-b
\_ .gitignore
\_ package.json
```

### nohoist
update monorepo-beginners/package.json
```json
{
  "name": "monorepo-beginners",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "private": true,
  "workspaces": {
    "packages": [
      "packages/*"
    ],
    "nohoist": [
      "**/lodash"
    ]
  }
}
```

node_modules remove and yarn install
(lodash folder)
```
monorepo-beginners
\_ node_modules
  \_ module-a
  \_ module-b
...
```
<br/>

## Scripts

update module-b's package.json
```json
{
  "name": "module-b",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "bin": "./index.js"
}
```

yarn install
```
$ yarn install --force
```

`yarn install --force`
This refetches all packages, even ones that were previously installed.

<br/>

```
monorepo-beginners
\_ node_modules
  \_ .bin      (new)
    \_ module-b
  \_ module-a
  \_ module-b
...
```

