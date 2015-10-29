const gulp = require('gulp');
const nightwatch = require('gulp-nightwatch');
const server = require('gulp-develop-server');

const Karma = require('karma').Server;

// ---------------------------------------------------------------------------
// starting the Dev Server
// ---------------------------------------------------------------------------
gulp.task('devserver', function (done) {
  if (server.running) {
    done();
    return;
  }

  server.listen({
    path: __dirname + '/devServer.js',
    env: { 'NODE_ENV': 'development' }
  }, function() {
    server.running = true;
    done()
  })
})

// ---------------------------------------------------------------------------
// TESTING
// ---------------------------------------------------------------------------

// run all unit tests once
gulp.task('test:unit', function (done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
    singleRun: true,
    reporters: [
      'spec',
      'coverage'
    ]
  }, done).start();
});

// run all unit tests and watch them for changes
gulp.task('tdd', function (done) {
  new Karma({
    configFile: __dirname + '/karma.conf.js',
    reporters: [
      'dots',
      'coverage'
    ]
  }, done).start();
});

// run all acceptance tests
gulp.task('test:nightwatch', ['devserver'], function() {
  return gulp.src('')
  .pipe(nightwatch({
    configFile: 'nightwatch.json',
    cliArgs: ['--env chrome']
  }));
});


// ---------------------------------------------------------------------------
// Watching files
// ---------------------------------------------------------------------------
gulp.task('watch', function() {
  // when src files change, run full acceptance suite
  gulp.watch(['src/**/*'], ['test:nightwatch'])

  // when devServer or webpack change, restart the server
  gulp.watch(['devServer.js', 'webpack.config.js'], server.restart)

  // when acceptance test changes, rerun that test
  gulp.watch('test/browser/**/*.js', function(e) {
    gulp
      .src(e.path)
      .pipe(nightwatch({
        configFile: 'nightwatch.json',
        cliArgs: {
          env: 'chrome',
          test: e.path
        }
      }));
  })
})


// ---------------------------------------------------------------------------
// Default Task
// ---------------------------------------------------------------------------
//
// Includes
// - tdd unit tests,
// - devserver,
// - acceptance tests
// - file watching
// ---------------------------------------------------------------------------
gulp.task('default', function() {
  gulp.start('tdd', 'devserver', 'test:nightwatch', 'watch');
});
