import config             from './config';
import gulp               from 'gulp';
import reportError        from './helpers/handle-errors'
import spritesmith        from "gulp.spritesmith"; //for png-sprites
import gulpif             from 'gulp-if'; //for png-sprites
import pngquant           from 'imagemin-pngquant';
import cache              from 'gulp-cache';
import imagemin           from 'gulp-imagemin';

const renderSprites = () => {
	var spriteData = gulp.src(config.source.images +'/sprites/*.png')
	.pipe(cache(imagemin({
		interlaced: true,
		progressive: true,
		use: [pngquant()],
		verbose: true
	})))
	.pipe(spritesmith({
		imgName: 'sprite.png',
		imgPath: '../'+ config.source.imagesRoot +'/sprite.png',
		cssName: '_sprites.sass'
	}))

	return spriteData.pipe(
		gulpif('*.png', 
			gulp.dest(config.source.images),
			gulp.dest(config.source.sass+ '/helpers/generated')
			)
		)
}

gulp.task('pngsprites', () => renderSprites());

const build = gulp => gulp.parallel('pngsprites');
const watch = gulp => {
  return function() {
    gulp.watch([
      config.source.images +'/sprites/*.png'
    ], gulp.parallel('pngsprites'));
  }
};

module.exports.build = build;
module.exports.watch = watch;