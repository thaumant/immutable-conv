let gulp  = require('gulp'),
    babel = require('gulp-babel'),
    mocha = require('gulp-mocha'),
    del   = require('del')


gulp.task('clean:dist', (cb) => { del(['dist'], cb) })

gulp.task('clean:tests', (cb) => { del(['tests_compiled'], cb) })

gulp.task('clean', ['clean:dist', 'clean:tests'])

gulp.task('build:dist', ['clean'], () =>
    gulp.src('src/**/*.js')
        .pipe(babel({blacklist: ["spec.functionName"]}))
        .pipe(gulp.dest('dist')))

gulp.task('build:tests', ['clean'], () =>
    gulp.src('tests/*.js')
        .pipe(babel({blacklist: ["spec.functionName"]}))
        .pipe(gulp.dest('tests_compiled')))

gulp.task('build', ['build:dist', 'build:tests'])


gulp.task('default', ['clean', 'build'])
