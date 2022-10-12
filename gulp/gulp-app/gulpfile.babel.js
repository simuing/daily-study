import gulp from 'gulp';
import gpug from 'gulp-pug';
import { deleteAsync } from 'del';

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
