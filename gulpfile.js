const gulp      = require('gulp');
const connect   = require('gulp-connect');
const open      = require('gulp-open');

const configs = {
    paths: {
        app: {
            html: './app/*.html',
            css: './app/css/*.css',
            images: './app/images/*.png'
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

gulp.task('css', () => {
    return gulp.src(configs.paths.app.css)
        .pipe(gulp.dest(configs.paths.dist))
        .pipe(connect.reload())
});

gulp.task('images', () => {
    return gulp.src(configs.paths.app.images)
        .pipe(gulp.dest('dist/images'));
});

gulp.task('open', () => {
    gulp.src('dist/index.html')
        .pipe(open({ uri: 'http://localhost:3001' }))
});

gulp.task('watch', () => {
    gulp.watch(configs.paths.app.html, gulp.series('html'));
    gulp.watch(configs.paths.app.css, gulp.series('css'));
    gulp.watch(configs.paths.app.images, gulp.series('images'));
});


gulp.task('default', gulp.parallel('html', 'css', 'images', 'connect', 'open', 'watch' ));