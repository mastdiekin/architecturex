import gulp             from 'gulp';
import util             from 'gulp-util';
import config           from './config';
import ftp              from 'vinyl-ftp';
import wait             from 'gulp-wait';

var sHost               = "dsstudio.beget.tech";
var sUser               = "dsstudio_ds";
var sPassword           = "rsU2cUc%";

var sDevHost            = "dev.dsstudio.beget.tech";
var sDevUser            = "dsstudio_ds";
var sDevPassword        = "rsU2cUc%";

//пути к теме
var themename           = "architecturex";
var themeFolderPath     = "/public_html/wp-content/themes/";
var devThemeFolderPath  = "/public_html/wp-content/themes/";
var serverRoot          = "dsstudio.beget.tech";
var devServerRoot       = "dev.dsstudio.beget.tech";

var production = config.production;

const deployOpts = {

	conn: function() {
		return ftp.create({
			host:      sHost,
			user:      sUser,
			password:  sPassword,

			parallel:  10,
			log: util.log
		});
	},

	connDev: function() {
		return ftp.create({
			host:      sDevHost,
			user:      sDevUser,
			password:  sDevPassword,

			parallel:  10,
			log: util.log
		});
	},

	env              : 'development',
	production       : production,

	serverAdr:      "/" + devServerRoot + devThemeFolderPath + themename + "/",
	serverAdrProd:  "/" + serverRoot + themeFolderPath + themename + "/",

	settings: {
		base: '.', 
		buffer: false,
		allowEmpty: true
	},

	deps: {

		php: [
			'*.php',
			'template-parts/**/*.php',
			'slides/**/*.php',
			'inc/**/*.php',
		],
		js: [
			config.dist.js + '/*.js',
			config.dist.js + '/lib/*.js',
		],
		css: [
			config.dist.styles + '/**/*.css',
			'style.css',
		],
		images: [
			!config.dist.images + '/sprites/',
			!config.dist.images + '/icons/',
			!config.dist.images + '/sprite.png',
			config.dist.images + '/**/*.{png,jpg,ico}',
			config.dist.images + '/svg/dest/sprite.svg',
			'screenshot.png',
		],
		languages: [
			config.dist.languages + '/**/**/*.*'
		],
		fonts: [
			config.dist.fonts + '/**/**/*.*'
		],
		video: [
			config.dist.video + '/**/*.*'
		],

	},

	all: function() {

		var obj = [];
		var newArr = [];

		for (var key in this.deps) {
			var arr = this.deps[key];
			for( var i = 0; i < arr.length; i++ ) {

				obj = arr[ i ];

				newArr.push(obj);

			}
		}

		console.log(newArr);

		return newArr;

	},

	setEnv: function(env) {
		if (typeof env !== 'string') return;
		this.env = env;
		this.production = env === 'production';
		process.env.NODE_ENV = env;

		return process.env.NODE_ENV;
	},

	logEnv: function() {
		util.log(
			'Environment:',
			util.colors.white.bgRed(' ' + process.env.NODE_ENV + ' ')
		);
	},
}

module.exports = deployOpts;