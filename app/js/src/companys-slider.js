import Swiper from '../../libs/swiper/package/js/swiper';

module.exports = function companysSlider() {
  const companysSwiper  = new Swiper('.js__companys__slider-container', {
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    speed: 1000,
    navigation: {
      nextEl: '.js__companys__slider-next',
      prevEl: '.js__companys__slider-prev',
    },
    breakpoints: {
      480: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      600: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 5,
        spaceBetween: 20,
      },
    }
  });
};
