import gulp                  from 'gulp';
import prettify              from 'gulp-prettify';
import njkRender             from 'gulp-nunjucks-render';
import frontMatter           from 'gulp-front-matter';
import config                from './config';
import reportError           from './helpers/handle-errors';
import gutil                 from 'gulp-util';


const renderHtml = onlyChanged => {
  njkRender.nunjucks.configure({
    watch: false,
    trimBlocks: true,
    lstripBlocks: false
  });

  return gulp
  .src(config.source.pages +'/**/*.html')
  .pipe(frontMatter({ property: 'data' }).on('error', reportError))
  .pipe(njkRender({
    // PRODUCTION: config.production,
    watch: false,
    trimBlocks: true,
    lstripBlocks: false
  }).on('error', reportError))
  .pipe(prettify({
    indent_size: 2,
    wrap_attributes: 'auto',
    preserve_newlines: false,
    indent_char: ' ',
    end_with_newline: true
  }))
  .pipe(gulp.dest(config.dist.html))
	;
}

gulp.task('pages', () => renderHtml());
gulp.task('pages:changed', () => renderHtml(true));

const build = gulp => gulp.parallel('pages');
const watch = gulp => {
  return function() {
    gulp.watch([
      config.source.pages + '/**/[^_]*.html'
    ], gulp.parallel('pages:changed'));

    gulp.watch([
      config.source.pages + '/**/_*.html'
    ], gulp.parallel('pages'));
  }
};

module.exports.build = build;
module.exports.watch = watch;