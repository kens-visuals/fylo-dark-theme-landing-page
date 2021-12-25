const form = document.querySelector('.js-form');
const errorTxt = document.querySelector('.js-error');

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

form.addEventListener('submit', validateInput);
