const sections = document.querySelectorAll('.section');

// observer lags for some reason and func below works well
sectionsFade();

function sectionsFade() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('section_show');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: `${0}px`,
      threshold: [0, 0.2, 0.6, 0.8, 1],
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// const breakpoints = [];
// let isScrolled = false;

// sections.forEach((section) => {
//   breakpoints.push(section.getBoundingClientRect().top + scrollY - 700);
// });

// export function sectionFade() {
//   if (isScrolled) return;

//   breakpoints.forEach((value, index) => {
//     if (scrollY > value) {
//       sections[index].classList.add('section_show');

//       if (index === breakpoints.length - 1) isScrolled = true;
//     }
//   });
// }
