import Swiper from '../../libs/swiper/package/js/swiper';

module.exports = function heroSlider() {
  const heroSwiper  = new Swiper('.js__hero__slider-container', {
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    loop: true,
    speed: 1000,
    navigation: {
      nextEl: '.js__hero__slider-next',
      prevEl: '.js__hero__slider-prev',
    },
    pagination: {
      el: '.js__hero__slider-pagination',
      clickable: true,
      renderBullet(index, className) {
        return `<span class="${ className }"></span>`;
      },
    },
  });
};
