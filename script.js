const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.navigation');

menuButton.addEventListener('click', () => {
  const isOpen = navigation.classList.toggle('is-open');
  menuButton.setAttribute('aria-expanded', isOpen);
  menuButton.textContent = isOpen ? 'Закрити' : 'Меню';
});

navigation.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  navigation.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = 'Меню';
}));

document.querySelector('.contact-form').addEventListener('submit', (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const name = form.get('name').trim();
  const contact = form.get('contact').trim();
  const subject = 'Запит на консультацію-знайомство';
  const message = `Вітаю, Тетяно!\n\nМене звати ${name}. Хочу записатися на безкоштовну 15-хвилинну консультацію-знайомство.\nМій контакт: ${contact}.`;
  window.location.href = `mailto:tg@vedis.com.ua?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`;
});

const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const certificateLinks = [...document.querySelectorAll('.certificate-grid a')];
const gallery = document.querySelector('.gallery-modal');
const galleryImage = document.querySelector('.gallery-image');
const galleryCounter = document.querySelector('.gallery-counter');
const galleryClose = document.querySelector('.gallery-close');
const galleryPrevious = document.querySelector('.gallery-prev');
const galleryNext = document.querySelector('.gallery-next');
let activeCertificate = 0;

function showCertificate(index) {
  activeCertificate = (index + certificateLinks.length) % certificateLinks.length;
  const source = certificateLinks[activeCertificate].getAttribute('href');
  galleryImage.src = source;
  galleryImage.alt = certificateLinks[activeCertificate].querySelector('img').alt;
  galleryCounter.textContent = `${activeCertificate + 1} / ${certificateLinks.length}`;
}

function closeGallery() {
  gallery.classList.remove('is-open');
  gallery.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

certificateLinks.forEach((link, index) => link.addEventListener('click', (event) => {
  event.preventDefault();
  showCertificate(index);
  gallery.classList.add('is-open');
  gallery.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  galleryClose.focus();
}));

galleryPrevious.addEventListener('click', () => showCertificate(activeCertificate - 1));
galleryNext.addEventListener('click', () => showCertificate(activeCertificate + 1));
galleryClose.addEventListener('click', closeGallery);
gallery.addEventListener('click', (event) => {
  if (event.target === gallery) closeGallery();
});
document.addEventListener('keydown', (event) => {
  if (!gallery.classList.contains('is-open')) return;
  if (event.key === 'Escape') closeGallery();
  if (event.key === 'ArrowLeft') showCertificate(activeCertificate - 1);
  if (event.key === 'ArrowRight') showCertificate(activeCertificate + 1);
});
