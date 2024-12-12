// scripts.js

// Email Capture Form Submission Handler using Formspree
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('form');
  const formMessage = document.getElementById('formMessage');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(form);
    const email = formData.get('email');

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formMessage.innerHTML = '<div class="alert alert-danger">Please enter a valid email address.</div>';
      return;
    }

    // Show loading spinner
    formMessage.innerHTML = '<div class="spinner-border text-light" role="status"><span class="visually-hidden">Loading...</span></div>';

    // Submit the form data to Formspree
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        form.reset();
        formMessage.innerHTML = '<div class="alert alert-success">Thank you! You have been added to the waitlist.</div>';
      } else {
        response.json().then(data => {
          if (Object.hasOwn(data, 'errors')) {
            formMessage.innerHTML = `<div class="alert alert-danger">${data.errors.map(error => error.message).join(', ')}</div>`;
          } else {
            formMessage.innerHTML = '<div class="alert alert-danger">Oops! Something went wrong.</div>';
          }
        });
      }
    })
    .catch(error => {
      formMessage.innerHTML = '<div class="alert alert-danger">Oops! Something went wrong.</div>';
    });
  });
});
