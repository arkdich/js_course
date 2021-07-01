import { throttle } from './throttle.js';
import { navbarStick, toggleMobileMenu } from './navbar.js';

const navbar = document.querySelector('.navbar');
const mobNavbar = document.querySelector('.navbar__mobile');
const btnOpen = document.querySelector('.btn_open');
const overlay = document.querySelector('.overlay');
const modalClose = document.querySelector('.modal__close');
const modalSubmit = document.querySelector('.modal__submit');

navbar.addEventListener('mouseover', (ev) => {
  if (
    ev.target.className.includes('navbar__link') ||
    ev.target.className.includes('btn_open')
  ) {
    navbar.classList.add('transparent');
    ev.target.setAttribute('data-hovered', '');
  }
});

mobNavbar.addEventListener('click', toggleMobileMenu);

btnOpen.addEventListener('click', toggleMobileMenu);
overlay.addEventListener('click', toggleMobileMenu);

modalClose.addEventListener('click', toggleMobileMenu);
modalSubmit.addEventListener('click', (ev) => {
  ev.preventDefault();
  setTimeout(() => {
    toggleMobileMenu();
  }, 2000);
});

window.addEventListener('scroll', throttle(navbarStick, 100));
