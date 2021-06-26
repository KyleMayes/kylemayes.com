const fs = require('fs');
const gulp = require('gulp');
const csso = require('gulp-csso');
const ejs = require('gulp-ejs');
const sass = require('gulp-sass')(require('sass'));

gulp.task('build:html', () => {
  return gulp.src('./source/index.html')
    .pipe(ejs(JSON.parse(fs.readFileSync('./source/index.json'))).on('error', console.error))
    .pipe(gulp.dest('./target'));
});

gulp.task('build:scss', () => {
  return gulp.src('./source/style.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(csso())
    .pipe(gulp.dest('./target'));
});

gulp.task('build:static', () => {
  return gulp.src('./static/**/*')
    .pipe(gulp.dest('./target/static'));
});

gulp.task('build', gulp.parallel('build:html', 'build:scss', 'build:static'));

function watch() {
  return gulp.watch('./source/**/*', gulp.series('build'));
}

gulp.task('watch', gulp.series('build', watch));
