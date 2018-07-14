const fs = require('fs');
const gulp = require('gulp');
const csso = require('gulp-csso');
const ejs = require('gulp-ejs');
const sass = require('gulp-sass');
const util = require('gulp-util');

gulp.task('build:html', () => {
  return gulp.src('./source/index.html')
    .pipe(ejs(JSON.parse(fs.readFileSync('./source/index.json'))).on('error', util.log))
    .pipe(gulp.dest('./target'));
});

gulp.task('build:scss', () => {
  return gulp.src('./source/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(gulp.dest('./target'));
});

gulp.task('build', ['build:html', 'build:scss']);

gulp.task('watch', ['build'], () => {
  return gulp.watch('./source/**/*', ['build']);
});
