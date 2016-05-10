var gulp    = require('gulp');
var sass    = require('gulp-sass');
var watch   = require('gulp-watch');

gulp.task('default', ['styles', 'html', 'watch']);

gulp.task('styles', function() {
  return gulp.src('./src/styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dest/styles/'));
});

gulp.task('html', function() {
  return gulp.src('./src/*.html')
  .pipe( gulp.dest('./dest'));
});

gulp.task('watch', function() {
  gulp.watch('./src/*.html', ['html']);
  gulp.watch('./src/styles/*.scss', ['styles']);
});
