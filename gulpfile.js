'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var open = require('gulp-open');
var inject = require('gulp-inject');
var runSequence = require('gulp-run-sequence');
var exec = require('child_process').exec;
var sass = require('gulp-sass');
var clean = require('gulp-clean');

// Custom configuration:
var c = {
    port: '9000',
    srcFolder: './src',
    buildFolder: './build',
    mainStyleSheet: '/main.sass'
};
c.src = {
    'html': c.srcFolder + '/html',
    'css': c.srcFolder + '/css',
    'js': c.srcFolder + '/js',
    'lib': c.srcFolder + '/lib'
};
c.build = {
    'html': c.buildFolder + '/html',
    'css': c.buildFolder + '/css',
    'js': c.buildFolder + '/js',
    'lib': c.buildFolder + '/lib'
};



// Executes 'bower-installer':
//  Is better than 'bower install' because it also copies the important files (e.g. angular.js, bootstrap.css) from bower_components to the src-folder
//  Important files are defined inside bower.json under "install"
//  bower-installer needs to be installed: 'npm install bower-installer -g'
gulp.task('bower-installer', function (cb) {
    exec('bower-installer', function (err, stdout, stderr) {
        console.log(stdout);
        console.log(stderr);
        cb(err);
    });
});

// Injects js- and css-links into index.html
gulp.task('inject', function () {
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src([//c.build.lib + '/**/*.css',
                            c.build.lib + '/**/*.js',
                            c.build.css + '/**/*.css',
                            c.build.js + '/**/*.js'], {read: false});

    return gulp.src(c.build.html + '/index.html')
        .pipe(inject(sources, { relative: true }))
        .pipe(browserSync.stream())
        .pipe(gulp.dest(c.build.html));
});

// Starts a local server for live reload while editing:
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: c.buildFolder
        },
        notify: false,
        open: false,
        port: c.port
    });
});

// HTML files:
gulp.task('html', function () {
    return gulp.src(c.src.html + '/**/*.html')
        .pipe(gulp.dest(c.build.html));
});

// CSS files:
gulp.task('css', function () {
    return gulp.src(c.src.css + '/**/*.css')
        .pipe(gulp.dest(c.build.css));
});

// SASS files:
gulp.task('sass', function () {
    return gulp.src(c.src.css + c.mainStyleSheet)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(c.build.css));
});

// SCSS files:
gulp.task('scss', function () {
    return gulp.src(c.src.css + c.mainStyleSheet)
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(c.build.css));
});

// JavaScript files:
gulp.task('js', function () {
    return gulp.src(c.src.js + '/**/*.js')
        .pipe(gulp.dest(c.build.js));
});

// Bower packages files:
gulp.task('lib', function () {
    return gulp.src(c.src.lib + '/**/*.*')
        .pipe(gulp.dest(c.build.lib));
});


// File watchers:
gulp.task('watch', function () {
    // HTML:
    gulp.watch(c.src.html + '/**/*.html', ['htmlBuild']);

    // CSS:
    gulp.watch('css/**/*.css', {cwd: c.srcFolder}, ['cssBuild']);
    gulp.watch('css/**/*.sass', {cwd: c.srcFolder}, ['sassBuild']);
    gulp.watch('css/**/*.scss', {cwd: c.srcFolder}, ['scssBuild']);

    // JavaScript:
    gulp.watch('js/**/*.js', {cwd: c.srcFolder}, ['jsBuild']);
});

gulp.task('htmlBuild', function () {
    runSequence('html','inject');
});
gulp.task('cssBuild', function () {
    runSequence('css','inject');
});
gulp.task('sassBuild', function () {
    runSequence('sass','inject');
});
gulp.task('scssBuild', function () {
    runSequence('scss','inject');
});
gulp.task('jsBuild', function () {
    runSequence('js','inject');
});


// Open default browser (Chrome) automatically:
gulp.task('open', function(){
    gulp.src(c.build.html + '/index.html')
        .pipe(open({uri: 'http://localhost:' + c.port + '/html/index.html'}));
});

// Delete build and src/lib folders:
gulp.task('clean', function () {
    return gulp.src([c.buildFolder, c.src.lib], {read: false})
        .pipe(clean());
});

// Execute tasks strictly in sequence (tasks inside of arrays are executed concurrently)
gulp.task('build', function() {
    runSequence('clean',['bower-installer','browser-sync'],['html','css','js','lib'],['sass','scss'],'watch','inject','open');
});

// Default task (when executing 'gulp')
gulp.task('default', ['build']);