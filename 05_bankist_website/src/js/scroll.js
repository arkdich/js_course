const sections = document.querySelectorAll('.section');

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

// observer lags for some reason and func above works fine
sectionsFade();

function sectionsFade() {
  const observer = new IntersectionObserver(
    (entries) => {
      const [entry] = entries;

      if (entry.isIntersecting) {
        entry.target.classList.add('section_show');
        observer.unobserve(entry.target);
      }
    },
    {
      root: null,
      rootMargin: `${-100}px`,
      threshold: 0,
    }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

// setupImgsLazyLoad();

// function setupImgsLazyLoad() {
//   const imgs = document.querySelectorAll('.lazy-img');

//   const observer = new IntersectionObserver(
//     (entries, obs) => {
//       const [entry] = entries;

//       if (!entry.isIntersecting) return;

//       const img = entry.target;

//       img.classList.remove('lazy-img');
//       img.src = img.getAttribute('data-src');

//       console.log(img.src);

//       obs.unobserve(img);
//     },
//     {
//       root: null,
//       rootMargin: `${80}px`,
//     }
//   );

//   imgs.forEach((img) => {
//     observer.observe(img);
//   });
// }
