# Monorepos - A Beginner's Guide
https://www.udemy.com/course/monorepos-a-beginners-guide/

## Certificate
![Certificate of completion](./Certificate.png)
<br>

# Study Note

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
  },
  "scripts": {
    "start": "module-b"
  }
}
```

yarn start
```
$ cd monorepo-beginners
$ yarn install --force
$ yarn start
yarn run v1.22.19
$ module-b
/Users/air/development/repo/daily-study/monorepos/monorepo-beginners/node_modules/.bin/module-b: line 1: syntax error near unexpected token `'I am module b''
/Users/air/development/repo/daily-study/monorepos/monorepo-beginners/node_modules/.bin/module-b: line 1: `console.log('I am module b');'
error Command failed with exit code 2.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

add code `#!/usr/bin/env node` on the module-b/index.js
- This comment simply instruction to use node to interpret the files that we're asking it to run, and we only need to write this comment once at the very start

```javascript
#!/usr/bin/env node

console.log('I am module-b');
```

yarn start
```
$ yarn start
yarn run v1.22.19
$ module-b
I am module b
✨  Done in 0.69s.
```
<br/>

## No more cd

update module-a/package.json
```
$ cd monorepo-beginners/packages/module-a
```
```json
{
  "name": "module-a",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "lodash": "^4.17.21"
  },
  "scripts": {
    "start": "mdb",
    "build": "node ./index.js"
  }
}
```
move to monorepo-beginners
```
$ cd ../..
```
yarn build
```
$ yarn workspace module-a build
yarn workspace v1.22.19
yarn run v1.22.19
$ node ./index.js
I am module a
I am module b
✨  Done in 0.45s.
✨  Done in 0.59s.
```

Let's add a new dependency to module A by running yarn workspace, module A add react.
```
$ yarn workspace module-a add react
```
<br/>

## Yarn vs NPM vs PNPM

### corepack
```
Stability: 1 - Experimental
- node v16.9.0, v14.19.0
```

Corepack is an experimental tool to help with managing versions of your package managers. It exposes binary proxies for each supported package manager that, when called, will identify whatever package manager is configured for the current project, transparently install it if needed, and finally run it without requiring explicit user interactions.

#### This feature simplifies two core workflows:
- It eases new contributor onboarding, since they won't have to follow system-specific installation processes anymore just to have the package manager you want them to.
- It allows you to ensure that everyone in your team will use exactly the package manager version you intend them to, without them having to manually synchronize it each time you need to make an update.

#### corepack prepare
```
$ monorepo-beginners git:(main) ✗ node -v
v16.17.1
$ monorepo-beginners git:(main) ✗ npm -v
8.15.0
$ monorepo-beginners git:(main) ✗ corepack enable
$ monorepo-beginners git:(main) ✗ corepack prepare pnpm@7.6.0 --activate
Preparing pnpm@7.6.0 for immediate activation...
```

modify modules-b
index.js
```javascript
#!/usr/bin/env node

console.log('I am module b');
```

package.json
```json
{
  "name": "@monorepo-beginners/module-b",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "bin": {
    "mdb": "./index.js"
  },
  "scripts": {
    "build": "node ./index.js"
  }
}
```

##### modify modules-a
index.js
```javascript
console.log('I am module a');

require('@monorepo-beginners/module-b');
```
package.json
```json
{
  "name": "@monorepo-beginners/module-a",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "@monorepo-beginners/module-b": "^1.0.0"
  },
  "scripts": {
    "start": "mdb",
    "build": "node ./index.js"
  }
}
```

npm install
```
$ cd monorepo-beginners
$ npm install
```

install result check
```
monorepo-beginners
\_ node_modules
  \_ .bin
  \_ @monorepo-beginners
  \_ .package-lock.json
```

module-a run start
```
$ npm --workspace=@monorepo-beginners/module-a run start

> @monorepo-beginners/module-a@1.0.0 start
> mdb

I am module b
```

workspaces run build
```
$ npm --workspaces run build

> @monorepo-beginners/module-a@1.0.0 build
> node ./index.js

I am module a
I am module b

> @monorepo-beginners/module-b@1.0.0 build
> node ./index.js

I am module b
```

workspaces run start
```
npm --workspaces run start

> @monorepo-beginners/module-a@1.0.0 start
> mdb

I am module b
npm ERR! Lifecycle script `start` failed with error: 
npm ERR! Error: Missing script: "start"

Did you mean one of these?
    npm star # Mark your favorite packages
    npm stars # View packages marked as favorites

To see a list of scripts, run:
  npm run 
npm ERR!   in workspace: @monorepo-beginners/module-b@1.0.0 
npm ERR!   at location: /Users/air/development/repo/daily-study/monorepos/monorepo-beginners/packages/module-b 
```

