const form = document.querySelector('.js-form');
const errorTxt = document.querySelector('.js-error');

const details = [...document.querySelector('.js-details').children];
const testimonials = [...document.querySelector('.js-testimonials').children];
const desc = document.querySelector('.js-description');
const descImg = document.querySelector('.js-description-img');

const [input, btn] = form.children;

const emailRegExp =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi;

const validateInput = function (e) {
  e.preventDefault();

  if (!emailRegExp.test(input.value) || input.value === '') {
    input.classList.add('input--has-error');
    errorTxt.classList.add('error--is-visible');
    errorTxt.textContent = 'Please enter a valid email address';
  } else {
    input.classList.remove('input--has-error');
    errorTxt.classList.remove('error--is-visible');
    errorTxt.classList.add('success--is-visible');
    errorTxt.textContent = 'Email address succesfully added';

    setTimeout(() => {
      input.value = '';
      errorTxt.classList.remove('success--is-visible');
    }, 1000);
  }
};

const appearOnScroll = function () {
  const detailsOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -200px 0px',
  };

  const items = function (entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      details.forEach((detail, i) => {
        setTimeout(() => detail.classList.add('is-visible'), (i + 4) * 100);
        detailsObserver.unobserve(detail);
      });
    });
  };

  const detailsObserver = new IntersectionObserver(items, detailsOptions);

  details.forEach((detail) => detailsObserver.observe(detail));

  const testimonialsOptions = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px',
  };

  const tests = function (entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      testimonials.forEach((testimonial, i) => {
        setTimeout(
          () => testimonial.classList.add('is-visible'),
          (i + 4) * 100
        );

        testimonialsObserver.unobserve(testimonial);
      });
    });
  };

  const testimonialsObserver = new IntersectionObserver(
    tests,
    testimonialsOptions
  );

  testimonials.forEach((testimonial) =>
    testimonialsObserver.observe(testimonial)
  );
};

const slideOnScroll = function () {
  const option = {
    threshold: 0.5,
    rootMargin: '0px 0px -200px 0px',
  };

  const items = function (entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      desc.classList.add('is-visible');
      descImg.classList.add('is-visible');

      [descImg, desc].forEach((el) => imgObserver.unobserve(el));
    });
  };

  const imgObserver = new IntersectionObserver(items, option);

  [descImg, desc].forEach((el) => imgObserver.observe(el));
};

form.addEventListener('submit', validateInput);
window.addEventListener('DOMContentLoaded', () => {
  appearOnScroll();
  slideOnScroll();
});
