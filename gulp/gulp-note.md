## Gulp Introduction
**A toolkit to automate & enhance your workflow**
Leverage gulp and the flexibility of JavaScript to automate slow, repetitive workflows and compose them into efficient build pipelines.

- https://gulpjs.com/
- https://nomadcoders.co/gulp-for-beginners/lectures/1632


### Scaffolding Part One

Gulp install
```
$ yarn add gulp-cli -g
```

Create Sample Gulp App
```
/gulp-app
  /src
    /img
      ㄴlogo.svg
    /js
      ㄴmain.js
      ㄴutil.js
    /partrials
      ㄴheader.pug
      ㄴfooter.pug
    /scss
      ㄴ_reset.scss
      ㄴ_variable.scss
      ㄴstyles.scss
    /templetes
      ㄴlayout.pug
    ㄴindex.png
```

yarn init
```
$ yarn init
```

<br/>

### Scaffolding Part Two

update src/js/util.js
```javascript
export const random = max => Math.floor(Math.random() * max);
```

update src/js/main.js
```javascript
import { random } from './util';

const rOne = random(10);
const rTwo = random(20);

console.log(`${rOne} ${rTwo}`)
```

update src/templates/layout.pug
`html:5 => tab`
```pug
doctype html
html(lang="en")
  head
    meta(charset="UTF-8")
    meta(http-equiv="X-UA-Compatible", content="IE=edge")
    meta(name="viewport", content="width=device-width, initial-scale=1.0")
    link(rel="stylesheet", href="css/styles.css")
    title Super Gulp
  body 

    block content

    include ../partials/footer

    script(src="js/main.js")
```

update src/index.pug
```pug
extends templates/layout

block content
  img(src="img/logo.svg")
  h1 Awesome Minimalism
```

update src/partials/footer.pug
```pug
footer
  span I love Gulp
```

src/scss/_reset.scss
```
// copy and paste
// https://meyerweb.com/eric/tools/css/reset/
```

update src/scss/_variable.scss
```scss
$red: #ce4647;
```

update src/scss/styles.scss
```scss
@import './reset';
@import './variable';

body {
  background-color: $red;
}
```

<br/>

#### Create gulp file

/
```
$ touch gulpfile.js
```

yarn add gulp
```
$ yarn add gulp -D
```

package.json scripts
```json
{
  ...
  "scripts": {
    "dev": "gulp dev",
    "build": "gulp build"
  }
}
```

src/gulpfile.js
```javascript
import gulp from 'gulp';
```

<br/>

### Gulp + Babel

src/.babelrc
```json
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

gulpfile rename
```
src/gulpfile.js
to
src/gulpfile.babel.js
```

yarn add babel
```
$ yarn add @babel/{register,core} -D
```

<br/>

## Pug Compilation

#### Gulp Task part One

gulp-pug install
https://www.npmjs.com/package/gulp-pug
```
$ yarn add gulp-pug
```

update src/gulpfile.babel.js
```javascript
import gulp from 'gulp';
import gpug from 'gulp-pug';

const routes = {
  pug: {
    src: "src/**/*.pug",
    dest: "build"
  }
}

export const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

export const dev = gulp.series([pug]);
```

install del
```
$ yarn add del
```

update src/gulpfile.babel.js
```javascript
import gulp from 'gulp';
import gpug from 'gulp-pug';
import { deleteAsync } from 'del'; // new

const routes = {
  pug: {
    src: "src/*.pug",
    dest: "build"
  }
}

export const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

const clean = await deleteAsync(["build"]);

const prepare = gulp.series([clean]);

const assets = gulp.series([pug]);

export const dev = gulp.series([prepare, assets]);
```

update package.json
```json
{
  // ...
  "type": "module"
}
```

