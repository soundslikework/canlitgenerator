var gulp    = require('gulp');
var sass    = require('gulp-sass');
var watch   = require('gulp-watch');
var concat  = require('gulp-concat');
var uglify  = require('gulp-uglify');

gulp.task('default', ['styles', 'scripts', 'html', 'watch']);

gulp.task('styles', function() {
  return gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dest/styles/'));
});

gulp.task('scripts', function() {
  return gulp.src('./src/scripts/*.js')
    .pipe(concat('main.js'))
    .pipe(uglify())
    .pipe(gulp.dest('./dest/scripts/'));
});

gulp.task('html', function() {
  return gulp.src('./src/*.html')
  .pipe( gulp.dest('./dest'));
});

gulp.task('watch', function() {
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/scripts/*.js', ['scripts']);
  gulp.watch('./src/styles/*.scss', ['styles']);
});
