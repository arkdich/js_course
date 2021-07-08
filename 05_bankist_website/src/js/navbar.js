import { navbar } from './globalVariables';

navbarStick();
mobMenuItemsInit();

function navbarStick() {
  const showcase = document.querySelector('.showcase');
  const navbarHeight = navbar.getBoundingClientRect().height;

  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        navbar.classList.remove('navbar_show', 'mobile-menu_show');
      } else {
        navbar.classList.add('navbar_show');
      }
    },
    {
      root: null,
      rootMargin: `${-navbarHeight}px`,
      threshold: [0, 0.45],
    }
  );

  observer.observe(showcase);
}

function mobMenuItemsInit() {
  const mobMenuItems = Array.from(
    document.querySelector('.mobile-menu__list').children
  );

  mobMenuItems.forEach((elem, index) => {
    elem.classList.add(`td-${index + 1}`);
  });
}

export function toggleSignUpModal(ev) {
  if (
    !(
      ev.target.className.includes('btn_open') ||
      ev.target.className.includes('modal__close') ||
      ev.target.className.includes('modal__submit') ||
      ev.target.className.includes('overlay') ||
      ev.target.className.includes('big-floppa__btn')
    )
  )
    return;

  document.querySelector('.overlay').classList.toggle('hidden');
  document.querySelector('.modal').classList.toggle('hidden');
}

export function navbarItemsHide(ev) {
  if (
    !(
      ev.target.className.includes('navbar__link') ||
      ev.target.className.includes('btn_open')
    )
  )
    return;

  if (ev.target.parentElement.className.includes('mobile-menu__list')) return;

  navbar.classList.add('transparent');
  ev.target.setAttribute('data-hovered', '');
}

export function navbarItemsShow(ev) {
  navbar.classList.remove('transparent');
  ev.target.removeAttribute('data-hovered');
}

export function navbarScroll(ev) {
  if (
    !(
      ev.target.classList.contains('navbar__link') ||
      ev.target.classList.contains('mobile-menu__link')
    )
  )
    return;

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

export function toggleMobMenu(ev) {
  ev.target.parentElement.classList.toggle('mobile-menu_show');
}
