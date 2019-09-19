import gulp             from 'gulp';
import util             from 'gulp-util';
import config           from './config';
import ftp              from 'vinyl-ftp';
import wait             from 'gulp-wait';
import deployOpts       from './deploycfg';

function deploy(cb) {
	const env = 'production';
	deployOpts.setEnv(env);
	deployOpts.logEnv();
	return gulp.src( deployOpts.all(), deployOpts.settings )
		.pipe(wait(50))
		.pipe( deployOpts.conn().newer( deployOpts.serverAdrProd ) )
		.pipe( deployOpts.conn().differentSize( deployOpts.serverAdrProd ) )
		.pipe( deployOpts.conn().dest( deployOpts.serverAdrProd ) )
	cb();
}

const build = gulp => gulp.series(deploy);

module.exports.build = build;