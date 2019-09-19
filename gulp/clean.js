import del from 'del';
import util from 'gulp-util';
import config from './config';

const build = () => {
  return function () {
    return del([
        config.dist.root,
        './*.php',
        './template-parts',
        './slides',
        './inc',
        config.dist.languages
    ])
    .then(paths => util.log('Deleted:', util.colors.magenta(paths.join('\n'))))
  };
};

module.exports.build = build;