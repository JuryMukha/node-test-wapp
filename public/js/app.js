const weatherForm = document.querySelector('form');
const search = document.querySelector('input');
const messageEl = document.querySelector('p#forecast');
const errorEl = document.querySelector('p#error');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  fetch('/weather?address=' + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        errorEl.textContent = data.error;
        messageEl.textContent = '';
      } else {
        errorEl.textContent = '';
        messageEl.textContent = 'Location: ' + data.location + '. ' + data.forecast;
      }
    });
  });
});