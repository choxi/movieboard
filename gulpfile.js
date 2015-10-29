var gulp = require('gulp');
var nightwatch = require('gulp-nightwatch');
var nodemon = require('gulp-nodemon');

var Karma = require('karma').Server;

gulp.task('test', function (done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true
  }, done).start();
});

gulp.task('tdd', function (done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
  }, done).start();
});

gulp.task('devserver', function () {
  nodemon({
    script: 'devServer.js',
    ignore: ["build/*"],
    env: { 'NODE_ENV': 'development' }
  })
})

gulp.task('nightwatch', ['devserver'], function() {
  return gulp.src('')
  .pipe(nightwatch({
    configFile: 'nightwatch.json',
    cliArgs: ['--env chrome']
  }));
});


gulp.task('watch', function() {
  gulp.watch('test/browser/**/*.js', ['nightwatch'])
})

gulp.task('default', function() {
  gulp.start('tdd', 'nightwatch', 'watch');
});
