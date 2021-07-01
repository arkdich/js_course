export function navbarStick() {
  if (scrollY > innerHeight) {
    document.querySelector('.navbar').classList.add('navbar_show');
  } else {
    const navbar = document.querySelector('.navbar');

    navbar.classList.remove('navbar_show');
  }
}

export function toggleMobileMenu() {
  document.querySelector('.overlay').classList.toggle('hidden');
  document.querySelector('.modal').classList.toggle('hidden');
}
