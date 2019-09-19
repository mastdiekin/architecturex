import config             from './config';
import gulp               from 'gulp';
import reportError        from './helpers/handle-errors';
import pngquant           from 'imagemin-pngquant';
import cache              from 'gulp-cache';
import imagemin           from 'gulp-imagemin';

const imgSrc = [
	config.source.images +'/**/*', 
	'!'+ config.source.images +'/svg/*.*', 
	'!'+ config.source.images +'/icons/font/**/**.*', 
	'!'+ config.source.images +'/sprites/*.*'
]

gulp.task('images', () => gulp
	.src(imgSrc)
		.pipe(cache(imagemin([
				// imagemin.gifsicle({interlaced: true}),
				imagemin.jpegtran({progressive: true}),
				imagemin.optipng(),
				imagemin.svgo([{removeViewBox: false}, {minifyStyles: false}])
				], {
					interlaced: true,
					progressive: true,
					use: [pngquant()],
					verbose: true
				}
		).on('error', reportError)))
		.pipe(gulp.dest(config.dist.images))
);

const build = gulp => gulp.parallel('images');
const watch = gulp => () => gulp.watch(imgSrc, gulp.parallel(
  'images'
));

module.exports.build = build;
module.exports.watch = watch;