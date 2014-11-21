var gulp = require('gulp');
var uglify = require('gulp-uglifyjs');
var replace = require('gulp-replace');
var rename = require('gulp-rename');
var sequence = require('run-sequence');

gulp.task('js', function() {
  return gulp
    .src([
        'vendor/bower_components/jquery/dist/jquery.js'
      , 'vendor/bower_components/module/module.js'
      , 'vendor/bower_components/module-component/component.js'
    ])
    .pipe(uglify('application.js', {outSourceMap: true, sourceMapIncludeSources: true}))
    .pipe(replace(/sourceMappingURL=application.js.map/, "sourceMappingURL=<%= asset_url('application.js.map') %>"))
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

gulp.task('default', function(callback){
  sequence('js', 'rename', callback);
});
