
document
    .querySelector('#play')
    .addEventListener('click',async () =>{
        console.log('hi')
        const response = await fetch('/michael', {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
      
          if (response.ok) {
            console.log('game started');
          } else {
            alert('Failed to sign up.');
          }
    });