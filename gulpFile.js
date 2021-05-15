var gulp = require('gulp'),
    del = require('del'),
    imagemin = require('gulp-imagemin'),
    uglify = require('gulp-uglify'),
    usemin = require('gulp-usemin'),
    htmlmin = require('gulp-htmlmin'),
    rev = require('gulp-rev'),
    cleanCss = require('gulp-clean-css');
    

gulp.task('clean', function () {
    return del(['dist']);
});

gulp.task('copyfonts', function() {
    return gulp.src('./node_modules/font-awesome/fonts/**/*.{ttf,woff,eof,svg}*')
    .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('imagemin', function () {
    return gulp.src('img/**/*.{png,jpg,gif,jpeg,svg}')
    .pipe(imagemin({optimizationLevel:3, progressive:true, interlaced:true}))
    .pipe(gulp.dest('dist/img'))
});

gulp.task('usemin', function() {
    return gulp.src('./*.html')
      .pipe(usemin({
        css: [ rev ],
        html: [ function () {return htmlmin({ collapseWhitespace: true });} ],
        js: [ uglify, rev ],
        inlinejs: [ uglify ],
        inlinecss: [ cleanCss, 'concat' ]
      }))
      .pipe(gulp.dest('dist/'));
  });

gulp.task('build', gulp.series(['clean','copyfonts','imagemin', 'usemin']));