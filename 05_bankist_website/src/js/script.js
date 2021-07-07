import '../scss/style.scss';
import smoothscroll from 'smoothscroll-polyfill';
import throttle from './throttle';
import {
  navbarItemsHide,
  navbarItemsShow,
  navbarScroll,
  // navbarStick,
  toggleMobMenu,
  toggleSignUpModal,
} from './navbar';
import {
  navbar,
  mobNavbar,
  overlay,
  modalClose,
  modalSubmit,
} from './globalVariables';
import { sectionFade } from './scroll';

smoothscroll.polyfill();

navbar.addEventListener('mouseover', navbarItemsHide);
navbar.addEventListener('mouseout', navbarItemsShow);

navbar.addEventListener('click', navbarScroll);
navbar.addEventListener('click', toggleSignUpModal);

mobNavbar.addEventListener('click', toggleMobMenu);

overlay.addEventListener('click', toggleSignUpModal);
modalClose.addEventListener('click', toggleSignUpModal);

modalSubmit.addEventListener('click', (ev) => {
  ev.preventDefault();
  setTimeout(() => {
    toggleSignUpModal(ev);
  }, 2000);
});

// window.addEventListener('scroll', throttle(navbarStick, 100));
// window.addEventListener('scroll', throttle(sectionFade, 500));
