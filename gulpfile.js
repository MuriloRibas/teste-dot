const gulp      = require('gulp');
const connect   = require('gulp-connect');
const open      = require('gulp-open');

const configs = {
    paths: {
        app: {
            html: './app/*.html'
        },
        dist: './dist'
    }
}

gulp.task('connect', () => {
    connect.server({
        root: 'dist',
        port: 3001,
        livereload: true
    })
});

gulp.task('html', () => {
    return gulp.src(configs.paths.app.html)
        .pipe(gulp.dest(configs.paths.dist))
        .pipe(connect.reload())
});

gulp.task('open', () => {
    gulp.src('dist/index.html')
        .pipe(open({ uri: 'http://localhost:3001' }))
});

gulp.task('watch', () => {
    gulp.watch(configs.paths.app.html, gulp.series('html'));

});


gulp.task('default', gulp.parallel('html', 'connect', 'open', 'watch' ));