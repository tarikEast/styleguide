var gulp        = require('gulp');

var browserSync = require('browser-sync').create();
var ghPages     = require('gulp-gh-pages');
var kss         = require('kss');
var sass        = require('gulp-sass');
var sassLint    = require('gulp-sass-lint');
var sourcemaps  = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

// Static Server + watching scss/html files
gulp.task('serve', ['styleguide', 'sass'], function() {
  browserSync.init({
    server: "./",
    port: 3001 // Rails is on 3000
  });

  gulp.watch("assets/**/*.scss", ['styleguide', 'sass']);
  gulp.watch("assets/**/*.md").on('change', browserSync.reload);
  gulp.watch("styleguide/*.html").on('change', browserSync.reload);
});

// Compile sass into CSS & auto-inject into browsers
gulp.task('sass', function() {
  return gulp.src('./assets/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({
    includePaths: ['./node_modules/normalize.css/']
  }).on('error', sass.logError))
  .pipe(autoprefixer())
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('./dist/'))
  .pipe(browserSync.stream());
});

gulp.task('styleguide', function(cb) {
  kss({
    "css": ["../dist/stylesheets/examples.css", "stylesheets/styleguide.css"], // hack to deploy better
    "destination":  "styleguide",
    "source": ["assets"],
    "template": ["custom-template"],
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

gulp.task('dist', ['styleguide', 'sass']);

gulp.task('default', ['serve']);

