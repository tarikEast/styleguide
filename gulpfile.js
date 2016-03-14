var gulp        = require('gulp');

var browserSync = require('browser-sync').create();
var ghPages     = require('gulp-gh-pages');
var kss         = require('kss');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');


// Static Server + watching scss/html files
gulp.task('serve', ['styleguide', 'sass'], function() {
  browserSync.init({
    server: "./"
  });

  gulp.watch("src/**/*.scss", ['styleguide', 'sass']);
  gulp.watch("src/**/*.md").on('change', browserSync.reload);
  gulp.watch("styleguide/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('./src/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass().on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.stream());
});

gulp.task('styleguide', function(cb) {
  kss({
    "css": ["../dist/styleguide.css", "styleguide.css"], // hack to deploy better
    "destination":  "styleguide",
    "source": ["src"],
    "title": "Node Style Guide"
  }, cb);
});

gulp.task('deploy',  function() {
  return gulp.src(['./dist/**/*', './styleguide/**/*'])
    .pipe(ghPages());
});

gulp.task('dist', ['styleguide', 'sass']);

gulp.task('default', ['serve']);