workspaces run start (if present)
```
npm --workspaces --if-present run start

> @monorepo-beginners/module-a@1.0.0 start
> mdb

I am module b
```

add react library in `module-a` and check the `package.json` file
```
$ npm --workspace=@monorepo-beginners/module-a add react -D

added 3 packages, and audited 8 packages in 510ms

found 0 vulnerabilities
```
```json
{
  "name": "@monorepo-beginners/module-a",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "@monorepo-beginners/module-b": "^1.0.0"
  },
  "scripts": {
    "start": "mdb",
    "build": "node ./index.js"
  },
  "devDependencies": {
    "react": "^18.2.0" // (new)
  }
}
```

add nohoist in `package.json`
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
      "**/react" // (new)
    ]
  },
  "scripts": {
    "start": "module-b"
  }
}
```

npm install and node_modules check
```
$ npm install
```
```
monorepo-beginners/node_modules
  \_ .bin
  \_ @monorepo-biginners
  \_ js-tokens
  \_ loose-envify
  \_ react
  \_ package-lock-json
```

NPM currently does not support the `nohoist` feature.

yarn install and node_modules check
```
$ yarn install
```
```
monorepo-beginners/node_modules
  \_ .bin
  \_ @monorepo-biginners
  \_ js-tokens
  \_ loose-envify
  \_ .yarn-integrity
```
```
monorepo-beginners/packages/module-a
  \_ node_modules (new)
  \_ index.js
  \_ package.json
```

When using `nohoist`, different versions of libraries can be used for each module.

<br/>

### PNPM

add pnpm-workspace.yaml file in project
```
monorepo-beginners
\_ packages
\_ package.json
\_ pnpm-workspace.yaml (new)
\_ README.md
```
```yaml
packages:
  - packages/*
```

pnpm isntall
```
$ pnpm install
Scope: all 3 workspace projects
Lockfile is up-to-date, resolution step is skipped
Packages: +5
+++++
Packages are hard linked from the content-addressable store to the virtual store.
  Content-addressable store is at: /Users/air/Library/pnpm/store/v3
  Virtual store is at:             node_modules/.pnpm
Progress: resolved 5, reused 5, downloaded 0, added 5, done
```

```
monorepo-beginners
  \_ node_modules (new)
    \_ .pnpm
      \_ @monorepo-beginner+module-b@1.1.0
      \_ ...
      \_ lock.yaml
    \_ .modules.yaml
  \_ packages
  \_ package.json
  \_ pnpm-lock.yaml (new)
  \_ pnpm-workspace.yaml
  \_ README.md
```

update module-a/package.json
```json
{
  "name": "@monorepo-beginners/module-a",
  "version": "1.0.0",
  "main": "index.js",
  "license": "MIT",
  "dependencies": {
    "@monorepo-beginners/module-b": "workspace:*"
  },
  "scripts": {
    "start": "mdb",
    "build": "node ./index.js"
  },
  "devDependencies": {
    "react": "^18.2.0"
  }
}
```

pnpm install again
```
$ pnpm install
Scope: all 3 workspace projects
Packages: -2
--
Progress: resolved 1, reused 1, downloaded 0, added 0, done
```

pnpm run
```
$ pnpm -F "@monorepo-beginners/module-a" run start

> @monorepo-beginners/module-a@1.0.0 start /Users/air/development/repo/daily-study/monorepos/monorepo-beginners/packages/module-a
> mdb

I am module b
```
```
$ pnpm -F "@monorepo-beginners/module-a" -F "monorepo-beginners/module-b" run build
No projects matched the filters "monorepo-beginners/module-b" in "/Users/air/development/repo/daily-study/monorepos/monorepo-beginners"

> @monorepo-beginners/module-a@1.0.0 build /Users/air/development/repo/daily-study/monorepos/monorepo-beginners/packages/module-a
> node ./index.js

I am module a
I am module b
```

```
$ pnpm -F "@monorepo-beginners/*" run build
Scope: 2 of 3 workspace projects
packages/module-b build$ node ./index.js
│ I am module b
└─ Done in 33ms
packages/module-a build$ node ./index.js
│ I am module a
│ I am module b
└─ Done in 32ms
```

```
$ pnpm -F "@monorepo-beginners/*" run start
Scope: 2 of 3 workspace projects
packages/module-a start$ mdb
│ I am module b
└─ Done in 39ms
```

#### pnpm .npmrc
https://pnpm.io/npmrc

<br/>

## Lerna
Lerna is the original monorepo tool for TypeScript/JavaScript. It has been around for many years and is used by tens of thousands of projects, including React, Jest and Babel.

https://lerna.js.org/

<br/>

