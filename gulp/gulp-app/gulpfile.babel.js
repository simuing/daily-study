import gulp from 'gulp';
import gpug from 'gulp-pug';
import { deleteAsync } from 'del';
import ws from 'gulp-webserver';
import image from "gulp-image";
import sass from "gulp-sass";
import autop from "gulp-autoprefixer";
import miniCSS from "gulp-csso";

const routes = {
  pug: {
    watch: "src/**/*.pug",
    src: "src/*.pug",
    dest: "build"
  },
  img: {
    src: "src/img/*",
    dest: "build/img"
  },
  sass: {
    src: "src/scss/styles.scss",
    dest: "build/css"
  }
}

export const pug = () =>
  gulp
    .src(routes.pug.src)
    .pipe(gpug())
    .pipe(gulp.dest(routes.pug.dest));

const clean = await deleteAsync(["build", "public"]);

const webserver = gulp.src("build").pipe(ws({ livereload: true, open: true }));

const img = () =>
  gulp
    .src(routes.img.src)
    .pipe(image())
    .pipe(gulp.dest(routes.img.dest));

const styles = () =>
  gulp
    .src(routes.scss.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(autop({ bbrowsers: ["last 2 versions"] }))
    .pipe(gulp.dest(routes.scss.dest))
    .pipe(miniCSS());

const watch = () => {
  gulp.watch(routes.pug.watch, pug);
  gulp.watch(routes.img.src, img);
  gulp.watch(routes.scss.watch, styles);
};

const prepare = gulp.series([clean, img]);

const assets = gulp.series([pug, styles]);

const live = gulp.parallel([webserver, watch]);

export const dev = gulp.series([prepare, assets, live]);
