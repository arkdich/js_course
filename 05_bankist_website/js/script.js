import { throttle } from './throttle.js';
import {
  navbarItemsHide,
  navbarItemsShow,
  navbarScroll,
  navbarStick,
  toggleSignUpModal,
} from './navbar.js';
import {
  navbar,
  mobNavbar,
  btnOpen,
  overlay,
  modalClose,
  modalSubmit,
} from './globalVariables.js';

navbar.addEventListener('mouseover', navbarItemsHide);
navbar.addEventListener('mouseout', navbarItemsShow);

navbar.addEventListener('click', navbarScroll);

// mobNavbar.addEventListener('click', toggleMobileMenu);

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
