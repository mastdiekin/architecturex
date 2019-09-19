import gulp                  from 'gulp';
import browseeSync           from 'browser-sync';
import util                  from  'gulp-util';
import config                from './config';
import packageJson           from '../package';

const server = browseeSync.create();

// in CL 'gulp server --open' to open current project in browser
// in CL 'gulp server --tunnel siteName' to make project available over http://siteName.localtunnel.me



gulp.task('server', done => {
  util.log('\n\n\n\n\n\n\n Понеслась', 
    'моча по трубам', 
    util.colors.bgRed(' БРАТИИИИШКА '), 
    '\n\n\n\n\n\n', 
    util.colors.white.bgRed(' Project: '),
    util.colors.white.bgCyan(' '+ packageJson.name +' '), 
    '\n\n', 
    util.colors.black.bgWhite(' '+ packageJson.description ? packageJson.description : '-' +' '), 
    '\n\n\n\n\n\n'
  );
  server.init({
    server: {
      baseDir: config.dist.root,
      directory: false,
      serveStaticOptions: {
        extensions: ['html']
      }
    },
    files: [
      config.dist.html + '/*.html',
      config.dist.styles + '/*.css',
      config.dist.images + '/**/*'
    ],
    port: util.env.port || 3000,
    logLevel: 'info',
    logConnections: false,
    logFileChanges: true,
    open: Boolean(util.env.open),
    notify: false,
    ghostMode: false,
    tunnel: util.env.tunnel || null
  });
  done();
});


module.exports = function reload(done) {
  server.reload();
  done();
}
const build = gulp => gulp.parallel('server');

module.exports.build = build;
module.exports.server = server;