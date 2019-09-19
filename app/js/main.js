import $ from 'jquery';
import Scrollax from '../libs/Scrollax.js/scrollax';
import hello from './lib/hello';
import './lib/pollyfills';
import preloader from './lib/preloader';
import svg4everybody from '../libs/svg4everybody/dist/svg4everybody.legacy';
import magnificPopup from '../libs/magnific-popup/dist/jquery.magnific-popup.min';
import Waypoint from '../libs/waypoints/lib/jquery.waypoints';
import ToggleEmelents from './lib/toggle-elements';

import heroSlider from './src/hero-slider';
import commentsSlider from './src/comments-slider';
import companysSlider from './src/companys-slider';

const toggleMenuBtn = $('.js__hero__burger');
const toggleMenuWindow = $('.js__hero__menu.top');
const toggleMenuEl = new ToggleEmelents(toggleMenuBtn, toggleMenuWindow);

toggleMenuBtn.on('click', function(e) {
  e.preventDefault();
  toggleMenuEl.toggle();
});

function initparallax() {
  const a = {
    Android() {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry() {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS() {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera() {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows() {
      return navigator.userAgent.match(/IEMobile/i);
    },
    any() {
      return a.Android() || a.BlackBerry() || a.iOS() || a.Opera() || a.Windows();
    }
  };
  const trueMobile = a.any();
  if (trueMobile === null) {
    const b = new Scrollax();
    b.reload();
    b.init();
  }
}

hello();
preloader();
heroSlider();
commentsSlider();
companysSlider();
initparallax();
svg4everybody({
  polyfill: true 
});

$('.main__title').each(function() {
  const self = $(this);
  $(this).waypoint({
    handler() {
      self.addClass('stripe__anim');
    }, offset: '80%'
  });
});




