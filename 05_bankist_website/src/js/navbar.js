import { navbar } from './globalVariables';

export function navbarStick() {
  if (scrollY > innerHeight) {
    navbar.classList.add('navbar_show');
  } else {
    navbar.classList.remove('navbar_show');
  }
}

export function toggleSignUpModal() {
  document.querySelector('.overlay').classList.toggle('hidden');
  document.querySelector('.modal').classList.toggle('hidden');
}

export function navbarItemsHide(ev) {
  if (
    ev.target.className.includes('navbar__link') ||
    ev.target.className.includes('btn_open')
  ) {
    navbar.classList.add('transparent');
    ev.target.setAttribute('data-hovered', '');
  }
}

export function navbarItemsShow(ev) {
  navbar.classList.remove('transparent');
  ev.target.removeAttribute('data-hovered');
}

export function navbarScroll(ev) {
  if (
    ev.target.classList.contains('navbar__link') ||
    ev.target.classList.contains('mobile-menu__link')
  ) {
    ev.preventDefault();
    const targetId = ev.target.getAttribute('href');

    const scrollTarget = document.querySelector(targetId);
    const targetTop = scrollTarget.getBoundingClientRect().top;

    scrollBy({
      top: targetTop - 80,
      left: 0,
      behavior: 'smooth',
    });
  }
}
