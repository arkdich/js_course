const tabs = document.querySelectorAll('.info__wrapper');

const slides = document.querySelectorAll('.testimonial__entry');
let currSlide = 0;
const lastInx = slides.length - 1;

slidesObserverInit();

export function tabSwitch(ev) {
  if (!ev.target.className.includes('btn_oper')) return;

  const btn = ev.target;
  const prevBtn = document.querySelector('.btn_oper-active');

  if (btn === prevBtn) return;

  const prevTabNumber = prevBtn.dataset.tabBtn;
  const currTabNumber = btn.dataset.tabBtn;

  prevBtn.classList.remove('btn_oper-active');

  tabs[prevTabNumber].classList.remove('info__wrapper-active');
  tabs[currTabNumber].classList.add('info__wrapper-active');

  btn.classList.add('btn_oper-active');
}

export function nextSlide() {
  if (currSlide === lastInx) {
    currSlide = 0;
  } else {
    currSlide++;
  }

  switchSlide(currSlide);
}

export function prevSlide() {
  if (currSlide === 0) {
    currSlide = lastInx;
  } else {
    currSlide--;
  }

  switchSlide(currSlide);
}

export function changeSlide(ev) {
  if (!ev.target.classList.contains('testimonial__dot')) return;

  const slideNumber = ev.target.dataset.slide;
  currSlide = +slideNumber;

  switchSlide(currSlide);
}

function switchSlide(slideInx) {
  slides[slideInx].scrollIntoView({
    behavior: 'smooth',
    block: 'nearest',
    inline: 'center',
  });
}

function slidesObserverInit() {
  const dots = document.querySelectorAll('.testimonial__dot');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        dots.forEach((dot) => dot.classList.remove('testimonial__dot_active'));

        const dotNumber = entry.target.dataset.slide;
        dots[dotNumber].classList.add('testimonial__dot_active');
      });
    },
    {
      root: document.querySelector('.testimonial'),
      threshold: 0.5,
    }
  );

  slides.forEach((slide) => observer.observe(slide));
}
