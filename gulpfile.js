var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var open = require('gulp-open');
var inject = require('gulp-inject');
var runSequence = require('gulp-run-sequence');
var exec = require('child_process').exec;

// Custom configuration:
var config = {
    port: '9000',
    srcFolder: './src',
    singleFile: function (filename) {
        return this.srcFolder + '/'+ filename;
    },
    allFiles: function (filetype) {
        return this.srcFolder + '/**/*.' + filetype;
    }
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
    var target = gulp.src(config.singleFile('index.html'));
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src([config.allFiles('css'), config.allFiles('js')], {read: false});

    return target.pipe(inject(sources, { relative: true }))
        .pipe(gulp.dest(config.srcFolder));
});

// Starts a local server for live reload while editing:
gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: config.srcFolder
        },
        notify: false,
        open: false,
        port: config.port
    });
});

// HTML files:
gulp.task('html', function () {
    return gulp.src(config.allFiles('html'))
        .pipe(browserSync.stream());
});

// CSS files:
gulp.task('css', function () {
    return gulp.src(config.allFiles('css'))
        .pipe(browserSync.stream());
});

// JavaScript files:
gulp.task('js', function () {
    return gulp.src(config.allFiles('js'))
        .pipe(browserSync.stream());
});

// File watchers:
gulp.task('watch', function () {
    gulp.watch(config.allFiles('html'), ['html']);
    gulp.watch('css/**/*.css', {cwd: config.srcFolder}, ['css','inject']);
    gulp.watch('js/**/*.js', {cwd: config.srcFolder}, ['js','inject']);
});

// Open default browser (Chrome) automatically:
gulp.task('open', function(){
    gulp.src('./src/index.html')
        .pipe(open({uri: 'http://localhost:' + config.port + '/index.html'}));
});


gulp.task('build', function() {
    runSequence(['bower-installer','browser-sync'],['css','html','js'],'watch','inject','open');
});

// Default task (when executing 'gulp')
gulp.task('default', ['build']);