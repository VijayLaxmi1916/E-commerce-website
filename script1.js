// const steps = [
//   'start-screen',
//   'q1',
//   'q2',
//   'q3',
//   'form-screen',
//   'mindful-screen',
//   'last-post-screen'
// ];
// let currentStepIndex = 0;

// function showStep(index) {
//   steps.forEach((id, i) => {
//     const el = document.getElementById(id);
//     if (el) {
//       el.style.display = i === index ? 'flex' : 'none';
//     }
//   });
//   currentStepIndex = index;
// }

// // Start button
// document.getElementById('start-btn')?.addEventListener('click', (e) => {
//   e.stopPropagation();
//   showStep(1);
// });

// // Move to next step when radio input is changed
// ['q1', 'q2', 'q3'].forEach((stepId, index) => {
//   const stepEl = document.getElementById(stepId);
//   if (stepEl) {
//     stepEl.querySelectorAll('input[type="radio"]').forEach(input => {
//       input.addEventListener('change', () => {
//         showStep(index + 2); // q1 → q2, q2 → q3, q3 → form-screen
//       });
//     });
//   }
// });

// document.getElementById('form-submit')?.addEventListener('click', function (e) {
//   e.stopPropagation();
//   showStep(5); // mindful screen
// });

// // // Entire card click (handles all steps)
// document.querySelector('.card')?.addEventListener('click', (e) => {
//   const tag = e.target.tagName.toLowerCase();
//   if (['input', 'button', 'a', 'label'].includes(tag)) return;

//   const currentId = steps[currentStepIndex];

//   if (currentId === 'form-screen') {
//     if (validateFormFields()) {
//       showStep(5);
//     }
//   } else if (currentId === 'mindful-screen') {
//     showStep(6);
//   } else if (currentId === 'last-post-screen') {
//     showStep(0); // Restart
//   } else {
//     showStep(currentStepIndex + 1);
//   }
// });

// // Init
// showStep(0);


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
            if (i === index) el.focus(); // Focus the step container for screen readers
        }
    });
    currentStepIndex = index;
}

// Start button
document.getElementById('start-btn').addEventListener('click', (e) => {
    e.stopPropagation();
    showStep(1);
});

// Option buttons for questions
document.querySelectorAll('.option').forEach(button => {
    button.addEventListener('click', () => {
        // Update aria-pressed for button group
        const question = button.getAttribute('data-question');
        document.querySelectorAll(`button.option[data-question="${question}"]`).forEach(btn => {
            btn.setAttribute('aria-pressed', 'false');
        });
        button.setAttribute('aria-pressed', 'true');

        // Move to next step
        const nextStepIndex = steps.indexOf(question) + 1;
        showStep(nextStepIndex);
    });
});

// Form submit with validation
document.getElementById('details-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Clear previous errors
    document.querySelectorAll('.error').forEach(el => el.textContent = '');

    let valid = true;
    const name = document.getElementById('name');
    const phone = document.getElementById('phone');
    const email = document.getElementById('email');

    if (!name.value.trim()) {
        document.getElementById('name-error').textContent = 'Please enter your name.';
        valid = false;
    }
    if (!phone.value.trim()) {
        document.getElementById('phone-error').textContent = 'Please enter your phone number.';
        valid = false;
    }
    if (!email.value.trim() || !email.value.includes('@')) {
        document.getElementById('email-error').textContent = 'Please enter a valid email.';
        valid = false;
    }

    if (valid) {
        console.log("Form valid, moving to mindful screen");
        showStep(5); // Show mindful screen
    }
});

showStep(0);