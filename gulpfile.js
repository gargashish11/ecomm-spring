//common requirements
var gulp = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create(),
    mode = require('gulp-mode')();

//requirements for js
var terser = require('gulp-terser'),
    webpack = require('webpack-stream'),
    babel = require('gulp-babel'),
    rename = require('gulp-rename');

//requirements for css
var sass = require('gulp-sass')(require('sass')),
    concat = require('gulp-concat'),
    postcss = require('gulp-postcss'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('cssnano');


// common paths
var npmroot = 'node_modules';
var javaClasses = 'target/classes/**/*';
var destroot = 'src/main/resources/static';
var allStatic = 'src/main/resources/**/*',
    npmjq = npmroot + '/jquery/dist/jquery.min.js',
    npmBsTable = npmroot + '/bootstrap-table/dist/bootstrap-table.min.js';

// js paths
var jsSrc = 'js/main.js';
var jsAll = 'js/**/*';

// css paths
var cssSRC = 'css/create-user-form.css',
    npmBsTablecss = npmroot + '/bootstrap-table/dist/bootstrap-table.min.css';


var destjs = destroot + '/js/',
    destcss = destroot + '/css/';

function jsTask() {
    return gulp.src([npmjq, npmBsTable, jsSrc])
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(mode.development(webpack({
            mode: 'development',
            devtool: 'inline-source-map'
        })))
        .pipe(mode.production(webpack({
            mode: 'production'
        })))
        .pipe(mode.development(sourcemaps.init({ loadMaps: true })))
        .pipe(rename('all.js'))
        .pipe(mode.development(terser()))
        .pipe(mode.production(terser({
            output: { comments: false },
            toplevel: true,
            compress: { drop_console: true }
        })))
        .pipe(mode.development(sourcemaps.write('.')))
        .pipe(gulp.dest(destjs))
        .pipe(mode.development(browserSync.stream()));
}

function cssTask() {
    return gulp.src([npmBsTablecss, cssSRC])
        .pipe(sass({
            outputStyle: 'compressed'
        })
            .on('error', sass.logError))
        .pipe(sourcemaps.init())
        .pipe(concat('style.min.css'))
        //not all plugins work with postcss only the ones mentioned in their documentation
        .pipe(postcss([
            autoprefixer(),
            cssnano({
                preset: ['default', {
                    discardComments: {
                        removeAll: true,
                    },
                }]
            })
        ]))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(destcss))
        .pipe(mode.development(browserSync.stream()));
}

function watch() {
    browserSync.init({
        open: false,
        ui: false,
        proxy: "localhost:8080/backoffice"
    });
    gulp.watch(jsAll, jsTask);
    gulp.watch(cssSRC, cssTask);
    gulp.watch([allStatic, javaClasses]).on('change', browserSync.reload);
}

exports.watch = watch;