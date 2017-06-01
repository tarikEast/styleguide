var gulp        = require('gulp');

var browserSync = require('browser-sync').create();
var ghPages     = require('gulp-gh-pages');
var kss         = require('kss');
var sass        = require('gulp-sass');
var sassLint    = require('gulp-sass-lint');
var sourcemaps  = require('gulp-sourcemaps');

// Static Server + watching scss/html files
gulp.task('serve', ['styleguide', 'sass', 'svg'], function() {
  browserSync.init({
    server: "./",
    port: 3001 // Rails is on 3000
  });

  gulp.watch("assets/**/*.svg", ['svg']);
  gulp.watch("assets/**/*.scss", ['styleguide', 'sass']);
  gulp.watch("assets/**/*.md").on('change', browserSync.reload);
  gulp.watch("styleguide/*.html").on('change', browserSync.reload);
});

// // adds svgs

gulp.task('svg', function(){
  return gulp.src('./assets/**/*.svg')
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.stream()); 
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('./assets/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: ['./node_modules/normalize.css/']
  }).on('error', sass.logError))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.stream());
});

gulp.task('styleguide', function(cb) {
  kss({
    "css": ["../dist/stylesheets/styleguide.css", "stylesheets/styleguide.css"], // hack to deploy better
    "destination":  "styleguide",
    "source": ["assets"],
    "title": "Node Style Guide"
  }, cb);
});

gulp.task('lint', function () {
  gulp.src('./assets/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError())
});

gulp.task('deploy',  function() {
  return gulp.src(['./dist/**/*', './styleguide/**/*', './circle.yml'])
    .pipe(ghPages());
});

gulp.task('dist', ['styleguide', 'sass', 'svg']);

gulp.task('default', ['serve']);
