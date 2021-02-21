'use strict';

const del = require('del');
const gulp = require('gulp');
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const sourcemaps = require('gulp-sourcemaps');
const minimist = require('minimist');
const gulpif = require('gulp-if');
const sass = require('gulp-sass');
sass.compiler = require('sass');
const Fiber = require('fibers');
const notify = require('gulp-notify');
const plumber = require('gulp-plumber');
const kroket = require('kroket');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const browserSync = require('browser-sync');

browserSync.create();

const options = minimist(process.argv.slice(2));
const isProduction = options.env && options.env === 'production';

const config = {
    src: {
        sass: './resources/scss/**/*.scss',
        img: ['./resources/img/**/*'],
        fonts: ['./resources/fonts/**/*'],
    },
    dist: {
        base: './public/files',
        css: './public/files/css',
        img: './public/files/img',
        fonts: './public/files/fonts',
    },
};


// Clean
function clean(done) {
    del(`${config.dist.base}/**/*`);
    done();
}

// Compile CSS
function css() {
    const onError = (err) => {
        notify.onError({
            title: 'SCSS Error',
            message: '<%= error.message %>',
        })(err);

        this.emit('end');
    };

    del(`${config.dist.css}/**/*`);

    return gulp
        .src(config.src.sass)
        .pipe(plumber({ errorHandler: onError }))
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                outputStyle: 'expanded',
                fiber: Fiber,
            })
        )
        .pipe(sourcemaps.write())
        .pipe(gulpif(isProduction, postcss([autoprefixer(), cssnano()])))
        .pipe(gulp.dest(config.dist.css))
        .pipe(gulpif(!isProduction, browserSync.stream()))
        .pipe(notify({ title: 'SCSS', message: 'Sass compiled successfully!' }));
}

// Minify images
function minifyImages() {
    return gulp
        .src(config.src.img)
        .pipe(
            cache(
                imagemin(
                    [
                        imagemin.gifsicle({ interlaced: true }),
                        imagemin.mozjpeg({ progressive: true }),
                        imagemin.optipng({ optimizationLevel: 7 }),
                        imagemin.svgo({
                            plugins: [
                                { removeViewBox: false },
                                { removeUselessStrokeAndFill: false },
                                { sortAttrs: true },
                                { removeDimensions: true },
                                { removeTitle: true },
                                { cleanupIDs: false },
                            ],
                        }),
                    ],
                    {
                        verbose: true,
                    }
                )
            )
        )
        .pipe(gulp.dest(config.dist.img))
        .pipe(gulpif(!isProduction, browserSync.stream()));
}

// Run Kroket
function runKroket(done) {
    kroket();
    done();
}

// Copy fonts
function copyFonts() {
    return gulp.src(config.src.fonts).pipe(gulp.dest(config.dist.fonts));
}

// Run server
function watch() {
    if (options.url) {
        browserSync.init({
            proxy: options.url,
            notify: false,
            https: true,
        });
    }

    gulp.watch(config.src.fonts, copyFonts);
    gulp.watch(config.src.img, minifyImages);
    gulp.watch(config.src.sass, css);
    gulp.watch('./kroket.config.js', runKroket);
}

// Tasks
gulp.task(
    'default',
    gulp.series(clean, copyFonts, minifyImages, runKroket, gulp.parallel(css), watch)
);
gulp.task('build', gulp.series(clean, runKroket, gulp.parallel(css),  copyFonts, minifyImages));
