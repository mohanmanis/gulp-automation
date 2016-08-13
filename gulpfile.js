/**
 * Created by manishmohan on 13/8/16.
 */
var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var browserify = require('browserify');
var watchify = require('watchify');
var browserSync = require('browser-sync').create();

function bundle (bundler) {
    return bundler
        .bundle()
        .on('error', function (e) {
            gutil.log(e.message);
        })
        .pipe(source('bundle.js'))
        .pipe(gulp.dest('./app/js/dist'))
        .pipe(browserSync.stream());
}
gulp.task('default',['watch']);
gulp.task('watch', function () {
    var watcher = watchify(browserify('./app/js/app.js', watchify.args));
    bundle(watcher);
    watcher.on('update', function () {
        bundle(watcher);
    });
    watcher.on('log', gutil.log);

    browserSync.init({
        server: './app',
        logFileChanges: false
    });
});

gulp.task('js', function () {
    return bundle(browserify('./app/js/app.js'));
});
