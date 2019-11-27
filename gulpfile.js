var gulp              =   require('gulp');
var browserSync       =   require('browser-sync').create();
var postcss           =   require('gulp-postcss');
var autoprefixer      =   require('autoprefixer');
var cssImport         =   require('postcss-import');
var customProperties  =   require('postcss-custom-properties');
var cleanCSS          =   require('gulp-clean-css');
var sequence          =   require('run-sequence');
var del               =   require('del');
var htmlmin           =   require('gulp-htmlmin');
var imagemin          =   require('gulp-imagemin');
var replace           =   require('gulp-replace');
var rename            =   require("gulp-rename");
var settings          =   require('./settings');


/* DEVELOPMENT SETUP
████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

/* Styles
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃*/
gulp.task('styles', function() {
  return gulp.src('./oneezy-css.css')
    .pipe(postcss([cssImport, customProperties, autoprefixer]))
    .on('error', (error) => console.log(error.toString()))
    
    // updates styles.css
    .pipe(rename("oneezy-css-bundled.css"))
    .pipe(gulp.dest("./")); 
});



/* Listen for changes...
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃*/
gulp.task('watch', function() {
  browserSync.init({
    notify: false,
    proxy: settings.urlToPreview,
    ghostMode: false
  });
  
  gulp.watch(['./**/*.html',], function() { 
    browserSync.reload();
  });

  gulp.watch(['./**/*.css'], ['waitForStyles']);
});


/* Reload styles...
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃*/
gulp.task('waitForStyles', ['styles'], function() {
  return gulp.src('./oneezy-css-bundled.css')
    .pipe(browserSync.stream());
});




/* TASK: gulp (start development server)
████████████████████████████████████████████████████████████████*/
gulp.task('default', ['watch']);

/* TASK: gulp dev (run dev build)
████████████████████████████████████████████████████████████████*/
gulp.task('dev', function() {
  sequence(['styles']);
});














/* PRODUCTION SETUP
████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████████*/

/* Styles
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃*/
gulp.task('stylesBuild', function() {
  return gulp.src('./oneezy-css-bundled.css')
    .pipe(cleanCSS())
    // .pipe(replace('Theme Name: Starter', 'Theme Name: Starter Build'))
    // .pipe(replace(`Theme Name: ${settings.themeName}`, `Theme Name: ${settings.themeName} Build`))
    .on('error', (error) => console.log(error.toString()))
    
    .pipe(rename("oneezy-css.min.css"))
    // updates styles.css in root theme folder
    .pipe(gulp.dest(settings.themeBuild));
});

/* Clean
▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃*/
gulp.task('clean', function() {
  return del([settings.themeBuild]);
});

/* PRODUCTION BUILD
████████████████████████████████████████████████████████████████*/
gulp.task('build', function() {
  sequence('clean', ['stylesBuild']);
});