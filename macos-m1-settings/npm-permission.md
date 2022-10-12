
## NPM yarn install permission ERROR
```
$ npm install --global yarn
EACCESS: permission denied ...
```
<br/>

### Manually change npm's default directory
To minimize the chance of permissions errors, you can configure npm to use a different directory. In this example, you will create and use hidden directory in your home directory.

On the command line, in your home directory, create a directory for global installations:
```
mkdir ~/.npm-global
```

Configure npm to use the new directory path:
```
npm config set prefix '~/.npm-global'
```

In your preferred text editor, open or create a ~/.zshrc file and add this line:
```
vi ~/.zshrc
export PATH=~/.npm-global/bin:$PATH
source ~/.zshrc
```

<br/>

#### source
- https://stackoverflow.com/questions/49529696/yarn-error-eaccess-permission-denied-scandir-home-ubuntu-config-yarn-link
- https://docs.npmjs.com/resolving-eacces-permissions-errors-when-installing-packages-globally


<br/>
<hr/>

#### [issue] npm link error
```shell
$ npm install -g gulp@3.9.0
```
```shell
$ gulp -v
zsh: command not found: gulp
```
```shell
$ npm config set prefix /usr/local
$ npm link gulp

npm ERR! code EACCES
npm ERR! syscall mkdir
npm ERR! path /usr/local/lib/node_modules/gulp
npm ERR! errno -13
npm ERR! Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/gulp'
npm ERR!  [Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/gulp'] {
npm ERR!   errno: -13,
npm ERR!   code: 'EACCES',
npm ERR!   syscall: 'mkdir',
npm ERR!   path: '/usr/local/lib/node_modules/gulp'
npm ERR! }
npm ERR!
npm ERR! The operation was rejected by your operating system.
npm ERR! It is likely you do not have the permissions to access this file as the current user
npm ERR!
npm ERR! If you believe this might be a permissions issue, please double-check the
npm ERR! permissions of the file and its containing directories, or try running
npm ERR! the command again as root/Administrator.
```

##### [solve]
```shell
$ sudo chown -R $USER /usr/local/lib/node_modules
```
```shell
$ gulp -v
CLI version: 2.3.0
Local version: 4.0.2
```
https://stackoverflow.com/questions/48910876/error-eacces-permission-denied-access-usr-local-lib-node-modules

<br/>