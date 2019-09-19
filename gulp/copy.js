import gulp from 'gulp';
import config from './config.js';

gulp.task('copy:fonts', () => gulp
  .src(config.source.fonts + '/**/*.{ttf,eot,woff,woff2}')
  .pipe(gulp.dest(config.dist.fonts))
);

gulp.task('copy:libs', () => gulp
  .src(config.source.libs + '/**/**.*')
  .pipe(gulp.dest(config.dist.libs))
);

gulp.task('copy:css', () => gulp
    .src(config.source.root + '/css/**/**.*')
    .pipe(gulp.dest(config.dist.root +'/css'))
);

gulp.task('copy:sftp', () => gulp
    .src('sftp-config.json')
    .pipe(gulp.dest(config.dist.root))
);

gulp.task('copy:jslibs', () => gulp
    .src(config.source.js + '/lib/**/*.*')
    .pipe(gulp.dest(config.dist.js + '/lib'))
);

gulp.task('gh-pages', () => gulp
    .src([
      config.dist.root +'/**/**.*',
      config.dist.root +'/images/svg/dest/**.*',
      // '!' + config.dist.root +'/libs/**/**.*',
      '!' + config.dist.root +'/images/svg/**.*',
      '!' + config.dist.root +'/layout/**/**.*',
      '!' + config.dist.root +'/js/report.html',
      '!' + config.dist.root +'/js/lib/hello.js'
    ])
    .pipe(gulp.dest(config.docs.root))
);

const build = gulp => gulp.series(

  'copy:fonts', 
  'copy:libs', 
  'copy:css', 
  'copy:sftp', 
  'copy:jslibs', 
  // 'gh-pages'

);

const watch = gulp => () => gulp.watch(config.source.images + '/*', gulp.parallel(

  'copy:fonts', 
  'copy:libs', 
  'copy:css', 
  'copy:sftp', 
  'copy:jslibs', 
  // 'gh-pages'

));

module.exports.build = build;
module.exports.watch = watch;