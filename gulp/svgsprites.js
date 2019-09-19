import config             from './config';
import gulp               from 'gulp';
import reportError        from './helpers/handle-errors';
import svgmin             from 'gulp-svgmin'; //for svg-sprites
import svgstore           from 'gulp-svgstore'; //for svg-sprites
import Vinyl              from 'vinyl'; //for svg-sprites
import through2           from 'through2'; //for svg-sprites
import cheerio            from 'cheerio'; //for svg-sprites
import consolidate        from 'gulp-consolidate'; //for svg-sprites
import rename             from 'gulp-rename';
import filelog            from 'gulp-filelog';

gulp.task('svgsprites', () => gulp
	.src(config.source.images +'/svg/*.svg', {
		allowEmpty: true
	})
		.pipe(filelog('Preparing'))
		.pipe(svgmin())
		.pipe(svgstore({ 
			inlineSvg: false
		}))
		.pipe(through2.obj(function (file, encoding, cb) {
			var $ = cheerio.load(file.contents.toString(), {xmlMode: true});
			var data = $('svg > symbol').map(function () {
				var $this  = $(this);
				var size   = $this.attr('viewBox').split(' ').splice(2);
				var name   = $this.attr('id');
				var ratio  = size[0] / size[1]; // symbol width / symbol height
				var fill   = $this.find('[fill]:not([fill="currentColor"])').attr('fill');
				var stroke = $this.find('[stroke]').attr('stroke');
				return {
					name: name,
					ratio: +ratio.toFixed(2),
					fill: fill || 'initial',
					stroke: stroke || 'initial'
				};
			}).get();
			this.push(file);
			gulp.src(config.source.sass +'/helpers/generated/_sprite-svg.scss')
				.pipe(consolidate('lodash', {
					symbols: data
				}))
				.pipe(gulp.dest(config.source.sass +'/src/svg'));
			// var jsonFile = new Vinyl({
			//     path: 'metadata.json',
			//     contents: new Buffer(JSON.stringify(data))
			// });
			// this.push(jsonFile);
			cb();
		}))
		.pipe(rename({basename: 'sprite'}))
		.pipe(filelog('Optimized'))
		.pipe(gulp.dest(config.dist.images +'/svg/dest'))
);

const build = gulp => gulp.parallel('svgsprites');
const watch = gulp => () => gulp.watch(config.source.images +'/svg/*.svg', gulp.parallel(
  'svgsprites'
));

module.exports.build = build;
module.exports.watch = watch;