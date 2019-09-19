import Swiper from '../../libs/swiper/package/js/swiper';

module.exports = function commentsSlider() {
  const commentsSwiper  = new Swiper('.js__comments__slider-container', {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    speed: 1000,
    navigation: {
      nextEl: '.js__comments__slider-next',
      prevEl: '.js__comments__slider-prev',
    },
  });
};
