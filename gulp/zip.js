import gulp from 'gulp';
import config from './config.js';

import packageJson     from '../package.json';
import zip             from 'gulp-zip';
import del             from 'del';
import rename          from 'gulp-rename';
import notify          from 'gulp-notify';
var nameProj           = packageJson.name;
var versionProj        = packageJson.version;

var buildTemp = nameProj;
var buildInclude = [
  '**/*',
  '!*.zip', 
  '!.git/', 
  '!' + config.dist.root + '/sftp-config.json', 
  '!sftp-config.json', 
  '!package-lock.json', 
  '!node_modules/**',
  
];

gulp.task('zip:all', () => gulp
  .src(buildInclude)
  .pipe(zip(nameProj + '.zip'))
  .pipe(gulp.dest("./"))
  .pipe(notify({message: 'Zip task complete', onLast: true}))
);

gulp.task('zip:rename', () => gulp
  .src("./" + nameProj + '.zip')
  .pipe(rename(nameProj + '-' + versionProj + '.zip'))
  .pipe(gulp.dest("./"))
  .pipe(notify({message: 'Zip renamed and moved up', onLast: true}))
);

gulp.task('zip:remove', gulp.series(function(cb) {    
  return del([
    "./" + nameProj + '.zip'
  ]);
  cb();
}));

const build = gulp => gulp.series(

  'zip:all', 
  'zip:rename',
  'zip:remove'

);

const watch = gulp => () => gulp.watch(gulp.parallel(

  'zip:all', 
  'zip:rename',
  'zip:remove'

));

module.exports.build = build;
module.exports.watch = watch;