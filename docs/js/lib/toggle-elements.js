import { TimelineMax } from 'gsap';

const tl              = new TimelineMax();
class ToggleEmelents {
  constructor(toggleButton, toggleWrapper) {
    this.toggleButton = toggleButton;
    this.toggleWrapper = toggleWrapper;

    this.toggleOnTime = 0.4;
    this.toggleOffTime = 0.4;

    this.toggleOffOffsetTime = 100;
    this.toggleOnOffsetTime = 100;

    this.isOpened = false;
    this.isAnimating = false;

  }

  toggle() {
    if (this.isAnimating) {
      return false;
    }
    if(this.isOpened === false) {
      this.open();
    } else {
      this.close();
    }
  }

  open() {
    if (this.isAnimating) {
      return false;
    }
    const that = this;

    this.isAnimating = true;
    this.isOpened = true;
    if(!this.toggleButton[0].classList.contains('is--active')) {
      this.toggleButton[0].classList += ' is--active';
    }
    setTimeout(function() {
      tl.to(that.toggleWrapper, that.toggleOnTime, { 
        ease: Back.ease, 
        opacity: 1,
        autoAlpha: 1,
        display: 'block',
        onComplete() {
          that.isAnimating = false;
        }
      });
    }, that.toggleOnOffsetTime);
    
  }

  close() {

    if (this.isAnimating) {
      return false;
    }
    const that = this;
    this.isAnimating = true;
    this.isOpened = false;
    if(this.toggleButton[0].classList.contains('is--active')) {
      this.toggleButton[0].classList.remove('is--active');
    }
    setTimeout(function() {
      tl.to(that.toggleWrapper, that.toggleOffTime, {
        ease: Back.ease,
        opacity: 0,
        autoAlpha: 0,
        display: 'none',
        onComplete() {
          that.isAnimating = false;
        }
      });
    }, that.toggleOffOffsetTime);
  }
}

export { ToggleEmelents as default };
