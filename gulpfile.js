var gulp = require('gulp'),
    terser = require('gulp-terser'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    babel = require('gulp-babel'),
    mode = require('gulp-mode')(),
    rename = require('gulp-rename');

var jsSrc = 'js/main.js';
var jsAll = 'js/**/*';
var javaClasses = 'target/classes/**/*';
var allStatic = 'src/main/resources/**/*';

const destroot = 'src/main/resources/static',
    destjs = destroot + '/js/';

function jsTask() {
    return gulp.src([jsSrc])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(mode.development(sourcemaps.init({ loadMaps: true })))
        .pipe(mode.development(terser()))
        .pipe(mode.production(terser({
            output: { comments: false },
            toplevel: true,
            compress: { drop_console: true }
        })))
        .pipe(rename('all.js'))
        .pipe(mode.development(sourcemaps.write('.')))
        .pipe(gulp.dest(destjs))
        .pipe(mode.development(browserSync.stream()));
}


function watch() {
    browserSync.init({
        open: false,
        ui: false,
        proxy: "localhost:8080/backoffice"
    });
    gulp.watch(jsAll, jsTask);
    gulp.watch([allStatic, javaClasses]).on('change', browserSync.reload);
}
exports.watch = watch;