// const create = document.getElementById('create');
// const login = document.getElementById('login');



// create.addEventListener('click', async(data) => {
//     data.preventDefault();
//     console.log('create should happen')
//   const email = document.querySelector('#email-register').value.trim();
//   const password = document.querySelector('#password-register').value.trim();

//   if (email && password) {
//     const response = await fetch('https://127.0.0.1:3001/api/create', {
//       method: 'POST',
//       body: JSON.stringify({ email, password }),
//       headers: { 'Content-Type': 'application/json' },
//     });

//     if (response.ok) {
//       document.location.replace('/');
//       console.log('is anything happening')
//     } else {
//       alert('Failed to log in');
//     }
//   }
// });
