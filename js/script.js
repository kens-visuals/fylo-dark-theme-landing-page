const form = document.querySelector('.js-form');
const errorTxt = document.querySelector('.js-error');
const desc = document.querySelector('.js-description');
const descImg = document.querySelector('.js-description-img');
const details = [...document.querySelector('.js-details').children];
const testimonials = [...document.querySelector('.js-testimonials').children];

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

const onScrollAnim = function (items) {
  const options = {
    threshold: 0.5,
    rootMargin: '0px 0px -100px 0px',
  };

  const callback = function (entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      items.forEach((item, i, arr) => {
        setTimeout(
          () => item.classList.add('is-visible'),
          (i + arr.length + 1) * 100
        );

        observer.unobserve(item);
      });
    });
  };

  const observer = new IntersectionObserver(callback, options);

  items.forEach((item) => observer.observe(item));
};

const slideOnScroll = function () {
  const option = {
    threshold: 0.5,
    rootMargin: '0px 0px -200px 0px',
  };

  const callback = function (entries) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      [desc, descImg].forEach((el) => {
        el.classList.add('is-visible');

        imgObserver.unobserve(el);
      });
    });
  };

  const imgObserver = new IntersectionObserver(callback, option);

  [descImg, desc].forEach((el) => imgObserver.observe(el));
};

form.addEventListener('submit', validateInput);
window.addEventListener('DOMContentLoaded', () => {
  [details, testimonials].forEach((el) => onScrollAnim(el));
  slideOnScroll();
});
