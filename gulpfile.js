var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var minifyCss = require('gulp-minify-css');

gulp.task('sass', function () {
    return gulp.src('src/styles/styles.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('app/css'))
});

gulp.task('pug', function () {
    return gulp.src('src/html/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('app/'))
});

gulp.task('watch', ['sass','pug'], function () {
    gulp.watch('src/styles/styles.scss', ['sass']);
    gulp.watch('src/html/index.pug', ['pug']);

});