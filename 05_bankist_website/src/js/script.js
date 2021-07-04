import '../scss/style.scss';
import smoothscroll from 'smoothscroll-polyfill';
import throttle from './throttle';
import {
  navbarItemsHide,
  navbarItemsShow,
  navbarScroll,
  navbarStick,
  toggleSignUpModal,
} from './navbar';
import {
  navbar,
  mobNavbar,
  btnOpen,
  overlay,
  modalClose,
  modalSubmit,
} from './globalVariables';

smoothscroll.polyfill();

navbar.addEventListener('mouseover', navbarItemsHide);
navbar.addEventListener('mouseout', navbarItemsShow);

navbar.addEventListener('click', navbarScroll);

btnOpen.addEventListener('click', toggleSignUpModal);
overlay.addEventListener('click', toggleSignUpModal);

modalClose.addEventListener('click', toggleSignUpModal);
modalSubmit.addEventListener('click', (ev) => {
  ev.preventDefault();
  setTimeout(() => {
    toggleSignUpModal();
  }, 2000);
});

window.addEventListener('scroll', throttle(navbarStick, 100));
