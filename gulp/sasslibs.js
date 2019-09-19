import gulp               from 'gulp';
import config             from './config';
import mainBowerFiles     from 'gulp-main-bower-files';
import debug              from 'gulp-debug';
import concat             from 'gulp-concat';
import cssnano            from 'gulp-cssnano';
import rename             from 'gulp-rename';
import library            from '../library';

gulp.task('sasslibs', gulp.series(function(cb) { 


	return gulp.src(library.csslibs, {
		allowEmpty: true
	})
	// return gulp.src('./bower.json', {
	// 	allowEmpty: true
	// })


		// .pipe(mainBowerFiles('**/*.css'))
		.pipe(debug())
		.pipe(concat('all.css'))
		.pipe(cssnano({
			reduceIdents: false
		}))
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(config.dist.styles))
}));

const build = gulp => gulp.parallel('sasslibs');
const libs = gulp => gulp.parallel('sasslibs');

module.exports.build = build;
module.exports.libs = libs;