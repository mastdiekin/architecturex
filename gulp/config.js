var util = require('gulp-util');

const production = util.env.production || util.env.prod || util.env._.indexOf('build') !== -1 || false;
var distPath = 'dist';
var sourcePath = 'app';
var root = './'
var config = {

	env              : 'development',
	production       : production,

	fontName         : 'myfont',
	docs: {
		root         : 'docs'
	},
	source: {
		neath        : root,
		root         : sourcePath,
		pages        : sourcePath +'/pages',
		php          : sourcePath +'/php',
		assets       : sourcePath +'/assets',
		sass         : sourcePath +'/sass',
		sassRoot     : 'sass',
		fonts        : sourcePath +'/fonts',
		fontsRoot    : 'fonts',
		js           : sourcePath +'/js',
		images       : sourcePath +'/images',
		imagesRoot   : 'images',
		svg          : sourcePath +'/images/svg',
		libs         : sourcePath +'/libs',
		video        : sourcePath +'/video',
		languages    : sourcePath +'/languages'
	},
	dist: {
		neath        : root,
		root         : distPath,
		html         : distPath,
		php          : distPath,
		styles       : distPath + '/styles',
		js           : distPath + '/js',
		images       : distPath + '/images',
		assets       : distPath + '/assets',
		fonts        : distPath + '/fonts',
		libs         : distPath + '/libs',
		video        : distPath + '/video',
		languages    : 'languages'
	},

	setEnv: function(env) {
		if (typeof env !== 'string') return;
		this.env = env;
		this.production = env === 'production';
		process.env.NODE_ENV = env;
	},

	logEnv: function() {
		util.log(
			'Environment:',
			util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
		);
	},

	errorHandler: require('./helpers/handle-errors')
}

config.setEnv(production ? 'production' : 'development');

module.exports = config;