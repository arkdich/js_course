import '../scss/style.scss';
import './scroll';
import smoothscroll from 'smoothscroll-polyfill';
import {
  navbarItemsHide,
  navbarItemsShow,
  navbarScroll,
  toggleMobMenu,
  toggleSignUpModal,
} from './navbar';
import {
  navbar,
  mobNavbar,
  overlay,
  modalClose,
  modalSubmit,
  infoBtns,
  btnPrev,
  btnNext,
  btnFooter,
} from './globalVariables';
import { nextSlide, prevSlide, tabSwitch } from './components';

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

infoBtns.addEventListener('click', tabSwitch);

btnPrev.addEventListener('click', prevSlide);
btnNext.addEventListener('click', nextSlide);

btnFooter.addEventListener('click', toggleSignUpModal);
