var gulp = require('gulp');
var mocha = require('gulp-mocha');

var paths = {
  tests: 'test/**/*_test.js',
  scripts: 'app/**/*.js'
};

gulp.task('test', function () {
  process.env.NODE_ENV = 'test';

  return gulp.src(paths.tests, { read: false }).pipe(mocha({ reporter: 'spec', bail: true }));
});

gulp.task('watch', function() {
  gulp.watch([paths.scripts, paths.tests], ['test']);
});

gulp.task('tests', ['watch', 'test']);
