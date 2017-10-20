////////////////////////////////////////////////////
// gulp module
////////////////////////////////////////////////////
const gulp = require('gulp');
const autoprefixer = require('gulp-autoprefixer'); // ベンダープレフィックス
const plumber = require('gulp-plumber'); // エラーで止めない
const sassGlob = require('gulp-sass-glob'); // sass-glob
const sass = require('gulp-sass'); // sass
////////////////////////////////////////////////////


// scss
gulp.task('sass', function() {
  return gulp.src('/root/src/scss/style.scss')
    .pipe(plumber({
      errorHandler: function(err) {
        console.log(err.messageFormatted);
        // notify_func(err)
        this.emit('end');
      }
    }))
    .pipe(sassGlob())
    .pipe(sass({
      // outputStyle: 'compressed'
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('/root/dist/css'))
});

gulp.task('html', function() {
  return gulp.src('/root/src/*.html')
    .pipe(gulp.dest('/root/dist'))
})
