import gulp                  from 'gulp';
import sass                  from 'gulp-sass';
import sourcemaps            from 'gulp-sourcemaps';
import postcss               from 'gulp-postcss';
import autoprefixer          from 'autoprefixer';
import mqpacker              from 'css-mqpacker';
import config                from './config';
import csso                  from 'postcss-csso';
import cleanCSS              from 'gulp-clean-css';
import ext_replace           from 'gulp-ext-replace';
import cssbeautify           from 'gulp-cssbeautify';
import sortCSSmq             from 'sort-css-media-queries';
import sassInheritance       from 'gulp-sass-inheritance';
import cached                from 'gulp-cached';
import gulpif                from 'gulp-if';
import filter                from 'gulp-filter';
import wait                  from 'gulp-wait';
import base64                from 'gulp-base64';
import util                  from 'gulp-util';
import rename                from "gulp-rename";
import reportError           from './helpers/handle-errors';
import bourbon               from 'node-bourbon';

// CSS task
const processors = [
  autoprefixer({
    cascade: true
  }),
  mqpacker({
    sort: sortCSSmq
  }),
  // csso    //Перестало работать с sourcemaps
];

gulp.task('sass', () => gulp
  .src(config.source.sass + '/**/*.{sass,scss}')
  .pipe(gulpif(global.isWatching, cached('sass')))
  .pipe(sassInheritance({dir: config.source.sass}))
  .pipe(filter(function (file) {
    return !/\/_/.test(file.path) || !/^_/.test(file.relative);
  }))
  .pipe(sourcemaps.init())
  .pipe(wait(50))
  .pipe(sass.sync({
    outputStyle: config.production ? 'compressed' : 'expanded',
    includePaths: require('node-bourbon').with(config.source.sass)
  })
  .on('error', reportError))
  .pipe(postcss(processors))
  .pipe(base64({
    baseDir: config.source.root,
    extensions: ['svg', 'png', /\.jpg#datauri$/i],
    exclude:    [/\.server\.(com|net)\/dynamic\//, '--live.jpg'],
    maxImageSize: 8*1024,
    debug: true
  }))
  .pipe(cleanCSS()) //замена csso
  .pipe(config.production ? util.noop() : sourcemaps.write('/maps'))

  .pipe(gulp.dest(config.dist.styles))
  .pipe(rename({suffix: '.min'}))
  .pipe(gulp.dest(config.dist.styles))
  .pipe(ext_replace('css', '.min.css'))
  .pipe(cssbeautify())
  .pipe(gulp.dest(config.dist.styles))
);

const setWatch = done => {
  global.isWatching = true;
  done();
}

const build = gulp => gulp.parallel('sass');
const watch = gulp => () => gulp.watch(config.source.sass + '/**/*.{sass,scss}', gulp.parallel(
  setWatch, 
  'sass'
));

module.exports.build = build;
module.exports.watch = watch;
module.exports.setWatch = setWatch;