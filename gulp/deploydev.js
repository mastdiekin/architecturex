import gulp             from 'gulp';
import util             from 'gulp-util';
import config           from './config';
import ftp              from 'vinyl-ftp';
import wait             from 'gulp-wait';
import deployOpts       from './deploycfg';

function deploydev(cb) {
	const env = 'production';
	deployOpts.setEnv(env);
	deployOpts.logEnv();
	return gulp.src( deployOpts.all(), deployOpts.settings )
		.pipe(wait(50))
		.pipe( deployOpts.connDev().newer( deployOpts.serverAdr ) )
		.pipe( deployOpts.connDev().differentSize( deployOpts.serverAdr ) )
		.pipe( deployOpts.connDev().dest( deployOpts.serverAdr ) )
	cb();
}

const build = gulp => gulp.series(deploydev);

module.exports.build = build;