var gulp = require('gulp');
var sass = require('gulp-sass');
var pug = require('gulp-pug');
var minifyCss = require('gulp-minify-css');

gulp.task('sass', function () {
    return gulp.src('src/styles/**/*.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(gulp.dest('app/css'))
});

gulp.task('pug', function () {
    return gulp.src('src/html/*.pug')
        .pipe(pug())
        .pipe(gulp.dest('app/'))
});

gulp.task('scripts',function () {
   return gulp.src('src/scripts/*.js')
       .pipe(gulp.dest('app/scripts'));
});

gulp.task('watch', ['sass','pug','scripts'], function () {
    gulp.watch('src/styles/**/*.scss', ['sass']);
    gulp.watch('src/html/*.pug', ['pug']);
    gulp.watch('src/scripts/*.js', ['scripts']);

});