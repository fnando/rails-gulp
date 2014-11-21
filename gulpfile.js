var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var del = require('del');
var sequence = require('run-sequence');
var watch = require('gulp-watch');

gulp.task('scripts', function() {
  return gulp
    .src([
        'vendor/bower_components/jquery/dist/jquery.js'
      , 'vendor/bower_components/module/module.js'
      , 'vendor/bower_components/module-component/component.js'
      , 'app/scripts/boot.js'
      , 'app/scripts/myapp/**/*.js'
    ])
    .pipe(uglify('application.js', {outSourceMap: true, sourceMapIncludeSources: true}))
    .pipe(replace('sourceMappingURL=application.js.map', "sourceMappingURL=<%= asset_url('application.js.map') %>"))
    .pipe(gulp.dest('app/assets/javascripts'))
  ;
});

gulp.task('rename', function(){
  return gulp
    .src('app/assets/javascripts/application.js')
    .pipe(rename('application.js.erb'))
    .pipe(gulp.dest('app/assets/javascripts'))
  ;
});

gulp.task('clean', function(callback){
  del(['app/assets/javascripts/application.js'], callback);
});

gulp.task('watch', function() {
  gulp.watch(['app/scripts/**/*', 'vendor/bower_components/**/*.js'], ['default']);
});

gulp.task('default', function(callback){
  sequence('scripts', 'rename', 'clean', callback);
});
