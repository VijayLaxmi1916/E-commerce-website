const steps = [
  'start-screen',
  'q1',
  'q2',
  'q3',
  'form-screen',
  'mindful-screen',
  'last-post-screen'
];
let currentStepIndex = 0;

function showStep(index) {
  steps.forEach((id, i) => {
    const el = document.getElementById(id);
    if (el) {
      el.style.display = i === index ? 'flex' : 'none';
    }
  });
  currentStepIndex = index;
}

// Start button
document.getElementById('start-btn')?.addEventListener('click', (e) => {
  e.stopPropagation();
  setTimeout(() => {
    showStep(1);
  }, 500);
});

// Auto next when clicking option (q1 to q3)
['q1', 'q2', 'q3'].forEach((id, idx) => {
  const container = document.getElementById(id);
  if (container) {
    container.querySelectorAll('.option').forEach(option => {
      option.addEventListener('click', (e) => {
        e.stopPropagation();
        setTimeout(() => {
          showStep(idx + 2);
        }, 500);
      });
    });
  }
});

document.getElementById('form-submit').addEventListener('click', function () {
  if (validateFormFields()) {
    // All fields are filled, go to next step
    console.log('Form is valid, going to next step...');
    setTimeout(() => {
      showStep(5);
    }, 500);
  } else {
    console.log('Form has errors.');
  }
});

// Validate form fields
function validateFormFields() {
  let hasError = false;
  document.querySelectorAll('.error-msg').forEach(el => el.remove());

  const fields = [
    { id: 'name', message: 'Please enter your name' },
    { id: 'phone', message: 'Please enter your phone number' },
    { id: 'email', message: 'Please enter your email' }
  ];


  return !hasError;
}

// Restrict phone input to numbers only (JS only)
const phoneInput = document.getElementById('phone');
if (phoneInput) {
  phoneInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
  });
}



// // Entire card click (handles all steps)
document.querySelector('.card')?.addEventListener('click', (e) => {
  const tag = e.target.tagName.toLowerCase();
  if (['input', 'button', 'a', 'label'].includes(tag)) return;

  const currentId = steps[currentStepIndex];

  if (currentId === 'form-screen') {
    // if (validateFormFields()) {
      
    // }
    showStep(5);
  } else if (currentId === 'mindful-screen') {
    showStep(6);
  } else if (currentId === 'last-post-screen') {
    showStep(0); // Restart
  } else {
    showStep(currentStepIndex + 1);
  }
});

// Init
showStep(0);
