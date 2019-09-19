import gulp from 'gulp';
import config from './gulp/config';

const getTaskBuild = task => require('./gulp/' + task).build(gulp);
const getTaskWatch = task => require('./gulp/' + task).watch(gulp);

gulp.task('clean', getTaskBuild('clean'));
gulp.task('copy', getTaskBuild('copy'));
gulp.task('zip', getTaskBuild('zip'));
gulp.task('server', () => getTaskBuild('server'));
gulp.task('pages', () => getTaskBuild('pages'));
gulp.task('webpack', getTaskBuild('webpack'));
gulp.task('sasslibs', getTaskBuild('sasslibs'));
gulp.task('deploy', getTaskBuild('deploy'));
gulp.task('deploydev', getTaskBuild('deploydev'));
gulp.task('images', getTaskBuild('images'));
gulp.task('svgsprites', getTaskBuild('svgsprites'));
gulp.task('pngsprites', getTaskBuild('pngsprites'));

gulp.task('copy:watch', getTaskWatch('copy'));
gulp.task('zip:watch', getTaskWatch('zip'));
gulp.task('pages:watch', getTaskWatch('pages'));
gulp.task('sass:watch', getTaskWatch('sass'));
gulp.task('webpack:watch', getTaskWatch('webpack'));
gulp.task('images:watch', getTaskWatch('images'));
gulp.task('svgsprites:watch', getTaskWatch('svgsprites'));
gulp.task('pngsprites:watch', getTaskWatch('pngsprites'));

const setmodeProd = done => {
  config.setEnv('production');
  config.logEnv();
  done();
}

const setmodeDev = done => {
  config.setEnv('development');
  config.logEnv();
  done();
}

gulp.task(
  'build',
  gulp.series(
    setmodeProd,
    'clean',
    'sass',
    'sasslibs',
    'pages',
    'images',
    'svgsprites',
    'pngsprites',
    'webpack',
    'copy',
    'zip'
  )
);

gulp.task(
  'build:dev',
  gulp.series(
    setmodeDev,
    'clean',
    'sass',
    'sasslibs',
    'pages',
    'images',
    'svgsprites',
    'pngsprites',
    'webpack',
    'copy',
    'zip'
  )
);

gulp.task(
  'watch',
  gulp.parallel(
    'copy:watch',
    'pages:watch',
    'images:watch',
    'svgsprites:watch',
    'pngsprites:watch',
    'webpack:watch',
    'sass:watch'
  )
);

gulp.task('default', gulp.series([
  'build:dev', 
  'server', 
  'watch'
]));